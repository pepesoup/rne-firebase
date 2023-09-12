import { Text, Button } from 'react-native-paper'
import { authState } from '@src/services/auth/authState'
import { Screen, NavLink } from '@src/components/commonUi'
import { SplashScreen, Stack, router } from 'expo-router'

export default function Index_AppApp() {
    console.log('/(app)/ - index')
    return (
        <Screen style={{ gap: 20 }}>
            <Stack />
            <NavLink href="/public">Public</NavLink>
            <NavLink href="/login">Login</NavLink>
            <Text>hej</Text>
        </Screen>
    )
}
