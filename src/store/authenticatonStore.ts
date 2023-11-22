import {create} from 'zustand'
import {auth} from "../firebase/firebase"
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {NavigationProp} from "@react-navigation/core/src/types";
import {isEmailValid, isPasswordValid} from "../utils/LoginUtils";

export const INVALID_EMAIL = "auth/invalid-email"
export const AUTH_SUCCESS = "auth/success"
export const INTERNET_ERROR = "auth/network-request-failed"
export const AUTH_MISSING = "auth/missing-email"

interface AuthenticationController {
    loginData: {
        email: string,
        emailAnnotation?: string | undefined,
        password: string,
        passwordAnnotation?: string | undefined,
        isProcessing: boolean,
        status: "auth/invalid-login-credentials" | "auth/invalid-email" | "auth/missing-password" | string
    },
    registerData: {
        email: string,
        emailAnnotation?: string | undefined,
        password: string,
        passwordAnnotation?: string | undefined,
        repeatPassword: string,
        repeatPasswordAnnotation?: string | undefined,
        isProcessing: boolean,
        status?: "auth/success" | "auth/email-already-in-use" | "auth/invalid-email" | "auth/weak-password" | "auth/missing-password" | "unknown" | string
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
    sendResetPasswordEmail: () => void,
    closeResetPasswordModal: () => void,

    changeRegisterEmail: (email: string) => void
    changeRegisterPassword: (password: string) => void
    changeRepeatRegisterPassword: (password: string) => void
    registerUserWithEmailAndPassword: () => void
    closeRegisterUserModal: () => void
    navigateBackToLoginFromRegister: () => void

    closeLoginModal: () => void
}

const initialState = {
    loginData: {
        email: "",
        password: "",
        emailAnnotation: null,
        passwordAnnotation: null,
        isProcessing: false,
        status: null
    },
    resetPasswordData: {
        email: "",
        isProcessing: false,
        isEmailCorrect: true,
        annotation: false,
        status: null,
    },
    registerData: {
        email: "",
        emailAnnotation: undefined,
        password: "",
        passwordAnnotation: undefined,
        repeatPassword: "",
        repeatPasswordAnnotation: undefined,
        isProcessing: false,
        status: null
    }
}

export const useStore = create<AuthenticationController>((set) => ({
    ...initialState,
    navigation: undefined,
    changeLogin: (login) => set(state => ({
        ...state,
        loginData: {
            ...state.loginData,
            email: login,
            emailAnnotation: isEmailValid(login) ? null : "Email is not valid!"
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
        set(state => ({
            ...state,
            loginData: {
                ...state.loginData,
                isProcessing: true,
            }
        }))
        signInWithEmailAndPassword(auth, useStore.getState().loginData.email, useStore.getState().loginData.password)
            .then(() => {
            }).catch(reason => {
            set(state => ({
                ...state,
                loginData: {
                    ...state.loginData,
                    isProcessing: false,
                    status: reason.code != null ? reason.code : "undefined"
                }
            }))
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
        set(state => ({
            ...state,
            registerData: {
                ...initialState.registerData
            }
        }))
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
    },
    changeRegisterEmail: (email: string) => {
        set(state => ({
            ...state,
            registerData: {
                ...state.registerData,
                email: email,
                emailAnnotation: isEmailValid(email) ? null : "Email is not valid!"
            }
        }))
    },
    changeRegisterPassword: (password: string) => {
        set(state => ({
            ...state,
            registerData: {
                ...state.registerData,
                password: password,
                repeatPasswordAnnotation: password === state.registerData.repeatPassword ? null : "Passwords are not identical!",
                passwordAnnotation: isPasswordValid(password) ? null : "Password is to weak!"
            }
        }))
    },
    changeRepeatRegisterPassword: (password: string) => {
        set(state => ({
            ...state,
            registerData: {
                ...state.registerData,
                repeatPassword: password,
                repeatPasswordAnnotation: password === state.registerData.password ? null : "Passwords are not identical!"
            }
        }))
    },
    registerUserWithEmailAndPassword: () => {
        set(state => ({
            ...state,
            registerData: {
                ...state.registerData,
                isProcessing: true
            }
        }))
        createUserWithEmailAndPassword(auth, useStore.getState().registerData.email, useStore.getState().registerData.password)
            .then(async response => {
                await signOut(auth)
                set(state => ({
                    ...state,
                    registerData: {
                        ...state.registerData,
                        status: "auth/success",
                        isProcessing: false
                    }
                }))
            })
            .catch(reason => {
                set(state => ({
                    ...state,
                    registerData: {
                        ...state.registerData,
                        status: reason.code != null ? reason.code : "unknown",
                        isProcessing: false
                    }
                }))
            })
    },
    closeRegisterUserModal: () => {
        set(state => ({
            ...state,
            registerData: {
                ...state.registerData,
                status: null
            }
        }))
    },
    navigateBackToLoginFromRegister: () => {
        useStore.getState().navigation.navigate("Login", {})
        set(state => ({
            ...state,
            loginData: {
                ...state.registerData,
                email: state.registerData.email
            }
        }))
    },
    closeLoginModal: () => {
        set(state => ({
            ...state,
            loginData: {
                ...state.loginData,
                status: null
            }
        }))
    }

}))
