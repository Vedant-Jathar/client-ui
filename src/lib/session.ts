import { cookies } from "next/headers"
import { Tenant } from "./types"

interface Session {
    user: User
}

interface User {
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

    const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/self`,
        {
            headers: {
                Authorization: `Bearer ${cookieGetter.get("accessToken")?.value}`
            }
        }
    )


    if (!response.ok) {
        return null
    }

    const user = await response.json()


    return {
        user
    }
}