import {create} from 'zustand'
import {auth} from "../firebase/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {NavigationProp} from "@react-navigation/core/src/types";
import {isEmailValid} from "../utils/LoginUtils";

export const INVALID_EMAIL = "auth/invalid-email"
export const AUTH_SUCCESS = "auth/success"
export const INTERNET_ERROR = "auth/network-request-failed"
export const AUTH_MISSING = "auth/missing-email"

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
        status?: "auth/success" | "auth/invalid-email" | "auth/missing-email" | "unknown" | "auth/network-request-failed" | string
    }

    navigation?: NavigationProp<ReactNavigation.RootParamList>,
    changeLogin: (login: string) => void,
    changePassword: (password: string) => void,
    changeRestorePasswordEmail: (login: string) => void,
    navigateToRegister: () => void,
    navigateToRestorePassword: () => void,

    navigateBackToLoginFromRestore: () => void,

    bindNavigation: (nav: NavigationProp<ReactNavigation.RootParamList>) => void,

    loginWithEmailAndPassword: () => void,
    registerWithEmailAndPassword: () => void,
    sendResetPasswordEmail: () => void,
    closeResetPasswordModal: () => void
}

const initialState = {
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
    },
}

export const useStore = create<AuthenticationController>((set) => ({
    ...initialState,
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
                email: login,
                annotation: isEmailValid(login) ? null : "Email is not valid!"
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
            () => {
                set(state => ({
                    ...state,
                    resetPasswordData: {
                        ...state.resetPasswordData,
                        isProcessing: false,
                        status: "auth/success",
                        isEmailCorrect: true
                    }
                }))
            })
            .catch(reason => {
                if (reason.code !== null) {
                    set(state => ({
                        ...state,
                        resetPasswordData: {
                            ...state.resetPasswordData,
                            isProcessing: false,
                            status: reason.code,
                            isEmailCorrect: false,
                        }
                    }))
                } else {
                    set(state => ({
                        ...state,
                        resetPasswordData: {
                            ...state.resetPasswordData,
                            isProcessing: false,
                            status: "unknown",
                            isEmailCorrect: true,
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
                ...initialState.resetPasswordData,
                email: useStore.getState().loginData.email
            }
        }));
        if (useStore.getState().navigation != undefined) {
            useStore.getState().navigation.navigate("Restore password", {})
        }
    },
    bindNavigation: (nav) => {
        set((state) => ({...state, navigation: nav}))
    },
    closeResetPasswordModal: () => {
        set(state => ({
            ...state,
            resetPasswordData: {
                ...useStore.getState().resetPasswordData,
                status: null
            }
        }));
    },
    navigateBackToLoginFromRestore: () => {
        set(state => ({
            ...state,
            loginData: {
                ...initialState.loginData,
                email: useStore.getState().resetPasswordData.email
            }
        }));
        if (useStore.getState().navigation != undefined) {
            useStore.getState().navigation.navigate("Login", {})
        }
    }
}))
