import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "./session"
import { use } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

