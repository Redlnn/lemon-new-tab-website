interface NavigatorUADataBrand {
  brand: string
  version: string
}

interface NavigatorUAData {
  brands: NavigatorUADataBrand[]
  mobile: boolean
  getHighEntropyValues?: (hints: string[]) => Promise<Record<string, any>>
}

interface Navigator {
  userAgentData?: NavigatorUAData
}
