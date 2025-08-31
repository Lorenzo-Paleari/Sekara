# Sekara
![Logo](public/brandIcon.png)

Applicazione SaaS per testare Next.js App Router, Postgres, TypeScript, React, Tailwind \& Clerk.

 l'idea è creare un cron job per monitorare processi ricorrenti, per scoprire errori o tenere traccia di azioni eseguite.


Informazioni developer:

    se riscontri problemi col terminale di VS prova ad usare cmd invece di powershell

    invece di storybook per questo progetto usiamo: 
    npm run dev 
    alla porta: http://localhost:3000

    npx prisma studio 
    per aprire il database sulla porta 5555


informazioni per me:
    @ per l'absolute path
    Next.js fa server side rendering e routing

    const Page = () => ... //crea l'oggetto React
    export default Page  //dichiari che quando importi questo file, stai importando l'oggetto Page

    f({ x , y , z }) : passa come parametro l'oggetto (x,y,z) {}: definisce un singolo oggetto

Cose da fare:

    deploy dell'app poi generare webhook con stripe e metterlo in .env



    provare a trasformare gli string piu grandi in buffer

            // Invece di salvare una stringa grande:
            const data = "stringa molto lunga..."
            // Salva come Buffer:
            const buffer = Buffer.from(data, "utf-8")
            // Poi, quando serve, decodifica:
            const decoded = buffer.toString("utf-8")

        webpack.config.js: (e aggiorna)
            cache: {
            type: 'filesystem',
            compression: 'brotli', // o 'gzip'
            maxMemoryGenerations: 1, // riduci la memoria usata
            }