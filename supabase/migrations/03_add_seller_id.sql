-- Añadir campo seller_id a la tabla de transacciones
ALTER TABLE public.transactions 
ADD COLUMN seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Crear índice para búsquedas por vendedor
CREATE INDEX IF NOT EXISTS idx_transactions_seller_id ON public.transactions(seller_id);

-- Actualizar políticas de RLS para permitir que los vendedores vean sus ventas
CREATE POLICY "Vendedores pueden ver sus ventas" 
ON public.transactions FOR SELECT 
USING (auth.uid() = seller_id);

-- Política para que los vendedores puedan actualizar transacciones donde son vendedores
CREATE POLICY "Vendedores pueden actualizar sus ventas" 
ON public.transactions FOR UPDATE 
USING (auth.uid() = seller_id); 