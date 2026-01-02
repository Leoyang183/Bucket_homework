import { isValidSuiAddress } from "@mysten/sui/utils";

export class SuiAddress {
  private readonly value: string

  constructor(address: string) {
    if (!isValidSuiAddress(address)) {
      throw new Error('Invalid Sui address format')
    }
    this.value = address
  }

  GetValue(): string {
    return this.value
  }
}
