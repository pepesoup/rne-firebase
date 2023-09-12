import { Text, Button } from 'react-native-paper'
import { authState } from '@src/services/auth/authState'
import { Screen, NavLink } from '@src/components/commonUi'
import { Link, Redirect, SplashScreen, Stack, router, useRootNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { authActions, useAuthStoreBase } from '@src/stores/authStore'
import { View } from 'react-native'

export default function Index_App() {
    const authData = useAuthStoreBase()
    const navigation = useRootNavigation()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(!!navigation?.isReady)
    }, [navigation?.isReady])

    if (ready) {
        //return <Redirect href={authData.isSignedIn ? '/(app)' : '/(auth)/login'} />

        if (authData.isSignedIn) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <Button onPress={() => authActions.signOut()}>SignOut</Button>
                    <NavLink href="/(app)">App (protected)</NavLink>
                    <NavLink href="/(public)">Public</NavLink>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <NavLink href="/(auth)/login">Login</NavLink>
                    <NavLink href="/(public)">Public</NavLink>
                </View>
            )
        }
    } else {
        return (
            <Text style={{ color: 'pink' }} variant="titleLarge">
                Index_App waiting to Render ...
            </Text>
        )
    }
}
