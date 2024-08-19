"use client" 
 
import { useEffect } from 'react'

import { SomethingWentWrong } from '@/components/errors-response'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <SomethingWentWrong reset={reset} />
  )
}