
// Questa riga serve a dire a Next.js che questa pagina va eseguita lato client (cioè nel browser),
// perché usa componenti che funzionano solo lì (come SignUp di Clerk).
"use client"


import { SignUp } from "@clerk/nextjs" // importiamo SignUp da Clerk



// pagina registrazione
const Page = () => {
  // centriamo il form di registrazione
  // dopo la registrazione, l'utente viene mandato su /welcome
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </div>
  )
}


export default Page
