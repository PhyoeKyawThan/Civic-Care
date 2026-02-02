// app/_layout.tsx or app/(tabs)/search.tsx
import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TextInput, View } from "react-native";

export default function Layout() {
    const color = Colors.light;

    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Search",
                    headerTitle: () => (
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <TextInput
                                placeholder="ရှာဖွေရန်..."
                                placeholderTextColor={color.inActiveIcon}
                                style={{
                                    backgroundColor: "#f0eded",
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    borderRadius: 8,
                                    fontSize: 16,
                                    color: color.text,
                                }}
                                autoFocus={true}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <MaterialIcons
                            name="search"
                            size={28}
                            color={color.inActiveIcon}
                            style={{ marginRight: 15 }}
                        />
                    ),
                }}
            />
        </View>
    );
}