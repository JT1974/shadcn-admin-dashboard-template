"use client"

import { useMemo } from "react"
import { NumericFormat } from "react-number-format"

interface Props {
  value?: string | number | null
  currency?: string | null
}

const Currency = ({ value, currency }: Props) => {
  const format = useMemo(() => {
    switch (currency) {
      case "EUR":
        return { decimalScale: 2, prefix: "€ " }
      case "USD":
        return { decimalScale: 2, prefix: "$ " }
      case "GBP":
        return { decimalScale: 2, prefix: "£ " }
      case "HUF":
        return { decimalScale: 0, suffix: " Ft" }
      default:
        return { decimalScale: 2, suffix: ` ${currency}` }
    }
  }, [currency])

  if (!value) return null

  return (
    <NumericFormat
      displayType="text"
      value={value}
      decimalScale={format.decimalScale}
      thousandSeparator
      prefix={format.prefix}
      suffix={format.suffix}
    />
  )
}

export default Currency
