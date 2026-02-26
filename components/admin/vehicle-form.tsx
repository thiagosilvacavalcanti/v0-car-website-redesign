"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Save } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import { MultiImageUpload } from "@/components/admin/multi-image-upload"
import { uploadVehicleImage } from "@/lib/supabase/storage"

type VehicleFormProps = {
  vehicle?: any
}

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    year: vehicle?.year || new Date().getFullYear(),
    price: vehicle?.price || "",
    mileage: vehicle?.mileage || "",
    fuel_type: vehicle?.fuel_type || "Flex",
    transmission: vehicle?.transmission || "Manual",
    color: vehicle?.color || "",
    description: vehicle?.description || "",
    features: vehicle?.features?.join(", ") || "",
    image_url: vehicle?.image_url || "",
    images: (vehicle?.images || []) as string[],
    status: vehicle?.status || "available",
    featured: vehicle?.featured || false,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.brand || !formData.model || !formData.year || !formData.price || !formData.mileage) {
        throw new Error("Preencha todos os campos obrigatórios")
      }

      const vehicleData = {
        ...formData,
        year: Number.parseInt(formData.year.toString()),
        price: Number.parseFloat(formData.price.toString()),
        mileage: Number.parseInt(formData.mileage.toString()),
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        images: formData.images,
      }

      if (vehicle) {
        // Update all fields including those that might have been missing
        const { error } = await supabase.from("vehicles").update(vehicleData).eq("id", vehicle.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("vehicles").insert([vehicleData])

        if (error) throw error
      }

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Erro ao salvar veículo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Ex: Chevrolet"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Ex: Onix Plus"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year">Ano *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                min="1980"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Quilometragem *</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fuel_type">Combustível *</Label>
              <select
                id="fuel_type"
                value={formData.fuel_type}
                onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="Flex">Flex</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Diesel">Diesel</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Câmbio *</Label>
              <select
                id="transmission"
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
                <option value="Automático CVT">Automático CVT</option>
                <option value="CVT">CVT</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Cor *</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Ex: Branco"
                required
              />
            </div>
          </div>

          <ImageUpload
            label="Imagem Principal"
            required
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            onUpload={(file) => uploadVehicleImage(file, vehicle?.id)}
          />

          <MultiImageUpload
            label="Imagens Adicionais (Galeria)"
            value={formData.images}
            onChange={(urls) => setFormData({ ...formData, images: urls })}
            onUpload={(file) => uploadVehicleImage(file, vehicle?.id)}
          />

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o veículo, seu estado de conservação, diferenciais, etc..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Características (separadas por vírgula)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Ar condicionado, Direção hidráulica, Vidros elétricos, Travas elétricas"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="available">Disponível</option>
                <option value="reserved">Reservado</option>
                <option value="sold">Vendido</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-8">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Destacar na página inicial
              </Label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button type="submit" disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            {loading ? "Salvando..." : vehicle ? "Atualizar Veículo" : "Adicionar Veículo"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={loading}>
            Cancelar
          </Button>
        </div>
      </Card>
    </form>
  )
}
