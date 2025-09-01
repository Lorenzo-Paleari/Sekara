import { DashboardPage } from "@/components/dashboard-page" // layout dashboard
import { db } from "@/db" // db
import { currentUser } from "@clerk/nextjs/server" // utente loggato
import { redirect } from "next/navigation" // redirect
import { UpgradePageContent } from "./upgrade-page-content" // contenuto upgrade


// pagina upgrade async
const Page = async () => {
  const auth = await currentUser() // utente loggato

  if (!auth) {
    redirect("/sign-in") // se non loggato, vai al login
  }

  // cerchiamo l'utente nel db
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in") // se non trovato, vai al login
  }

  // mostriamo la pagina upgrade
  return (
    <DashboardPage title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardPage>
  )
}

export default Page
