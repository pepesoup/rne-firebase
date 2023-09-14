import { UseBoundStore, StoreApi } from 'zustand'
import { Store } from './store'

export type Props = {
    store: UseBoundStore<StoreApi<Store>>
    fn: (...args: any[]) => any
    args: any[]
    errorSelector?: string
}

export default async function actionCallAsync({ store, fn, args, errorSelector }: Props) {
    store.setState({ state: 'loading' })
    try {
        const res = await fn(...args)
        store.setState({
            content: res,
            state: 'hasValue',
        })
    } catch (e: any) {
        const _e = errorSelector ? e[errorSelector] : e
        store.setState({
            content: JSON.stringify(_e, null, 4),
            state: 'hasError',
        })
    }
    return store.getState()
}
