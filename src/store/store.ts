import {create} from 'zustand'


export const useStore = create((set) => ({
    login: "",
    password: "",
    changeLogin: (login) => set((state) => ({...state, login: login})),
    changePassword: (password) => set(state => ({...state, password: password}))
}))
