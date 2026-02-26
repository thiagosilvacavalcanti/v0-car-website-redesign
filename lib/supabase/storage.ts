import { createClient } from "./client";

const VEHICLE_BUCKET = "vehicles";
const BRAND_BUCKET = "brands";

function generateUniqueFileName(file: File, prefix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = prefix
    ? prefix.replace(/[^a-zA-Z0-9-_]/g, "_")
    : "img";
  return `${safeName}_${timestamp}_${random}.${extension}`;
}

function getPathFromUrl(url: string, bucket: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return url.substring(index + marker.length);
  } catch {
    return null;
  }
}

export async function uploadVehicleImage(
  file: File,
  vehicleId?: string
): Promise<string> {
  const supabase = createClient();
  const fileName = generateUniqueFileName(file, vehicleId || "vehicle");

  const { error } = await supabase.storage
    .from(VEHICLE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(VEHICLE_BUCKET).getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadBrandLogo(
  file: File,
  brandName: string
): Promise<string> {
  const supabase = createClient();
  const fileName = generateUniqueFileName(file, brandName);

  const { error } = await supabase.storage
    .from(BRAND_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload do logo: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BRAND_BUCKET).getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteStorageFile(
  bucket: string,
  url: string
): Promise<void> {
  const path = getPathFromUrl(url, bucket);
  if (!path) return;

  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error(`Erro ao deletar arquivo do storage: ${error.message}`);
  }
}

export async function deleteVehicleImages(imageUrls: string[]): Promise<void> {
  const paths = imageUrls
    .map((url) => getPathFromUrl(url, VEHICLE_BUCKET))
    .filter((p): p is string => p !== null);

  if (paths.length === 0) return;

  const supabase = createClient();
  const { error } = await supabase.storage.from(VEHICLE_BUCKET).remove(paths);

  if (error) {
    console.error(`Erro ao deletar imagens do storage: ${error.message}`);
  }
}

export { VEHICLE_BUCKET, BRAND_BUCKET };
