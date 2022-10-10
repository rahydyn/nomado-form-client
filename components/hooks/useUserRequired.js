import { useContext, useEffect } from "react"

import { get } from "../../utils/sdk"
import { UserContext } from "../../context/UserContext"

const getMe = () => get("users/me/")

export const useUserRequired = () => {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
      if (!user) {
        getMe().then(res => setUser(res.data))
      }
    }, [user, setUser])
}