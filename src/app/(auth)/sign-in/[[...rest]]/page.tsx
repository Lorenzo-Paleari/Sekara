
"use client"

import { SignIn } from "@clerk/nextjs" // importiamo SignIn da Clerk
import { useSearchParams } from "next/navigation" // per leggere i parametri dalla URL


// pagina login
const Page = () => {
  const searchParams = useSearchParams() // parametri dalla URL
  const intent = searchParams.get("intent") // intent (es. upgrade, se stai facendo il login per abbonarti) se presente 

  // centriamo il form di login
  // dopo il login, l'utente va in dashboard (o dashboard?intent=...)
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}

export default Page
