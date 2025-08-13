import { cookies } from "next/headers"
import { Tenant } from "./types"

interface Session {
    user: User
}

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    tenant: Tenant | null
}

export const getSession = async () => {
    return await getSelf()
}

const getSelf = async (): Promise<Session | null> => {
    const cookieGetter = await cookies()
    console.log("cookieGetter.get(accessToken)?.value", cookieGetter.get("accessToken")?.value);

    const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/self`,
        {
            headers: {
                Authorization: `Bearer ${cookieGetter.get("accessToken")?.value}`
            }
        }
    )

    console.log("response", response);

    if (!response.ok) {
        return null
    }

    const user = await response.json()

    console.log("user", user);

    return {
        user
    }
}