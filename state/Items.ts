export type Items = {
  name: string | null
  price: number | null
  quantity: number | null
  totalQuantity: number | null
  totalPrice: number | null
}

export function createItems(): Items {
  return {
    name: null,
    price: null,
    quantity: null,
    totalQuantity: null,
    totalPrice: null,
  }
}
