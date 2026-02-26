-- Criar buckets publicos para imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicles', 'vehicles', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('brands', 'brands', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: leitura publica para o bucket vehicles
CREATE POLICY "Imagens de veiculos sao publicas" ON storage.objects
  FOR SELECT USING (bucket_id = 'vehicles');

-- Policy: upload autenticado para o bucket vehicles
CREATE POLICY "Usuarios autenticados podem fazer upload de imagens de veiculos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vehicles' AND auth.role() = 'authenticated');

-- Policy: update autenticado para o bucket vehicles
CREATE POLICY "Usuarios autenticados podem atualizar imagens de veiculos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'vehicles' AND auth.role() = 'authenticated');

-- Policy: delete autenticado para o bucket vehicles
CREATE POLICY "Usuarios autenticados podem deletar imagens de veiculos" ON storage.objects
  FOR DELETE USING (bucket_id = 'vehicles' AND auth.role() = 'authenticated');

-- Policy: leitura publica para o bucket brands
CREATE POLICY "Logos de marcas sao publicos" ON storage.objects
  FOR SELECT USING (bucket_id = 'brands');

-- Policy: upload autenticado para o bucket brands
CREATE POLICY "Usuarios autenticados podem fazer upload de logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'brands' AND auth.role() = 'authenticated');

-- Policy: update autenticado para o bucket brands
CREATE POLICY "Usuarios autenticados podem atualizar logos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'brands' AND auth.role() = 'authenticated');

-- Policy: delete autenticado para o bucket brands
CREATE POLICY "Usuarios autenticados podem deletar logos" ON storage.objects
  FOR DELETE USING (bucket_id = 'brands' AND auth.role() = 'authenticated');
