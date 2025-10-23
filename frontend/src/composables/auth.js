import axiosClient from '@/api/axios'
import jwtDecode from 'jwt-decode'

function getCookie(name) {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
}

export function useAuth() {
    const login = async (payload) => {
        const res = await axiosClient.post('/auth/login', { ...payload })
            // backend sets token cookie; optionally also returns token in body
            const { token } = res.data
            if (token) {
                // write token to cookie for compatibility (server may already set it)
                document.cookie = `token=${token}; path=/;`
            }
            // parse token from cookie
            const cookieToken = getCookie('token') || token
            if (cookieToken) {
                        try {
                            const decoded = jwtDecode(cookieToken)
                            document.cookie = `user=${encodeURIComponent(JSON.stringify(decoded))}; path=/;`
                        } catch {
                            // ignore
                        }
            }
        return res
    }

    const register = async (payload) => {
        const res = await axiosClient.post('/auth/register', { ...payload })
        return res
    }

    const logout = async () => {
            try {
                await axiosClient.post('/auth/logout')
            } catch {
                // ignore
            }
            // clear cookies
            document.cookie = 'token=; Max-Age=0; path=/'
            document.cookie = 'refreshToken=; Max-Age=0; path=/'
            document.cookie = 'user=; Max-Age=0; path=/'
    }

    const currentUser = () => {
            try {
                const raw = getCookie('user')
                if (!raw) return null
                return JSON.parse(decodeURIComponent(raw))
            } catch {
                return null
            }
    }

    const isAuthenticated = () => !!localStorage.getItem('token')

    const hasRole = (roles) => {
        const u = currentUser()
        if (!u) return false
        if (Array.isArray(roles)) return roles.includes(u.role)
        return u.role === roles
    }

    return { login, register, logout, currentUser, isAuthenticated, hasRole }
}