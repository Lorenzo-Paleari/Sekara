import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

//istanza globale per la connessione al database
//evita la creazione di piu istanze
declare global {
  var cachedPrisma: PrismaClient
}

  //pool: insieme di connessioni aperte al database PostgreSQL
  //prismaNeon: adattatore Prisma-Neon
  //prismaClient: client Prisma per interagire con il database

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(pool)
  prisma = new PrismaClient({ adapter })
} else {
  if (!global.cachedPrisma) { //se non c'è gia
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool)
    global.cachedPrisma = new PrismaClient({ adapter })
  }
  prisma = global.cachedPrisma
}

//l'oggetto esportato sarà un'istanza di PrismaClient gia collegata al DB
// che mi permette di fare qualsiasi operazione al BD
export const db = prisma
