import { MercadoPagoItem } from './types';

/**
 * Formatea un precio en centavos a la moneda correspondiente
 */
export function formatPrice(amount: number, currencyId = 'ARS'): string {
  const formatter = new Intl.NumberFormat(getCurrencyLocale(currencyId), {
    style: 'currency',
    currency: currencyId,
  });
  
  return formatter.format(amount);
}

/**
 * Obtiene el locale adecuado para el formato de moneda
 */
function getCurrencyLocale(currencyId: string): string {
  const currencyLocales: Record<string, string> = {
    ARS: 'es-AR',
    MXN: 'es-MX',
    COP: 'es-CO',
    USD: 'en-US',
    BRL: 'pt-BR',
  };
  
  return currencyLocales[currencyId] || 'es-AR';
}

/**
 * Formatea un arreglo de productos del carrito a formato MercadoPago
 */
export function formatCartToMercadoPagoItems(
  cartItems: Array<{
    id: string;
    title: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }>,
  currencyId = 'ARS'
): MercadoPagoItem[] {
  return cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description || item.title,
    quantity: item.quantity,
    currency_id: currencyId,
    unit_price: item.price,
    picture_url: item.imageUrl || undefined,
  }));
}

/**
 * Genera un ID único para referencias externas
 */
export function generateExternalReference(prefix = 'ORD'): string {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${prefix}-${timestamp}-${randomPart}`;
}

/**
 * Convierte un monto en la moneda a centavos para MercadoPago
 */
export function convertToCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Obtiene la URL para redirigir según el ambiente (desarrollo/producción)
 */
export function getMercadoPagoRedirectUrl(
  preference: { init_point: string; sandbox_init_point: string },
  isProduction = process.env.NODE_ENV === 'production'
): string {
  return isProduction ? preference.init_point : preference.sandbox_init_point;
} 