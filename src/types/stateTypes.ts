export type LoadedState = {
    state: 'hasValue' | 'hasError' | 'loading'
    contents: any
    exists?: boolean
    selector?: string
}

// TODO: use this when fetching data from firebase RTDB
export type LoadedStateByDb<T> = {
    state: 'hasValue' | 'hasError' | 'loading' | 'notExists'
    contents: T | any
    selector?: string
}
