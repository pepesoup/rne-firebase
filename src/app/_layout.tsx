import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuthStoreBase } from '@src/stores/authStore'
import { DataProvider } from '@src/components/data/dataProvider/dataProvider'

export default function Layout_App() {
    const theme = MD3DarkTheme
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: theme.colors.background,
                    }}
                >
                    <DataProvider stores={[useAuthStoreBase()]}>
                        <StatusBar style="light" />
                        <Slot />
                    </DataProvider>
                </SafeAreaView>
            </SafeAreaProvider>
        </PaperProvider>
    )
}
