
// pagina impostazioni account
"use client"

import { Button } from "@/components/ui/button" // bottone
import { Card } from "@/components/ui/card" // box grafico
import { Input } from "@/components/ui/input" // campo input
import { Label } from "@/components/ui/label" // etichetta
import { client } from "@/lib/client" // chiamate API
import { useMutation } from "@tanstack/react-query" // mutazioni API
import Link from "next/link" // link
import { useState } from "react" // stato locale


export const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId) // stato locale per l'input

  // funzione per salvare il nuovo discordId
  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordID.$post({ discordId })
      return await res.json()
    },
  })

  // layout impostazioni account
  return (
    <Card className="max-w-xl w-full space-y-4">
      <div className="pt-2">
        <Label>Discord ID</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>

      {/* link per spiegare come trovare il discord id */}
      <p className="mt-2 text-sm/6 text-gray-600">
        Don't know how to find your Discord ID?{" "}
        <Link href="#" className="text-brand-600 hover:text-brand-500">
          Learn how to obtain it here
        </Link>
        .
      </p>

      {/* bottone per salvare */}
      <div className="pt-4">
        <Button onClick={() => mutate(discordId)} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  )
}
