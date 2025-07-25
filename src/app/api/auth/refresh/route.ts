import { cookies } from "next/headers";
import cookie from "cookie"
import { strict } from "assert";

export async function POST() {
    const cookieGetter = await cookies()

    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/auth/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${cookieGetter.get("accessToken")?.value}`,
                    cookie: `refreshToken=${cookieGetter.get("refreshToken")?.value}`
                }
            },
        )

        if (!response.ok) {
            console.log("");
            return
        }

        // Now setting the cookies recieved from the backend in the client 
        const cookiesArray = response.headers.getSetCookie()
        const accessToken = cookiesArray.find((c) => c.startsWith("accessToken"))
        const refreshToken = cookiesArray.find((c) => c.startsWith("refreshToken"))

        const parsedAccessToken = cookie.parse(accessToken as string)
        const parsedRefreshToken = cookie.parse(refreshToken as string)

        cookieGetter.set({
            name: "accessToken",
            value: parsedAccessToken.accessToken as string,
            expires: new Date(parsedAccessToken.Expires!),
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            path: parsedAccessToken.path
        })

        cookieGetter.set({
            name: "refreshToken",
            value: parsedRefreshToken.refreshToken as string,
            expires: new Date(parsedRefreshToken.Expires!),
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            path: parsedRefreshToken.Path

        })

        return Response.json({ type: 'Success' })

    } catch (error) {
        console.log("Error", error);
    }
}