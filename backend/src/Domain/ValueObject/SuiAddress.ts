import { SUI_ADDRESS_LENGTH, SUI_ADDRESS_PREFIX } from '@Constants/SuiConstants'

export class SuiAddress {
  private readonly value: string

  constructor(address: string) {
    if (!SuiAddress.IsValid(address)) {
      throw new Error('Invalid Sui address format')
    }
    this.value = address
  }

  static IsValid(address: string): boolean {
    if (!address || typeof address !== 'string') {
      return false
    }

    if (!address.startsWith(SUI_ADDRESS_PREFIX)) {
      return false
    }

    if (address.length !== SUI_ADDRESS_LENGTH) {
      return false
    }

    const hexPart = address.slice(2)
    if (!/^[0-9a-fA-F]+$/.test(hexPart)) {
      return false
    }

    return true
  }

  GetValue(): string {
    return this.value
  }
}
