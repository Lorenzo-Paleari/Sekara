import { db } from "@/db" // db utenti
import { stripe } from "@/lib/stripe" // stripe sdk
import { headers } from "next/headers" // per leggere header
import Stripe from "stripe" // il tipo stripe


// Logica per mandare la richiesta a Stripe del pagamento
export async function POST(req: Request) {
  const body = await req.text() // corpo della richiesta
  const signature = headers().get("stripe-signature") // firma stripe

  // verifichiamo che la richiesta arrivi davvero da Stripe
  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? "",
    process.env.STRIPE_WEBHOOK_SECRET ?? ""
  )

  // se il pagamento è andato a buon fine
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const { userId } = session.metadata || { userId: null }

    // se manca userId, errore
    if (!userId) {
      return new Response("Invalid metadata", { status: 400 })
    }

    // aggiorniamo l'utente a PRO
    await db.user.update({
      where: { id: userId },
      data: { plan: "PRO" },
    })
  }

  // rispondiamo sempre OK
  return new Response("OK")
}
