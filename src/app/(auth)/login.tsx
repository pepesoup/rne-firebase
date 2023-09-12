import { Text, Button } from 'react-native-paper'
import { authState } from '@src/services/auth/authState'
import { Screen, NavLink } from '@src/components/commonUi'
import { SplashScreen, Stack, router } from 'expo-router'
import { authActions, useAuthStore, useAuthStoreBase } from '@src/stores/authStore'
import { DEV_AUTH_EMAIL, DEV_AUTH_PASSWORD } from '@env'

export default function Login() {
    const authData = useAuthStoreBase()

    return (
        <Screen>
            <Text>isSignedIn={authData.isSignedIn.toString()}</Text>
            <Stack />
            <Button
                onPress={() =>
                    authActions.signInWithEmailAndPassword(DEV_AUTH_EMAIL, DEV_AUTH_PASSWORD)
                }
            >
                Login - with ok data
            </Button>
            <Button onPress={() => authActions.signInWithEmailAndPassword(DEV_AUTH_EMAIL, '-')}>
                Login - with wrong data
            </Button>
            <Button onPress={() => authActions.signOut()}>SignOut</Button>
        </Screen>
    )
}
