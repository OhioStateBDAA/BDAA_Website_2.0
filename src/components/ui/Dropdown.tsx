'use client'

interface DropdownProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Dropdown({ options, value, onChange, placeholder = 'Select year', className = '' }: DropdownProps) {
  return (
    <select aria-label={placeholder} value={value} onChange={event => onChange(event.target.value)}
      className={`w-full bg-white border border-black rounded-lg px-4 py-3 text-black font-primary ${className}`}>
      <option value="" disabled>{placeholder}</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  )
}
