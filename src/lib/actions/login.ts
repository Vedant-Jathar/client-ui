"use server"

import { parse } from "cookie"
import { cookies } from "next/headers"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (!response.ok) {
            const error = await response.json()
            console.log("error:", error);

            return {
                type: "error",
                message: error.errors[0].message
            }
        }

        const cookiesArray = response.headers.getSetCookie()

        const accessToken = cookiesArray.find(cookie => cookie.startsWith("accessToken"))
        const refreshToken = cookiesArray.find(cookie => cookie.startsWith("refreshToken"))

        const parsedAccessToken = parse(accessToken as string)
        const parsedRefreshToken = parse(refreshToken as string)

        const cookieStore = await cookies()

        cookieStore.set({
            name: "accessToken",
            domain: ".pizzify.store",//only in production ("localhost" in dev)
            value: parsedAccessToken.accessToken as string,
            httpOnly: true,
            path: parsedAccessToken.Path as string,
            sameSite: "strict",
            expires: new Date(parsedAccessToken.Expires as string),
            secure: true
        })

        cookieStore.set({
            name: "refreshToken",
            domain: ".pizzify.store",//only in production("localhost" in dev)
            value: parsedRefreshToken.refreshToken as string,
            httpOnly: true,
            path: parsedRefreshToken.Path as string,
            sameSite: "strict",
            expires: new Date(parsedRefreshToken.Expires as string),
            secure: true
        })

        return {
            type: "Success",
            message: "Login successful"
        }

    } catch (error) {
        console.log("error", error);

        return {
            type: "error",
            message: "Login failed"
        }
    }
}