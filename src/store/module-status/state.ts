
//import { Auth } from  'src/contracts'

export interface StatusStateInterface {
  status: 'online' | 'offline' | 'dnd'
  error: Error | null
  is_muted: boolean

}

function state(): StatusStateInterface {
  return {
    
    status: 'online',
    error: null,
    is_muted: false

  };
}

export default state;
