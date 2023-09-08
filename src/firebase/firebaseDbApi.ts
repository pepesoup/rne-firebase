import { DatabaseReference, onValue, push, set, update } from 'firebase/database'
import { setRecoil } from 'recoil-nexus'
import { RecoilState } from 'recoil'
import { LoadedStateByDb } from '@src/types/stateTypes'
import { Log, origin } from '@src/settings/dev/log'

const log = new Log(origin.firebaseDbApi)
const streamReceivingAtoms = new Map<string, boolean>()

export const firebaseDbApi = {
    streamDbValueToAtom: (
        dbRef: DatabaseReference,
        updateAtom: RecoilState<LoadedStateByDb<any>>,
        selector?: string
    ) => {
        const atomKey = updateAtom.key
        const isStreamedTo = streamReceivingAtoms.get(atomKey)
        if (isStreamedTo) {
            log.info('ALREADY STREAMING DB to', atomKey)
            return
        }
        streamReceivingAtoms.set(atomKey, true)
        log.info('START STREAMING DB to', atomKey)
        try {
            const dbValue = onValue(
                dbRef,
                (snapshot) => {
                    console.log('snapshot:', snapshot)
                    const data = snapshot.val()
                    const exists = snapshot.exists()

                    setRecoil(updateAtom, {
                        state: exists ? 'hasValue' : 'notExists',
                        contents: data,
                        selector: selector || null,
                    } as LoadedStateByDb<any>)
                },
                (error: any) => {
                    log.info('ERROR', error)
                    console.error('firebaseDbApi.ts -> streamDbValueToAtom: ', error)
                    setRecoil(updateAtom, {
                        state: 'hasError',
                        contents: error,
                        selector: selector || null,
                    } as LoadedStateByDb<any>)
                }
            )
        } catch (error) {
            log.info('ERROR', error)
            console.error('firebaseDbApi.ts -> streamDbValueToAtom: ', error)
            setRecoil(updateAtom, {
                state: 'hasError',
                contents: error,
                selector: selector || null,
            } as LoadedStateByDb<any>)
        }
    },

    updateDbValue: (dbRef: DatabaseReference, newValue: any) => {
        console.log('============== updateDbValue:', JSON.stringify(newValue, null, 2))
        try {
            update(dbRef, newValue)
            //const loading = getRecoil(devValueState);
            //setRecoil(devValueState, newValue);
        } catch (e) {
            console.error('FirebaseDbApi.ts, updateDbValue: ', e)
            throw e
        }
        return newValue
    },

    setDbValue: (dbRef: DatabaseReference, newValue: any) => {
        console.log('============== updateDbValue:', JSON.stringify(newValue, null, 2))
        try {
            set(dbRef, newValue)
            //const loading = getRecoil(devValueState);
            //setRecoil(devValueState, newValue);
        } catch (e) {
            console.error('FirebaseDbApi.ts, setDbValue: ', e)
            throw e
        }
        return newValue
    },

    pushDbValue: (dbRef: DatabaseReference, newValue: any) => {
        console.log('============== updateDbValue:', JSON.stringify(newValue, null, 2))
        try {
            push(dbRef, newValue)
            //const loading = getRecoil(devValueState);
            //setRecoil(devValueState, newValue);
        } catch (e) {
            console.error('FirebaseDbApi.ts, setDbValue: ', e)
            throw e
        }
        return newValue
    },
}
