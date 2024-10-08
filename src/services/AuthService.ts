import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { ApiToken, Invitation, LoginCredentials, RegisterData, User } from 'src/contracts'
import { api } from 'src/boot/axios'

type Channel = {
    name: string,
    isPrivate: boolean,
    isMember: boolean
}


type Me = {
    username: string,
    id: string,
    status: string,
    isMuted: boolean,
    email: string,
    channels: Channel[],
    invitations: Invitation[]
}

class AuthService {
    async me (dontTriggerLogout = false): Promise<Me | null> {
        return api.get(
            'auth/me',
            { dontTriggerLogout } as AxiosRequestConfig
        )
        .then((response) => response.data)
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                return null
            }

            return Promise.reject(error)
        })
    }

    async register (data: RegisterData): Promise<User> {
        const response = await api.post<User>('auth/register', data)
        return response.data
    }

    async login (credentials: LoginCredentials): Promise<ApiToken> {
        const response = await api.post<ApiToken>('auth/login', credentials)
        return response.data
    }

    async logout (): Promise<void> {
        await api.post('auth/logout')
    }
}


const authService = new AuthService()

export default authService
