import { config } from "../config"

export const _request = async <T>(method: string, endpoint: string, body?: unknown): Promise<T> => {
    const options: RequestInit = {
        headers: {
            // @ts-ignore
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    try {
        const resp = await fetch(config.apiUrl + endpoint, options)
        return resp.json() as Promise<T>
    } catch (err: any) {
        throw new Error(err.message)
    }
}


type NonceResp = { nonce: string }
export const requestNonce = async (address: string) => _request<NonceResp>("POST", "/v1/loginNonce", { address })

type LoginResp = { authToken: string }
export const login = async (address: string, signature: string) => _request<LoginResp>("POST", "/v1/login", { address, signature })
