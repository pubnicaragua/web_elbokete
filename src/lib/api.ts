/** Cliente de la API de El Bokete para la web. Solo lectura del catálogo público. */

export interface Money {
  minorUnits: number;
  currency: string;
}

/** Servicio publicado, tal como lo entrega `GET /v1/services`. */
export interface Service {
  id: string;
  kind:
    | 'room'
    | 'dayPass'
    | 'padel'
    | 'kayak'
    | 'restaurant'
    | 'roomService'
    | 'membership'
    | 'experience';
  name: string;
  description: string;
  priceFrom: Money;
  priceUnit: 'perNight' | 'perPerson' | 'perSlot' | 'flat';
  bookingMode: 'nights' | 'shifts' | 'quantity';
  capacity: number | null;
  tags: string[];
  rules: string[];
  imageUrls: string[];
}

const API_URL = (import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const TIMEOUT_MS = 8000;

/** Pide una ruta de la API. Falla con un mensaje claro si no responde o responde mal. */
async function get<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (e) {
    throw new Error(`No se pudo llegar a la API de El Bokete en ${API_URL} (${(e as Error).message})`);
  }
  if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
  return (await res.json()) as T;
}

// Al compilar, muchas páginas piden el catálogo: se pide una sola vez por compilación.
let catalog: Promise<Service[]> | undefined;
export const services = () => (catalog ??= get<Service[]>('/v1/services'));

/** Los servicios que son habitaciones. */
export const rooms = async () => (await services()).filter((s) => s.kind === 'room');

/** Todo lo que no es habitación: experiencias, pádel, kayak, Day Pass, restaurante... */
export const experiences = async () =>
  (await services()).filter((s) => s.kind !== 'room' && s.kind !== 'roomService');

/** "$180" / "$18.50": el símbolo va siempre delante, como en la app. */
export function formatMoney({ minorUnits, currency }: Money): string {
  const amount = minorUnits / 100;
  const text = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return currency === 'USD' ? `$${text}` : `${text} ${currency}`;
}

const UNIT_LABEL: Record<Service['priceUnit'], string> = {
  perNight: 'por noche',
  perPerson: 'por persona',
  perSlot: 'por turno',
  flat: '',
};

export const unitLabel = (unit: Service['priceUnit']) => UNIT_LABEL[unit];
