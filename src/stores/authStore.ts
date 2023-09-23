import { create } from 'zustand'
import { auth } from '../../firebaseConfig'
import {
    Auth,
    User,
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
    signOut as fbSignOut,
    AuthError,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store, StoreActions } from './store'
import actionCallAsync from './storeHelpers'

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
                //content: 'Error...',
                isSignedIn: user !== null,
                state: 'hasValue',
                //state: 'hasError',
            })
        }, 0)
    })
}
listenOnAuthState()

export const authStoreActions: StoreActions<AuthStoreBase> = {
    signInWithEmailAndPassword: async (email: string, password: string) => {
        const res = await actionCallAsync({
            store: useAuthStoreBase,
            fn: fbSignInWithEmailAndPassword,
            args: [auth, email, password],
            errorSelector: 'code',
        })
        useAuthStoreBase.setState({ isSignedIn: res.state === 'hasValue' })
        return useAuthStoreBase.getState()
    },
    signOut: async () => {
        const res = await actionCallAsync({
            store: useAuthStoreBase,
            fn: fbSignOut,
            args: [auth],
            errorSelector: 'code',
        })
        useAuthStoreBase.setState({ isSignedIn: !!auth.currentUser })
        console.log('SignOut res:', JSON.stringify(res, null, 4))
        return useAuthStoreBase.getState()
    },
    signUp: async (email: string, password: string) => {
        const res = await actionCallAsync({
            store: useAuthStoreBase,
            fn: createUserWithEmailAndPassword,
            args: [auth, email, password],
            errorSelector: 'code',
        })
        useAuthStoreBase.setState({ isSignedIn: false })
        console.log('signUp res:', res)
        return useAuthStoreBase.getState()
    },
}
export const useAuthStore = createSelectorFunctions(useAuthStoreBase)

/**
 * Examples on return values
 */
const signUpResponse_success = {
    content: {
        _tokenResponse: {
            email: 'johndunfalk@gmail.com',
            expiresIn: '3600',
            idToken:
                'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MGFkMTE4YTk0MGFkYzlmMmY1Mzc2YjM1MjkyZmVkZThjMmQwZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ28tZ29vZC1kZXYiLCJhdWQiOiJnby1nb29kLWRldiIsImF1dGhfdGltZSI6MTY5NDYzMzE0MCwidXNlcl9pZCI6IlNMSVRJWUJkOGpmcmFNNEZ1WU8zUjZuaDk0YzIiLCJzdWIiOiJTTElUSVlCZDhqZnJhTTRGdVlPM1I2bmg5NGMyIiwiaWF0IjoxNjk0NjMzMTQwLCJleHAiOjE2OTQ2MzY3NDAsImVtYWlsIjoiam9obmR1bmZhbGtAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG5kdW5mYWxrQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ay-5-cS5juS5hWk_gIx5gieVOPS0Ixt5BDlqNqV0EdYQvKLMP2MvGc6CajYkD2zgXKRZGnZlvWSjTSe29osu3nMkGBF7RxdxSE2MfvVp35EjfOGahkxJsxpvQupBw1rkNY_cIv7ue4RN-9swD-nIhJ90UIFQfPe3XB_UVAljtS_GeId1WPGtuTv47xkuIpwELGPaqmDH5pPQg23qDrbtHYgg7zgpngok1R2iJ2jVhPAIO9SVhEwmVYaZYZhpecHj2QN-B7oVqFDqB7uHprTIdn_7PLT_yVW4mRXKqb3FKg2VIOE5lyNwbzpkCn-U4lvWFZ1GjZ04INUd6wEHjoXNxA',
            kind: 'identitytoolkit#SignupNewUserResponse',
            localId: 'SLITIYBd8jfraM4FuYO3R6nh94c2',
            refreshToken:
                'AMf-vBwlyXI4zSP1EmvUQBxBBTS8spx2rGma4SHDZPUxa9L0FRUP92IB8-JunjjJjFbP7y4E0fgX7avd_nXIE4WLbutrtR-cT3U7Xm6libWOgM64kUAoWL1SOHkaQQ5oiwNCRtuhETy6jTTEsnh55y0EesqtkH_nCz5MH886vMui5Y_PW537I74EShSYAj4BVjHauF7PTinuWXLTCHe2rfeMx_3Irj-MSQ',
        },
        operationType: 'signIn',
        providerId: null,
        user: [Object],
    },
    isSignedIn: false,
    state: 'hasValue',
}
