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

        cookieGetter.set({
            name: "accessToken",
            domain: ".pizzify.store",//only in production ("localhost" in dev)
            value: "",
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            expires: new Date(Date.now() - 1000),
            secure: true
        })

        cookieGetter.set({
            name: "refreshToken",
            domain: ".pizzify.store",//only in production("localhost" in dev)
            value: "",
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            expires: new Date(Date.now() - 1000),
            secure: true
        })
    } catch (error) {
        console.log(error);
    }
}