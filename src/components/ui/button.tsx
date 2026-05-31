import * as React from "react"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
                rounded-md px-4 py-2
                transition-all duration-200
                disabled:cursor-not-allowed
                disabled:opacity-60
                hover:brightness-90
                ${className}
            `}
      {...props}
    />
  )
}