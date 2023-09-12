import { atom, selector } from 'recoil'
import { firebaseAuthApi } from '@src/firebase/firebaseAuthApi'
import { User } from 'firebase/auth'
import { Log, origin } from '@src/settings/dev/log'

const log = new Log(origin.authState)

// TODO:
// - make authState of type LoadedState
// - set controlling of listerners so they not repeat listening
//      on auth change more than one time - in firebaseAuthApi

export const authState = atom<User | null>({
    key: 'services/auth/authStateAtom',
    //default: null,
    effects: [
        ({ setSelf }) => {
            log.start()
            log.variable('authState Atom setSelf (null)')
            setTimeout(() => {
                //firebaseAuthApi.listenOnAuthState(authState)
                firebaseAuthApi.listenOnAuthState(setSelf)
            }, 2000)
            log.end()
        },
        ({ onSet }) => {
            onSet((newValue) => {
                // TODO: check if email is verified
                log.start()
                log.variable('authState, onSet:', newValue?.uid)
                log.end()
            })
        },
    ],
})
