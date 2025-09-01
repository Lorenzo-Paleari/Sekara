import { httpHandler } from "@/server" // handler http per gestire qualsiasi richiesta in arrivo

export const runtime = "edge"


// usiamo lo stesso handler sia per GET che per POST
export { httpHandler as GET, httpHandler as POST }
