export type Store = {
    content: any
    state: 'loading' | 'hasValue' | 'hasError'
}

export type StoreActions<T> = {
    [key: string]: (...any) => (Store & T) | Promise<Store & T>
}
