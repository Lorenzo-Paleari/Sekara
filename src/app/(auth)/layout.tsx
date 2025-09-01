import { ReactNode } from "react" // tipo React per i figli
import { Navbar } from "@/components/navbar" // navbar in alto


// layout auth
const Layout = ({ children }: { children: ReactNode }) => {
  // mostra la navbar e poi il contenuto della pagina
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
