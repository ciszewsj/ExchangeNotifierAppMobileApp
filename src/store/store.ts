import {create} from 'zustand'
import {auth} from "../firebase/firebase"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";

export const useStore = create((set) => ({
    login: "",
    password: "",
    changeLogin: (login) => set((state) => ({...state, login: login})),
    changePassword: (password) => set(state => ({...state, password: password})),
    loginWithEmailAndPassword: async () => {
        signInWithEmailAndPassword(auth, useStore.getState().login, useStore.getState().password)
            .then(response => {
                alert(JSON.stringify(response))
            }).catch(reason => alert(reason.message))
    },
    registerWithEmailAndPassword: () => {
        createUserWithEmailAndPassword(auth, useStore.getState().login, useStore.getState().password)
            .then(response => {
                alert(JSON.stringify(response))
            }).catch(reason => alert(reason.message))
    },
    sendResetPasswordEmail: () => {
    }
}))
