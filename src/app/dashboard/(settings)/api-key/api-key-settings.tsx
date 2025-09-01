
// pagina impostazioni API key
"use client"

import { Button } from "@/components/ui/button" // bottone
import { Card } from "@/components/ui/card" // box grafico
import { Input } from "@/components/ui/input" // campo input
import { Label } from "@/components/ui/label" // etichetta
import { CheckIcon, ClipboardIcon } from "lucide-react" // icone
import { useState } from "react" // stato locale


export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false) // stato per feedback copia

  // funzione per copiare la chiave
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // layout impostazioni api key
  return (
    <Card className="max-w-xl w-full">
      <div>
        <Label>Your API Key</Label>
        <div className="mt-1 relative">
          <Input type="password" value={apiKey} readOnly />
          <div className="absolute space-x-0.5 inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              onClick={copyApiKey}
              className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-brand-900" />
              ) : (
                <ClipboardIcon className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>

        {/* avviso di sicurezza */}
        <p className="mt-2 text-sm/6 text-gray-600">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}
