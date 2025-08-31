import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// funzione per unire classi CSS
// prende qualsiasi numero di argomenti di tipo ClassValue
// li unisce in un'unica stringa e risolve i conflitti
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//converte una stringa esadecimale in un numero
export const parseColor = (color: string) => {
  const hex = color.startsWith("#") ? color.slice(1) : color
  return parseInt(hex, 16)
}