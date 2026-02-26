"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"

type ImageUploadProps = {
  value: string
  onChange: (url: string) => void
  onUpload: (file: File) => Promise<string>
  label?: string
  required?: boolean
}

export function ImageUpload({ value, onChange, onUpload, label, required }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("O arquivo deve ser uma imagem (JPG, PNG, WebP, etc.)")
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("A imagem deve ter no maximo 10MB")
        return
      }

      setError("")
      setUploading(true)

      try {
        const url = await onUpload(file)
        onChange(url)
      } catch (err: any) {
        setError(err.message || "Erro ao fazer upload")
      } finally {
        setUploading(false)
      }
    },
    [onUpload, onChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
      if (inputRef.current) inputRef.current.value = ""
    },
    [handleFile],
  )

  const handleRemove = useCallback(() => {
    onChange("")
    setError("")
  }, [onChange])

  if (value) {
    return (
      <div className="space-y-2">
        {label && (
          <p className="text-sm font-medium leading-none">
            {label}
            {required && " *"}
          </p>
        )}
        <div className="relative group rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={value}
            alt="Imagem enviada"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Remover
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium leading-none">
          {label}
          {required && " *"}
        </p>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8
          cursor-pointer transition-colors
          ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"}
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        aria-label={label || "Enviar imagem"}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {uploading ? (
          <>
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Enviando imagem...</p>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG ou WebP (max. 10MB)
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
