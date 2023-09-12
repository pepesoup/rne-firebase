import { Text } from 'react-native-paper'
import { Redirect, Stack } from 'expo-router'
import { useAuthStoreBase } from '@src/stores/authStore'

export default function Layout_AppApp() {
    const authData = useAuthStoreBase()

    /* not needed, but if it happends */
    if (authData.state === 'loading') {
        return (
            <Text style={{ color: 'purple' }} variant="titleLarge">
                Layout_AppApp: Loading. Check wy, shouldn't do that
            </Text>
        )
    }

    if (!authData.isSignedIn) {
        return <Redirect href="/(auth)/login" />
    }
    return <Stack />
}
