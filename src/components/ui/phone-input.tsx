"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const PhoneInputComponent = React.forwardRef<
  HTMLInputElement,
  PhoneInputProps
>(({ className, value, onChange, placeholder, disabled, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState("")

  // Função para aplicar a máscara (99) 9 9999-9999
  const applyMask = (input: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = input.replace(/\D/g, '')

    // Aplica a máscara baseada no tamanho
    if (numbers.length === 0) return ""
    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 3) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11)
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 3)} ${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
  }

  // Função para extrair apenas os números do valor mascarado
  const extractNumbers = (maskedValue: string) => {
    return maskedValue.replace(/\D/g, '')
  }

  // Função para formatar o valor final com código do país
  const formatFinalValue = (numbers: string) => {
    if (numbers.length === 11) {
      return `+55${numbers}`
    }
    return numbers
  }

  // Atualiza o valor de exibição quando o valor prop muda
  React.useEffect(() => {
    if (value) {
      // Se o valor já tem código do país, remove ele
      const cleanValue = value.replace(/^\+55/, '')
      setDisplayValue(applyMask(cleanValue))
    } else {
      setDisplayValue("")
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const maskedValue = applyMask(inputValue)
    const numbers = extractNumbers(maskedValue)

    setDisplayValue(maskedValue)

    // Chama onChange com o valor formatado (código do país + números)
    if (onChange) {
      const finalValue = formatFinalValue(numbers)
      onChange(finalValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números, backspace, delete, tab, escape, enter
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const isNumber = e.key >= '0' && e.key <= '9'

    if (!allowedKeys.includes(e.key) && !isNumber) {
      e.preventDefault()
    }
  }

  return (
    <input
      ref={ref}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder || "(11) 9 9999-9999"}
      disabled={disabled}
      maxLength={16} // (99) 9 9999-9999 = 16 caracteres
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
})

PhoneInputComponent.displayName = "PhoneInput"

export { PhoneInputComponent }
