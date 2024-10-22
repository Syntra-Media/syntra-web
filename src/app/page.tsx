import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ClientHome from './page.client'

export default async function Home() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Get the first language from the accept-language header
  const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
  
  // If the primary language is not Turkish, redirect to English
  if (primaryLanguage !== 'tr') {
    redirect('/en')
  }

  // If it is Turkish, render the Turkish version without creating a new component
  return <ClientHome initialLocale="tr" />
}