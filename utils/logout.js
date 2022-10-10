import { post } from "../utils/sdk"

export const logout = () => {
    return post('auth/logout/', {})
  }