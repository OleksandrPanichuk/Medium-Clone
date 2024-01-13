'use server'

import { SESSION_COOKIE_NAME } from '@/shared/config'
import { cookies } from 'next/headers'


export async function deleteSessionCookie() {
	cookies().delete(SESSION_COOKIE_NAME)
}