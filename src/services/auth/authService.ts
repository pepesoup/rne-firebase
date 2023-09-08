import {
    User,
} from 'firebase/auth'
import { firebaseAuthApi } from '../../firebase/firebaseAuthApi'
import { authState } from './authState'
import { LoadedState } from '@src/types/stateTypes'
import { Log, origin } from '@src/settings/dev/log'

const log = new Log(origin.authState)

export const authService = {
    get authState() {
        return authState
    },

    /** authState will pick up change if user has logged in successfully */
    signInWithEmailAndPassword: async (email: string, password: string): Promise<LoadedState> => {
        log.start()
        log.variable('email', email)
        log.variable('password', password)
        const result: LoadedState = {
            contents: null,
            state: 'loading',
            exists: false,
        }
        try {
            const res = await firebaseAuthApi.signInWithEmailAndPassword(email, password)
            log.variable('signInWithEmailAndPassword', res)
            result.contents = res
            result.state = 'hasValue'
            // TODO: handle email verification
            /*
            if (authSettings.emailNeedsToBeVerified && !res.user.emailVerified) {
                firebaseAuthApi.signOut()
                appErrorService.warning('Inkorrekt epost')
                returnResult.error = 'Inkorrekt epost'
            }*/
        } catch (e) {
            log.variable('error', e)
            console.error(e)
            result.contents = JSON.stringify(e, null, 2)
            result.state = 'hasError'
        }
        log.end()
        return result
    },

    signOut: (): void => {
        firebaseAuthApi.signOut()
    },

    createUserWithEmailAndPassword: async (
        email: string,
        password: string
    ): Promise<LoadedState> => {
        let returnResult: LoadedState = {
            contents: null,
            state: 'loading',
            exists: false,
        }

        try {
            const res = await firebaseAuthApi.createUserWithEmailAndPassword(email, password)

            // TODO:
            //const user: any = res.user
            //onUserCreated(user)
            returnResult = {
                contents: res,
                state: 'hasValue',
                exists: true,
            }
            //returnResult.contents = 'Inloggning skapad'
            /*
            if (authSettings.emailNeedsToBeVerified) {
                try {
                    await sendEmailVerification(res.user)
                    returnResult.contents = 'OK'
                } catch (e: any) {
                    //returnResult.data = 'got Error'
                    returnResult.contents =
                        'Error: Misslyckades att sända verifikation till din e-post:: ' + e.code
                } finally {
                    firebaseAuthApi.signOut()
                }
            }*/
        } catch (e: any) {
            returnResult = {
                contents: JSON.stringify(e, null, 2),
                state: 'hasError',
                exists: false,
            }
            console.error(e)
        }
        return returnResult
    },

    sendEmailVerification: async (auth: User | null) => {
        if (auth) {
            try {
                await firebaseAuthApi.sendEmailVerification(auth)
            } catch (e) {
                console.error(e)
            }
        }
    },
}
