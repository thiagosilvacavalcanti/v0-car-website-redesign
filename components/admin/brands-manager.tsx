"use client"

import { useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/admin/image-upload"
import { uploadBrandLogo } from "@/lib/supabase/storage"
import { Loader2, Plus, Trash2, AlertCircle } from "lucide-react"

type Brand = {
  id: string
  name: string
  logo_url: string | null
  display_order: number
  active: boolean
}

export function BrandsManager() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [newBrandName, setNewBrandName] = useState("")
  const [adding, setAdding] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const fetchBrands = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("car_brands")
      .select("*")
      .order("display_order", { ascending: true })

    if (error) {
      setError("Erro ao carregar marcas")
    } else {
      setBrands(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchBrands()
  }, [])

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return

    setAdding(true)
    setError("")

    const { error } = await supabase.from("car_brands").insert([
      {
        name: newBrandName.trim(),
        display_order: brands.length,
        active: true,
      },
    ])

    if (error) {
      setError(error.message.includes("duplicate")
        ? "Essa marca ja existe"
        : "Erro ao adicionar marca")
    } else {
      setNewBrandName("")
      await fetchBrands()
    }

    setAdding(false)
  }

  const handleLogoChange = async (brandId: string, url: string) => {
    setSaving(brandId)
    setError("")

    const { error } = await supabase
      .from("car_brands")
      .update({ logo_url: url || null })
      .eq("id", brandId)

    if (error) {
      setError("Erro ao atualizar logo")
    } else {
      setBrands((prev) =>
        prev.map((b) => (b.id === brandId ? { ...b, logo_url: url || null } : b)),
      )
    }

    setSaving(null)
  }

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm("Tem certeza que deseja remover esta marca?")) return

    setError("")
    const { error } = await supabase.from("car_brands").delete().eq("id", brandId)

    if (error) {
      setError("Erro ao remover marca")
    } else {
      setBrands((prev) => prev.filter((b) => b.id !== brandId))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Adicionar nova marca */}
      <Card className="p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-2">
            <Label htmlFor="new-brand">Nova Marca</Label>
            <Input
              id="new-brand"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Ex: Chevrolet"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddBrand()
                }
              }}
            />
          </div>
          <Button
            onClick={handleAddBrand}
            disabled={adding || !newBrandName.trim()}
            className="gap-2"
          >
            {adding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Adicionar
          </Button>
        </div>
      </Card>

      {/* Lista de marcas */}
      {brands.length === 0 ? (
        <Card className="p-8">
          <p className="text-center text-muted-foreground">
            Nenhuma marca cadastrada. Adicione uma acima.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{brand.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteBrand(brand.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remover {brand.name}</span>
                </Button>
              </div>

              <ImageUpload
                value={brand.logo_url || ""}
                onChange={(url) => handleLogoChange(brand.id, url)}
                onUpload={(file) => uploadBrandLogo(file, brand.name)}
              />

              {saving === brand.id && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Salvando...
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
