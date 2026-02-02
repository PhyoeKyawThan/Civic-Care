// app/_layout.tsx or app/(tabs)/search.tsx
import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('screen');

const SuggestionItem = ({ suggestion_text }: { suggestion_text: string }) => {
    return (
        <TouchableOpacity onPress={()=>{}} style={styles.suggestionItem}>
            <Text>{suggestion_text}</Text>
        </TouchableOpacity>
    )
}

export default function Layout() {
    const color = Colors.light;
    const router = useRouter();
    const [searchText, setSearchText] = useState<string>('');
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <Stack.Screen options={{
                headerShown: false
            }} />
            <View style={{
                margin: 20,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 10
            }}>
                <MaterialIcons name="arrow-back" size={28}
                    onPress={() => router.back()}
                    style={{
                        width: 20,
                    }}
                />
                <TextInput
                    placeholder="ရှာဖွေရန်..."
                    placeholderTextColor={color.inActiveIcon}
                    style={{
                        backgroundColor: "#fffefe",
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                        borderRadius: 8,
                        fontSize: 16,
                        width: width - 100,
                        color: color.text,
                    }}
                    value={searchText}
                    autoFocus={true}
                    onChangeText={(text) => setSearchText(text)}
                />

                <MaterialIcons
                    name="search"
                    size={28}
                    color={color.inActiveIcon}
                    style={{ width: 20 }}
                />
            </View>
            {/* suggestion views */}
            <View style={styles.suggestionViewContainer}>
                <SuggestionItem suggestion_text="Environment issues" />
                <SuggestionItem suggestion_text="SOmething searched" />
            </View>
            {/* searched contents views */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    suggestionViewContainer: {
        flex: 1,
        backgroundColor: Colors.light.background
    },
    suggestionItem: {
        padding: 20,
        color: 'black',
        fontWeight: 'bold'
    }
})