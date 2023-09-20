import { Store } from '../../../stores/store'
import { useEffect, PropsWithChildren, useState } from 'react'
import { DataProviderFallback } from './dataProviderFallback'

export type Props = PropsWithChildren<{
    storeStates: Store[]
    fallback?: any
    fallbackOnNullValue?: boolean
}>

export const DataProvider = (props: Props) => {
    const { children, storeStates, fallback, fallbackOnNullValue, ...restProps } = props
    const [dataIsOk, setDatoIsOk] = useState(false)

    useEffect(() => {
        const everyStoreHasValue = storeStates.every((s) => s.state === 'hasValue')
        const anyStoreHasNullValue = storeStates.map((s) => s.content)?.includes(null)
        const NullCauseFallback = !!fallbackOnNullValue && anyStoreHasNullValue

        setDatoIsOk(everyStoreHasValue && !NullCauseFallback)
    }, [storeStates])

    if (dataIsOk) {
        return children
    }

    return (
        <>
            {storeStates.map((s, i) => (
                <DataProviderFallback store={s} key={`fallback-${i}`} />
            ))}
        </>
    )
}
