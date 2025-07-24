import { cookies } from "next/headers";

export async function GET() {

    const cookieGetter = await cookies()
    const accessToken = cookieGetter.get("accessToken")?.value

    return Response.json({ token: accessToken })
    
}