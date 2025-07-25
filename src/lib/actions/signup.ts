"use server"

import { cookies } from "next/headers"
import cookie from "cookie"

export async function signup(prevState: any, formData: FormData) {

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })

        if (!response.ok) {
            const error = await response.json()

            return {
                type: "error",
                message: error.errors[0].message
            }
        }

        const cookiesArray = response.headers.getSetCookie()

        const accessToken = cookiesArray.find(cookie => cookie.startsWith("accessToken"))
        const refreshToken = cookiesArray.find(cookie => cookie.startsWith("refreshToken"))

        const parsedAccessToken = cookie.parse(accessToken as string)
        const parsedRefreshToken = cookie.parse(refreshToken as string)

        const cookieStore = await cookies()

        cookieStore.set({
            name: "accessToken",
            value: parsedAccessToken.accessToken as string,
            httpOnly: true,
            path: parsedAccessToken.Path as string,
            sameSite: "strict",
            expires: new Date(parsedAccessToken.Expires as string),
            secure: true
        })

        cookieStore.set({
            name: "refreshToken",
            value: parsedRefreshToken.refreshToken as string,
            httpOnly: true,
            path: parsedRefreshToken.Path as string,
            sameSite: "strict",
            expires: new Date(parsedRefreshToken.Expires as string),
            secure: true
        })

        return {
            type: "Success",
            message: "Registration successful"
        }

    } catch (error) {
        console.log("error", error);
        return {
            type: "error",
            message: "Registration failed"
        }
    }
}