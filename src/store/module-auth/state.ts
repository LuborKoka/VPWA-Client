import { User } from 'src/contracts'

export interface AuthStateInterface {
    user: User | null,
    status: 'pending' | 'success' | 'error',
    errors: { message: string, field?: string }[]
  }

function state (): AuthStateInterface {
  return {
    user: null,
    status: 'success',
    errors: []
  }
}

export default state
