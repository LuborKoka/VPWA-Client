import { User } from 'src/contracts'

export interface AuthStateInterface {
    user: User | null,
    status: 'pending' | 'success' | 'error',
    errors: { message: string, field?: string }[]
  }

function state (): AuthStateInterface {
  return {
    user: { //bude treba potom usera prepisat na null
        username: 'Emil Igelitka',
        email: 'Jozo',
        createdAt: 'whatever',
        id: 'uuid'
    },
    status: 'success',
    errors: []
  }
}

export default state
