import { DashboardPage } from "@/components/dashboard-page" // layout dashboard
import { db } from "@/db" // db prisma
import { currentUser } from "@clerk/nextjs/server" // utente loggato
import { redirect } from "next/navigation" // redirect nextjs
import { DashboardPageContent } from "./dashboard-page-content" // contenuto dashboard
import { CreateEventCategoryModal } from "@/components/create-event-category-modal" // modale nuova categoria
import { Button } from "@/components/ui/button" // bottone
import { PlusIcon } from "lucide-react" // icona plus
import { createCheckoutSession } from "@/lib/stripe" // stripe checkout
import { PaymentSuccessModal } from "@/components/payment-success-modal" // modale successo pagamento

// tipizzazione props della pagina
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


// pagina principale dashboard (async per fetch dati)
const Page = async ({ searchParams }: PageProps) => {
  // prendi utente loggato (Clerk)
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in") // se non loggato, vai a login
  }

  // cerca utente nel db tramite externalId
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })
  if (!user) {
    return redirect("/welcome") // se non trovato, vai a welcome
  }

  // se query ?intent=upgrade, crea sessione stripe e redirect
  const intent = searchParams.intent
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })
    if (session.url) redirect(session.url)
  }

  // se successo pagamento, mostra modale
  const success = searchParams.success

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}

      <DashboardPage
        hideBackButton={true}
        cta={
          // bottone per aggiungere categoria evento
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}

export default Page
