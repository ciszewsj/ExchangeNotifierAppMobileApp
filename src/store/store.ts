import {create} from 'zustand'
import auth from '@react-native-firebase/auth'

export const useStore = create((set) => ({
    login: "",
    password: "",
    changeLogin: (login) => set((state) => ({...state, login: login})),
    changePassword: (password) => set(state => ({...state, password: password})),
    loginWithEmailAndPassword: async () => {
        set(state => ({...state, password: "123123122"}))
        console.log("LOGIN", this.login)
        let response = await auth().createUserWithEmailAndPassword(this.login, this.password)

        console.log(response)
        await new Promise(resolve => setTimeout(resolve, 10000));
        set(state => ({...state, login: "2142412341"}))
    }
}))
