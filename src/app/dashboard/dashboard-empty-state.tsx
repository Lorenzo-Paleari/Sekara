import { CreateEventCategoryModal } from "@/components/create-event-category-modal" // modale per creare categoria
import { Button } from "@/components/ui/button" // bottone
import { Card } from "@/components/ui/card" // card
import { client } from "@/lib/client" // api client
import { useMutation, useQueryClient } from "@tanstack/react-query" // react query


// stato vuoto dashboard: nessuna categoria evento
export const DashboardEmptyState = () => {
  const queryClient = useQueryClient() // per aggiornare cache query

  // mutation per creare categorie di esempio (quickstart)
  const { mutate: insertQuickstartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickstartCategories.$post() // chiama api
    },
    onSuccess: () => {
      // aggiorna lista categorie dopo creazione
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
    },
  })

  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      {/* immagine mascotte sekara */}
      <div className="flex justify-center w-full">
        <img
          src="/Sekara_hi.png"
          alt="No categories"
          className="h-48 w-auto -mt-24"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* titolo stato vuoto */}
      <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
        No Event Categories Yet
      </h1>

      {/* testo descrittivo */}
      <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
        Start tracking events by creating your first category.
      </p>

      {/* bottoni: quickstart e aggiungi categoria */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
        >
          <span className="size-5">🚀</span>
          <span>{isPending ? "Creating..." : "Quickstart"}</span>
        </Button>

        {/* modale per aggiungere categoria manualmente */}
        <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
          <Button className="flex items-center space-x-2 w-full sm:w-auto">
            <span>Add Category</span>
          </Button>
        </CreateEventCategoryModal>
      </div>
    </Card>
  )
}
