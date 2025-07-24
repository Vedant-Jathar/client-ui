"use server"
import { cookies } from "next/headers"

export const logout = async () => {

    const cookieGetter = await cookies()

    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cookieGetter.get("accessToken")?.value}`,
                cookie: `refreshToken=${cookieGetter.get("refreshToken")?.value}`
            }
        })

        if (!response.ok) {
            const error = await response.json()
            console.log("error", error.errors[0].message);
            return null
        }

        cookieGetter.delete("accessToken")
        cookieGetter.delete("refreshToken")
    } catch (error) {
        console.log(error);
    }
}