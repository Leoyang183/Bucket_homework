import { SuiClient, getFullnodeUrl } from '@mysten/sui/client'
import { SuiAddress } from '@Domain/ValueObject/SuiAddress'

export interface TokenBalance {
  coinType: string
  balance: string
}

export interface AddressAsset {
  address: string
  suiBalance: string
  tokens: TokenBalance[]
}

export interface AdminBalance {
  admin: string
  id: string
  balance: string
}

export class SuiRpcService {
  private readonly client: SuiClient

  constructor(rpcUrl?: string) {
    const url = rpcUrl || getFullnodeUrl('mainnet')
    this.client = new SuiClient({
      url,
    })
  }
  private FormatBalance(balance: string): string {
    const mist = BigInt(balance);
    const suiInt = mist / 1_000_000_000n;
    const suiDecimal = mist % 1_000_000_000n;
    return `${suiInt}.${suiDecimal.toString().padStart(9, '0')}`;
  };

  async GetAddressAsset(address: SuiAddress): Promise<AddressAsset> {
    const addressValue = address.GetValue()

    const suiBalance = await this.client.getBalance({
      owner: addressValue,
    })

    const tokenMap = new Map<string, { balance: bigint }>()
    let cursor: string | null = null

    do {
      const coinsPage = await this.client.getAllCoins({
        owner: addressValue,
        cursor: cursor || undefined,
      })
      for (const coin of coinsPage.data) {
        const coinType = coin.coinType
        const balance = BigInt(coin.balance)

        if (tokenMap.has(coinType)) {
          const existing = tokenMap.get(coinType)!
          tokenMap.set(coinType, {
            balance: existing.balance + balance
          })
        } else {
          tokenMap.set(coinType, {
            balance
          })
        }
      }

      cursor = coinsPage.nextCursor || null
    } while (cursor)

    const tokens: TokenBalance[] = Array.from(tokenMap.entries())
      .map(([coinType, { balance }]) => ({
        coinType,
        balance: this.FormatBalance(balance.toString()),
      }))

    return {
      address: addressValue,
      suiBalance: this.FormatBalance(suiBalance.totalBalance),
      tokens,
    }
  }

  async GetAdminBalance(ObjectId: string): Promise<AdminBalance> {
    const res = await this.client.getObject({
      id: ObjectId,
      options: { showContent: true },
    });
    const fields = (res?.data?.content as any).fields;
    const admin = fields.admin as string;
    const id = fields.id.id as string;
    const balance = fields.balance as string;
    return {
      admin,
      id,
      balance: this.FormatBalance(balance),
    };
  }
}
