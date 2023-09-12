import { create } from 'zustand'
import { auth } from '../../firebaseConfig'
import {
    Auth,
    User,
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
    signOut as fbSignOut,
} from 'firebase/auth'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store } from './store'

export type AuthStoreBase = Store & {
    content: User | null | string
    isSignedIn: boolean
}

export const useAuthStoreBase = create<AuthStoreBase>((set) => ({
    content: null,
    isSignedIn: false,
    state: 'loading',
}))

const listenOnAuthState = () => {
    return auth.onAuthStateChanged((user) => {
        setTimeout(() => {
            useAuthStoreBase.setState({
                content: user,
                isSignedIn: user !== null,
                state: 'hasValue',
            })
        }, 2000)
    })
}
listenOnAuthState()

export const authActions = {
    signInWithEmailAndPassword: async (email: string, password: string) => {
        useAuthStoreBase.setState({ state: 'loading' })
        try {
            const user = await fbSignInWithEmailAndPassword(auth, email, password)
            useAuthStoreBase.setState({
                content: user,
                isSignedIn: true,
                state: 'hasValue',
            })
        } catch (e: any) {
            useAuthStoreBase.setState({
                content: e?.toString(),
                isSignedIn: false,
                state: 'hasError',
            })
        }
    },
    signOut: async () => {
        useAuthStoreBase.setState({ state: 'loading' })
        try {
            await fbSignOut(auth)
            useAuthStoreBase.setState({
                content: null,
                isSignedIn: false,
                state: 'hasValue',
            })
        } catch (e) {
            useAuthStoreBase.setState({
                content: e,
                isSignedIn: !!auth.currentUser,
                state: 'hasError',
            })
        }
    },
    signUp: () => {
        /* TODO... */
    },
}
export const useAuthStore = createSelectorFunctions(useAuthStoreBase)
