import { defineStore } from 'pinia'

export const AuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: JSON.parse(localStorage.getItem('token')) || '',
        errors: null,
    }),
    actions: {
        setUser (user) {
            this.user = user
        },
        setToken (token) {
            localStorage.setItem('token', JSON.stringify(token))
            this.token = token
        },
        setErrors (errors) {
            this.errors = errors
        },
        clearStoreData() {
            localStorage.removeItem('token')
            this.user = null
            this.token = ''
        },
        clearErrors() {
            this.errors = null
        }
    }
})