import { Button, TextProps as PaperTextProps, useTheme } from 'react-native-paper'
import { Pressable, StyleProp, TextProps, TextStyle, View } from 'react-native'
import Text from 'react-native-paper'
import merge from 'ts-deepmerge'
import * as Linking from 'expo-linking'
import { Link, useRouter } from 'expo-router'

export type LinkProps = any & {
    children: any
    href: string
}

const NavLink = (props: LinkProps) => {
    const { children, href, style, ...restProps } = props
    const theme = useTheme()

    const _style: StyleProp<TextStyle> = merge(
        {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: theme.colors.primary,
        },
        style || {}
    )

    return (
        <Link style={_style} href={href} {...restProps}>
            {children}
        </Link>
    )
}

export default NavLink
