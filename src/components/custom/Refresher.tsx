"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import * as jose from "jose"

const Refresher = ({ children }: { children: React.ReactNode }) => {

    const timeoutId = useRef<NodeJS.Timeout | null>(null)

    const getAccessToken = async () => {
        const res = await fetch("/api/auth/accesstoken")
        const accessToken = await res.json()
        return accessToken?.token
    }

    const startRefresh = useCallback(async () => {
        try {
            console.log("timeouId.current", timeoutId.current);

            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }

            const accessToken = await getAccessToken()
            if (!accessToken) {
                return null
            }

            const decodedToken = jose.decodeJwt(accessToken)

            // Calculating the time when the token should get refreshed
            const currentTime = Date.now()
            const tokenExpiryTime = decodedToken.exp! * 1000
            const refreshTime = tokenExpiryTime - currentTime - 5000

            console.log("currentTime", new Date(currentTime));
            console.log("tokenExpiryTime", new Date(tokenExpiryTime));
            console.log("refreshTime", new Date(tokenExpiryTime - 5000));
            console.log("refreshTime", refreshTime);

            const refreshAccessToken = async () => {
                const response = await fetch('/api/auth/refresh', { method: "POST" })
                if (!response.ok) {
                    return
                }
                startRefresh()
            }

            timeoutId.current = setTimeout(async () => {
                await refreshAccessToken()
            }, refreshTime)

        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        startRefresh()
    }, [])

    return (
        <div>{children}</div>
    )
}

export default Refresher