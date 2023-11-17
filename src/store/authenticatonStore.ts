import {create} from 'zustand'
import {auth} from "../firebase/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {NavigationProp} from "@react-navigation/core/src/types";

export const INVALID_EMAIL = "auth/invalid-email"

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
        isEmailCorrect: boolean,
        annotation?: string | undefined,
        status?: "auth/invalid-email" | string,
        finished: boolean
    }

    navigation?: NavigationProp<ReactNavigation.RootParamList>,
    changeLogin: (login: string) => void,
    changePassword: (password: string) => void,
    changeRestorePasswordEmail: (login: string) => void,
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
        email: "",
        isProcessing: false,
        isEmailCorrect: true,
        annotation: false,
        status: null,
        finished: false
    },
    navigation: undefined,
    changeLogin: (login) => set(state => ({
        ...state,
        loginData: {
            ...state.loginData,
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
    changeRestorePasswordEmail: (login) => {
        set(state => ({
            ...state,
            resetPasswordData: {
                ...state.resetPasswordData,
                email: login
            }
        }))
    },
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
        set(state => ({
            ...state,
            resetPasswordData: {
                ...state.resetPasswordData,
                isProcessing: true
            }
        }))
        sendPasswordResetEmail(auth, useStore.getState().resetPasswordData.email).then(
            response => {
                set(state => ({
                    ...state,
                    resetPasswordData: {
                        ...state.resetPasswordData,
                        isProcessing: false,
                        finished: true,
                        isEmailCorrect: true
                    }
                }))
            })
            .catch(reason => {
                if (reason.code === INVALID_EMAIL) {
                    set(state => ({
                        ...state,
                        resetPasswordData: {
                            ...state.resetPasswordData,
                            isProcessing: false,
                            finished: false,
                            isEmailCorrect: false,
                            annotation: reason.code
                        }
                    }))
                } else {
                    set(state => ({
                        ...state,
                        resetPasswordData: {
                            ...state.resetPasswordData,
                            isProcessing: false,
                            finished: false,
                            isEmailCorrect: true,
                            annotation: reason.code
                        }
                    }))
                }
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
