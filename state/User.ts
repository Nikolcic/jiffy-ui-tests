export type Users = {
  firstName: string | null
  lastName: string | null
  email: string | null
  address: string | null
  zip: string | null
  city: string | null
}

export function createUser(): Users {
  return {
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    zip: null,
    city: "Paris",
  }
}
