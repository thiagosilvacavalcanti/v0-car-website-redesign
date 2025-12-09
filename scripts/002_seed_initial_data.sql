-- Insert popular car brands
INSERT INTO public.car_brands (name, display_order, active) VALUES
('Volkswagen', 1, true),
('Chevrolet', 2, true),
('Fiat', 3, true),
('Ford', 4, true),
('Honda', 5, true),
('Toyota', 6, true),
('Hyundai', 7, true),
('Renault', 8, true),
('Nissan', 9, true),
('Jeep', 10, true),
('BMW', 11, true),
('Mercedes-Benz', 12, true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample vehicles
INSERT INTO public.vehicles (brand, model, year, price, mileage, fuel_type, transmission, color, description, features, image_url, featured, status) VALUES
('Volkswagen', 'Gol 1.6 MSI', 2023, 65990.00, 15000, 'Flex', 'Manual', 'Branco', 'Volkswagen Gol 1.6 MSI em excelente estado de conservação. Único dono, revisões em dia na concessionária.', ARRAY['Ar condicionado', 'Direção elétrica', 'Vidros elétricos', 'Travas elétricas', 'Alarme'], '/placeholder.svg?height=300&width=400', true, 'available'),
('Chevrolet', 'Onix Plus 1.0 Turbo Premier', 2022, 89990.00, 25000, 'Flex', 'Automático', 'Preto', 'Chevrolet Onix Plus Premier com motor turbo, configuração completa. Carro impecável com garantia de fábrica.', ARRAY['Central multimídia', 'Câmera de ré', 'Sensor de estacionamento', 'Ar digital', 'Bancos em couro', 'Controle de cruzeiro'], '/placeholder.svg?height=300&width=400', true, 'available'),
('Fiat', 'Argo 1.3 Firefly Drive', 2023, 71990.00, 18000, 'Flex', 'Manual', 'Vermelho', 'Fiat Argo Drive 1.3 Firefly, design moderno e econômico. Perfeito para o dia a dia urbano.', ARRAY['Ar condicionado', 'Direção elétrica', 'Vidros elétricos dianteiros', 'Computador de bordo', 'Controle de tração'], '/placeholder.svg?height=300&width=400', true, 'available'),
('Honda', 'Civic 2.0 Sport', 2021, 139990.00, 35000, 'Flex', 'Automático CVT', 'Cinza', 'Honda Civic Sport com motor 2.0, design esportivo e muito conforto. Completo de fábrica.', ARRAY['Multimídia com Apple CarPlay', 'Bancos em couro', 'Teto solar', 'Rodas 18 polegadas', 'Sistema Honda Sensing', 'Ar digital dual zone'], '/placeholder.svg?height=300&width=400', true, 'available'),
('Toyota', 'Corolla 2.0 XEI', 2022, 149990.00, 28000, 'Flex', 'Automático CVT', 'Prata', 'Toyota Corolla XEI 2.0, referência em confiabilidade e conforto. Revisões em dia na concessionária Toyota.', ARRAY['Central multimídia', 'Câmera de ré', 'Sensor de estacionamento', 'Ar digital', 'Piloto automático adaptativo', 'Bancos em couro'], '/placeholder.svg?height=300&width=400', true, 'available'),
('Hyundai', 'HB20 1.0 Turbo Evolution', 2023, 79990.00, 12000, 'Flex', 'Automático', 'Azul', 'Hyundai HB20 Evolution com motor turbo, excelente desempenho e economia. Configuração premium.', ARRAY['Central multimídia 8 polegadas', 'Câmera de ré', 'Ar automático', 'Freio automático', 'Controle de tração'], '/placeholder.svg?height=300&width=400', false, 'available'),
('Ford', 'Ranger XLT 3.2 4x4 Diesel', 2020, 189990.00, 45000, 'Diesel', 'Automático', 'Branco', 'Ford Ranger XLT 4x4 Diesel, potência e robustez. Ideal para trabalho e lazer, cabine dupla.', ARRAY['Tração 4x4', 'Central multimídia SYNC', 'Câmera de ré', 'Ar condicionado', 'Bancos em couro', 'Santo antônio'], '/placeholder.svg?height=300&width=400', false, 'available'),
('Jeep', 'Compass 2.0 Longitude Diesel', 2021, 159990.00, 32000, 'Diesel', 'Automático', 'Preto', 'Jeep Compass Longitude Diesel com tração 4x4, design imponente e muito conforto interno.', ARRAY['Tração 4x4', 'Teto solar panorâmico', 'Bancos em couro', 'Multimídia UConnect', 'Sensor 360°', 'Ar digital'], '/placeholder.svg?height=300&width=400', false, 'available')
ON CONFLICT DO NOTHING;
