import { User } from 'src/contracts'

export interface IAuthState {
  user: User | null,
  status: 'pending' | 'success' | 'error',
  errors: { message: string, field?: string }[]
}

function state (): IAuthState {
  return {
    user: null,
    status: 'success',
    errors: []
  }
}

export default state
