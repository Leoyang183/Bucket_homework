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

export class SuiRpcService {
  private readonly client: SuiClient

  constructor(rpcUrl?: string) {
    const url = rpcUrl || getFullnodeUrl('mainnet')
    this.client = new SuiClient({
      url,
    })
  }

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

      console.log(coinsPage)

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
        balance: balance.toString(),
      }))

    return {
      address: addressValue,
      suiBalance: suiBalance.totalBalance,
      tokens,
    }
  }
}
