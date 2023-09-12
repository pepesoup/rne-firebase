import { auth } from '../../firebaseConfig'
import {
    Auth,
    NextOrObserver,
    User,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
//import { setRecoil } from 'recoil-nexus'
import { Log, origin } from '@src/settings/dev/log'

const log = new Log(origin.authState)
const atomsListeningToChange = new Map<string, boolean>()

export const firebaseAuthApi = {
    signInWithEmailAndPassword: async (email: string, password: string) => {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res
    },

    signOut: () => {
        signOut(auth)
    },

    createUserWithEmailAndPassword: async (email: string, password: string) => {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        /*
        if (authSettings.emailNeedsToBeVerified) {
            try {
                await sendEmailVerification(res.user)
            } catch (e: any) {
                throw new Error('Verification av e-post: ' + e.code)
            } finally {
                signOut(auth)
            }
        }
        */
        return res
    },

    //listenOnAuthState: (atomToUpdate: RecoilState<User | null>) => {
    listenOnAuthState: (onChangeFunc: any) => {
        log.start()
        /* todo const atomKey = atomToUpdate.key
        const isListening = atomsListeningToChange.get(atomKey)
        if (isListening) {
            log.info('ALREADY listening on auth: ', atomKey)
            return
        }
        // todo atomsListeningToChange.set(atomKey, true)
        log.variable('START listening on auth: ', atomKey)
        log.end() */
        auth.onAuthStateChanged((authUser: User | null) => {
            log.start()
            log.variable('onAuthStateChanged, uid', authUser?.uid)
            //setRecoil(atomToUpdate, authUser)
            onChangeFunc(authUser)
            log.end()
        })
    },

    sendEmailVerification: async (auth: User) => {
        await sendEmailVerification(auth)
    },
}
