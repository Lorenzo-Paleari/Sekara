import { DashboardPage } from "@/components/dashboard-page" // layout dashboard
import { db } from "@/db" // db prisma
import { currentUser } from "@clerk/nextjs/server" // utente loggato
import { notFound } from "next/navigation" // pagina 404
import { CategoryPageContent } from "./category-page-content" // contenuto categoria

// tipizzazione props della pagina
interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}


// componente pagina categoria (async per fetch dati)
const Page = async ({ params }: PageProps) => {
  // se il nome non è stringa -> 404
  if (typeof params.name !== "string") return notFound()

  // prendi utente loggato (Clerk)
  const auth = await currentUser()
  if (!auth) {
    return notFound()
  }

  // cerca utente nel db tramite externalId
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })
  if (!user) return notFound()

  // cerca la categoria per nome e userId
  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true, // conta eventi
        },
      },
    },
  })
  if (!category) return notFound()

  // true se ci sono eventi
  const hasEvents = category._count.events > 0

  // render pagina dashboard con contenuto categoria
  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  )
}

export default Page
