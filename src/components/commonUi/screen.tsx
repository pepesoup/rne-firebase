import { View as NativeView, ViewProps as NativeViewProps } from 'react-native'
import merge from 'ts-deepmerge'
import { IconButton, MD3Theme, PaperProvider, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export type ViewProps = NativeViewProps & {
    transparent?: boolean
    navigateBack?: boolean
    centerContent?: boolean
}

const ScreenCmn = (props: ViewProps) => {
    const navigation = useNavigation<any>()
    const { children, style, transparent, navigateBack, centerContent, ...restProps } = props
    const theme = useTheme()
    const backgroundColor = transparent ? 'transparent' : theme.colors.background
    const justifyContent = centerContent ? { justifyContent: 'center' } : null

    const mergedStyle = merge(
        {
            flex: 1,
            alignItems: 'center',
            justifyContent,
            margin: 0,
            padding: 0,
            backgroundColor: backgroundColor,
        },
        style || {}
    )

    const backButton = (
        <IconButton
            icon="arrow-left"
            mode="outlined"
            iconColor={theme.colors.secondary}
            size={20}
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
            }}
            onPress={() => {
                navigation?.goBack(null)
            }}
        />
    )

    return (
        <NativeView style={mergedStyle} {...restProps}>
            {navigateBack ? backButton : null}
            {children}
        </NativeView>
    )
}

export default ScreenCmn
