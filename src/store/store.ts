import {create} from 'zustand'


export const useStore = create((set) => ({
    login: "",
    password: "",
    changeLogin: (login) => set((state) => ({...state, login: login})),
    changePassword: (password) => set(state => ({...state, password: password})),
    loginWithEmailAndPassword: async () => {
        set(state => ({...state, password: "123123122"}))
        console.log("LOGIN")
        await new Promise(resolve => setTimeout(resolve, 10000));
        set(state => ({...state, login: "2142412341"}))
    }
}))
