
// Qui importiamo alcune cose fondamentali per la nostra app:
import type { Metadata } from "next" // Serve per i "metadati" della pagina, tipo titolo e descrizione
import { Inter } from "next/font/google" // Questo ci permette di usare il font Inter
import { Providers } from "../components/providers" // Un componente che useremo per fornire contesto globale (tipo tema o autenticazione)
import { EB_Garamond } from "next/font/google" // Altro font, stavolta per i titoli
import { cn } from "@/utils" // Una funzione che ci aiuta a unire le classi CSS in modo semplice

import "./globals.css" // Qui carichiamo gli stili globali, cioè il CSS che vale per tutta l'app
import { ClerkProvider } from "@clerk/nextjs" // Questo serve per gestire l'autenticazione degli utenti


// Qui "prepariamo" i font che useremo nell'app:
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }) // Font principale per i testi
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading", // Font elegante per i titoli
})


// Qui sotto diciamo a Next.js alcune informazioni sulla nostra app, come si chiama, una breve descrizione e l'icona che si vede nella scheda del browser.
export const metadata: Metadata = {
  title: "Sekara",
  description: "La tua app per la gestione degli eventi",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}


// Questa funzione è il "layout" principale: in pratica, tutto quello che metti qui dentro si vedrà in ogni pagina dell'app.
// "children" è un modo per dire: "qui dentro ci va il contenuto specifico di ogni pagina".
export default function RootLayout({ //funzione principale esportata da questo file
  children, //dichiaro che DEVE riceve come parametro un pezzo di codice leggibile di react
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // ClerkProvider serve per gestire login, registrazione e autenticazione degli utenti
    <ClerkProvider>
      {/* Qui impostiamo la lingua e i font personalizzati che abbiamo scelto sopra. */}
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        {/* <body> è il "corpo" della pagina. Qui applichiamo alcune classi CSS per il font, i colori e per rendere il testo più nitido. */}
        <body className="font-sans bg-brand-50 text-brand-950 antialiased">
          {/* Providers è un componente che "avvolge" tutto il resto */}
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
