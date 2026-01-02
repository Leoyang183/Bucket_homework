import { SuiAddress } from '@Domain/ValueObject/SuiAddress'
import { getFullnodeUrl } from '@mysten/sui/client'
import { SuiRpcService, AddressAsset } from '@Service/SuiRpcService'
const NETWORK = 'mainnet'
export class GetAddressAsset {
  constructor(private readonly address: string) {}

  async exec(): Promise<AddressAsset> {
    const suiAddress = new SuiAddress(this.address)
    const rpcService = new SuiRpcService(NETWORK)
    return await rpcService.GetAddressAsset(suiAddress)
  }
}

export default GetAddressAsset