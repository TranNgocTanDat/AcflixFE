import AuthResponse from "../model/AuthResponse"
import UserInfo from "../model/UserInfo"
import api from "./api"

export const authenticate = async (email: string, password: string) => {
    return api.post<AuthResponse>("/auth", {email, password})
}

export const getUserInfo = async () => {
    return api.get<UserInfo>("/me")
}