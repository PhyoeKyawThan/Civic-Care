import { StyleSheet, Text, View } from "react-native";

interface HederProps{
    headerTitle?: string
}

export function Header({headerTitle}:HederProps) {
    return (
        <View style={[styles.header]}>
            <Text style={styles.appName}>
                <Text style={styles.appNameBold}>ပြည်သူအကျိုးပြု</Text>
                {/* <Text style={[styles.darkAppNameLight]}>Care</Text> */}
            </Text>
            <Text style={[styles.darkText]}>
                {headerTitle ?? 'Community Dashboard'}
            </Text>
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