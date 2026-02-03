import { Colors } from "@/constants/theme";
import { useThrottledCallback } from "@/hooks/use-throttle";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HederProps {
    headerTitle?: string
}

export function Header({ headerTitle }: HederProps) {
    const router = useRouter();
    const handlePress = useThrottledCallback(() => {
        router.push('/screens/search_screen');
    });
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#7cdb84',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View style={[styles.header]}>
                <Text style={styles.appName}>
                    <Text style={styles.appNameBold}>ပြည်သူအကျိုးပြု</Text>
                    {/* <Text style={[styles.darkAppNameLight]}>Care</Text> */}
                </Text>
                <Text style={[styles.darkText]}>
                    {headerTitle ?? 'Community Dashboard'}
                </Text>
            </View>
            <View style={{
                margin: 10,
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'center',
                    paddingEnd: 10,
                    paddingStart: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: Colors.light.background,
                    borderRadius: 20
                }} onPress={handlePress}>
                    <MaterialIcons name="search" size={29} color={Colors.light.inActiveIcon} />
                    <Text style={{
                        color: Colors.light.inActiveIcon
                    }}>ရှာဖွေရန်</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        // backgroundColor: '#55bdfd',
        backgroundColor: '#7cdb84',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    darkHeader: {
        backgroundColor: '#1E293B',
        borderBottomColor: '#334155',
    }, appName: {
        fontSize: 28,
        marginBottom: 4,
    },
    appNameBold: {
        fontWeight: '700',
        // color: '#6cedca',
        color: '#1d1919',
        letterSpacing: -0.5,
    },
    appNameLight: {
        fontWeight: '300',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    darkAppNameLight: {
        color: '#1d1919',
        fontWeight: '700'
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#121518',
        fontWeight: '500',
    },
    darkText: {
        color: '#282525',
    },
})