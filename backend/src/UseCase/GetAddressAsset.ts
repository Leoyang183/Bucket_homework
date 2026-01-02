import { SuiAddress } from '@Domain/ValueObject/SuiAddress'
import { getFullnodeUrl } from '@mysten/sui/client'
import { SuiRpcService, AddressAsset } from '@Service/SuiRpcService'

export class GetAddressAsset {
  constructor(private readonly address: string) {}

  async Exec(): Promise<AddressAsset> {
    const suiAddress = new SuiAddress(this.address)
    const rpcService = new SuiRpcService(getFullnodeUrl('mainnet'))
    return await rpcService.GetAddressAsset(suiAddress)
  }
}

export default GetAddressAsset