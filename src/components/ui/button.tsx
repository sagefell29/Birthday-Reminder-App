import * as React from "react"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-black text-white hover:opacity-90 ${className}`}
      {...props}
    />
  )
}