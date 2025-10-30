import { defineStore } from 'pinia'
import http from '../api/http'
import { loginMock, parseJwt } from '../api/mock'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    useMock: true, // solange kein echtes Backend
  }),
  getters: { isAuthenticated: (s) => !!s.token },
  actions: {
    async login(email, password){
      if (this.useMock){
        const token = loginMock(email, password)
        this.token = token
        localStorage.setItem('token', token)
        const payload = parseJwt(token)
        this.user = { id: payload.sub, email: payload.email, role: payload.role }
        localStorage.setItem('user', JSON.stringify(this.user))
        return
      }
      // echte API (später)
      const res = await http.post('/auth/login', null, { params: { email, password } })
      this.token = res.data.access_token
      localStorage.setItem('token', this.token)
      const payload = JSON.parse(atob(this.token.split('.')[1]))
      this.user = { id: Number(payload.sub), email: payload.email, role: payload.role }
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout(){
      this.token = null; this.user = null
      localStorage.removeItem('token'); localStorage.removeItem('user')
    }
  }
})
