// module-status/state.ts
import { UserStatus } from 'src/contracts/Users';

export interface StatusStateInterface {
  id: number;
  username: string;
  status: 'online' | 'offline' | 'dnd',
}



function state (): StatusStateInterface {
  return {
    id: 0,
    username: '',
    status: 'offline',
  };
}

export default state;
