"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"

interface Reaction {
    id: string
    userId: string
    productId: string
}

export const useUserReaction = (id: string, reaction: Reaction[]) => {
    const { user } = useUser()
    const [userActivity, setUserActivity] = useState({
        id: id,
        isReacted: false
    })

    const handleReaction = () => {
        const isReacted = reaction.find(({ userId }) => userId === user?.id)
        if (!isReacted) {
            setUserActivity({
                id: id,
                isReacted: false
            })
        } else {
            setUserActivity({
                id: isReacted.id,
                isReacted: true
            })
        }
    }

    useEffect(() => {
        if (user) {
            handleReaction()
        }
    }, [user, reaction])      

    return userActivity
}