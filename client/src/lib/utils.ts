import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { APP_URL } from '@/shared/config'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const absolutePath = (path: string) => {
	return APP_URL + path
}

export function toDateString(date: Date): string {
	const dateObject = new Date(date)
	return dateObject.toDateString()
}



export function parseJSON<T>(value: string | null): T | undefined {
	try {
	  return value === 'undefined' ? undefined : JSON.parse(value ?? '')
	} catch {
	  console.log('parsing error on', { value })
	  return undefined
	}
  }
  