import {create} from 'zustand'
import {auth} from "../firebase/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {NavigationProp} from "@react-navigation/core/src/types";

export const InvalidAuthErrors = {
    INVALID_EMAIL: "auth/invalid-email"
} as const


interface AuthenticationController {
    loginData: {
        email: string,
        password: string,
    },
    registerData: {
        email: string,
        password: string
    },
    resetPasswordData: {
        email: string
        isProcessing: boolean,
        status?: keyof typeof InvalidAuthErrors
    }

    navigation?: NavigationProp<ReactNavigation.RootParamList>,
    changeLogin: (login: string) => void,
    changePassword: (password: string) => void
    navigateToRegister: () => void,
    navigateToRestorePassword: () => void,
    bindNavigation: (nav: NavigationProp<ReactNavigation.RootParamList>) => void,

    loginWithEmailAndPassword: () => void,
    registerWithEmailAndPassword: () => void,
    sendResetPasswordEmail: () => void
}

export const useStore = create<AuthenticationController>((set) => ({
    loginData: {
        email: "",
        password: ""
    },
    resetPasswordData: {
        email: ""
    },
    navigation: undefined,
    changeLogin: (login) => set(state => ({
        ...state,
        loginData: {
            ...useStore.getState().loginData,
            email: login
        }
    })),
    changePassword: (password) => set(state => ({
        ...state,
        loginData: {
            ...useStore.getState().loginData,
            password: password
        }
    })),
    loginWithEmailAndPassword: async () => {
        signInWithEmailAndPassword(auth, useStore.getState().loginData.email, useStore.getState().loginData.password)
            .then(response => {
                alert(JSON.stringify(response))
            }).catch(reason => {
            console.log(reason.code)
            alert(reason.message)
        })
    },
    registerWithEmailAndPassword: () => {
        createUserWithEmailAndPassword(auth, useStore.getState().loginData.email, useStore.getState().loginData.password)
            .then(response => {
                alert(JSON.stringify(response))
            }).catch(reason => {
            console.log(reason.code)
            alert(reason.message)
        })
    },

    sendResetPasswordEmail: async () => {
        sendPasswordResetEmail(auth, useStore.getState().resetPasswordData.email).then(
            response => {
                console.log("response", response)
            })
            .catch(reason => {
                console.log("Reason", reason.code)
            });
    },
    navigateToRegister: () => {
        if (useStore.getState().navigation != undefined) {
            useStore.getState().navigation.navigate("Register", {})
        }
    },
    navigateToRestorePassword: () => {
        set(state => ({
            ...state,
            resetPasswordData: {
                ...useStore.getState().resetPasswordData,
                email: useStore.getState().loginData.email
            }
        }));
        if (useStore.getState().navigation != undefined) {
            useStore.getState().navigation.navigate("Restore password", {})
        }
    },
    bindNavigation: (nav) => {
        set((state) => ({...state, navigation: nav}))
    }
}))
