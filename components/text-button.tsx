import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type TextButtonStyle = {
    container: StyleProp<ViewStyle>,
    text: StyleProp<TextStyle>
}

interface TextButtonProps{
    title: string,
    onPress: ()=>void,
    style: TextButtonStyle
}

export default function TextButton({title, onPress, style}: TextButtonProps){
    return (
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
    );
}