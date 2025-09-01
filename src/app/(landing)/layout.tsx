
// Qui importiamo due cose:
// - ReactNode: un tipo speciale di React che rappresenta "qualsiasi cosa si possa mostrare a schermo" (testo, HTML, componenti...)
// - Navbar: il componente che mostra la barra di navigazione in alto
import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"


// Questo componente si chiama Layout e serve per dare una "cornice" comune a tutte le pagine della sezione landing.
//
// "children" è il contenuto che verrà inserito dentro questo layout (cioè la pagina vera e propria)
//  il tipo { children: ReactNode } serve solo a dire che children può essere qualsiasi cosa React possa mostrare
//
// Il return restituisce un frammento (<>...</>) che contiene la Navbar e poi il contenuto della pagina.
// Così ogni pagina avrà sempre la barra di navigazione in alto, senza doverla riscrivere ogni volta.
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
