import { useAuthStoreBase } from '../../../stores/authStore'
import { Store } from '../../../stores/store'
import { Slot, useRootNavigation } from 'expo-router'
import { useEffect, PropsWithChildren } from 'react'
import { DataProviderFallback } from './dataProviderFallback'

export type Props = PropsWithChildren<{
    stores: Store[]
    fallback?: any
}>

export const DataProvider = (props: Props) => {
    const { children, stores, fallback, ...restProps } = props
    const authData = useAuthStoreBase()
    const navigation = useRootNavigation()

    useEffect(() => {}, [stores.map((s) => s.state)])

    switch (authData.state) {
        case 'hasValue':
            return children
        default:
            return (
                <>
                    {stores.map((s, i) => (
                        <DataProviderFallback store={s} slot={<Slot />} key={`fallback-${i}`} />
                    ))}
                </>
            )
    }
}
