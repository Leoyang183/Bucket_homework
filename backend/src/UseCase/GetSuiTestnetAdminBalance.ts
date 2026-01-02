import { getFullnodeUrl } from '@mysten/sui/client'
import { SuiRpcService, AddressAsset } from '@Service/SuiRpcService'
const TESTNET_ADMIN_OBJECT_ID = '0xeeb34a78eaf4ae873c679db294296778676de4a335f222856716d1ad6ed54e45'
const NETWORK = getFullnodeUrl('testnet')

export interface AdminBalance {
  admin: string
  id: string
  balance: string
}

export class GetSuiTestnetAdminBalance {
  async exec(): Promise<AdminBalance> {
    const rpcService = new SuiRpcService(NETWORK)
    return await rpcService.GetAdminBalance(TESTNET_ADMIN_OBJECT_ID)
  }
}

export default GetSuiTestnetAdminBalance