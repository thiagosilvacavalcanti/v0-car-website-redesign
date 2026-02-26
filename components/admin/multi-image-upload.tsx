"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, GripVertical } from "lucide-react"

type MultiImageUploadProps = {
  value: string[]
  onChange: (urls: string[]) => void
  onUpload: (file: File) => Promise<string>
  label?: string
}

export function MultiImageUpload({ value, onChange, onUpload, label }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"))

      if (imageFiles.length === 0) {
        setError("Selecione ao menos um arquivo de imagem")
        return
      }

      const oversized = imageFiles.filter((f) => f.size > 10 * 1024 * 1024)
      if (oversized.length > 0) {
        setError(`${oversized.length} arquivo(s) excede(m) 10MB e sera(o) ignorado(s)`)
      } else {
        setError("")
      }

      const validFiles = imageFiles.filter((f) => f.size <= 10 * 1024 * 1024)
      if (validFiles.length === 0) return

      setUploading(true)
      setUploadCount(validFiles.length)

      const newUrls: string[] = []

      for (const file of validFiles) {
        try {
          const url = await onUpload(file)
          newUrls.push(url)
        } catch (err: any) {
          console.error(`Erro ao enviar ${file.name}:`, err)
        }
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls])
      }

      setUploading(false)
      setUploadCount(0)
    },
    [onUpload, onChange, value],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)

      if (e.dataTransfer.files?.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) handleFiles(files)
      if (inputRef.current) inputRef.current.value = ""
    },
    [handleFiles],
  )

  // Drag to reorder handlers
  const handleItemDragStart = useCallback((index: number) => {
    setDragIndex(index)
  }, [])

  const handleItemDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault()
      if (dragIndex !== null && dragIndex !== index) {
        setDragOverIndex(index)
      }
    },
    [dragIndex],
  )

  const handleItemDragEnd = useCallback(() => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      const newUrls = [...value]
      const [movedItem] = newUrls.splice(dragIndex, 1)
      newUrls.splice(dragOverIndex, 0, movedItem)
      onChange(newUrls)
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }, [dragIndex, dragOverIndex, value, onChange])

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium leading-none">{label}</p>}

      {/* Grid de imagens existentes */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              draggable
              onDragStart={() => handleItemDragStart(index)}
              onDragOver={(e) => handleItemDragOver(e, index)}
              onDragEnd={handleItemDragEnd}
              className={`
                relative group rounded-lg overflow-hidden border bg-muted cursor-grab active:cursor-grabbing
                ${dragOverIndex === index ? "ring-2 ring-primary" : "border-border"}
                ${dragIndex === index ? "opacity-50" : ""}
              `}
            >
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-28 object-cover"
              />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div className="absolute top-1.5 left-1.5">
                  <GripVertical className="h-4 w-4 text-primary-foreground" />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="sr-only">Remover imagem {index + 1}</span>
                </Button>
              </div>
              <div className="absolute bottom-1 left-1 bg-foreground/70 text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Area de upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragOver(false)
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6
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
        aria-label="Enviar imagens adicionais"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />

        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">
              Enviando {uploadCount} imagem(ns)...
            </p>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-foreground">
                Arraste imagens ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Selecione varios arquivos de uma vez (max. 10MB cada)
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
