import { Text, Button } from 'react-native-paper'
import { Screen } from '@src/components/commonUi'
import { Stack } from 'expo-router'
import { authStoreActions, useAuthStoreBase } from '@src/stores/authStore'
import { DEV_AUTH_EMAIL, DEV_AUTH_PASSWORD } from '@env'

export default function Login() {
    const authData = useAuthStoreBase()

    return (
        <Screen>
            <Text>isSignedIn={authData.isSignedIn.toString()}</Text>
            <Stack />
            <Button
                onPress={() =>
                    authStoreActions.signInWithEmailAndPassword(DEV_AUTH_EMAIL, DEV_AUTH_PASSWORD)
                }
            >
                Login - with ok data
            </Button>
            <Button
                onPress={() => authStoreActions.signInWithEmailAndPassword(DEV_AUTH_EMAIL, '-')}
            >
                Login - with wrong data
            </Button>
            <Button onPress={() => authStoreActions.signOut()}>SignOut</Button>
        </Screen>
    )
}
