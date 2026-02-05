import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const colors = Colors.light;

// const width

const Profile = () => {
    const { user } = useAuth();
    return (
        <ScrollView style={{
            flex: 1,
        }}>
            <View style={styles.profileItem}>
                {
                    user?.avatar ? <Image src="" /> :
                        <View>
                            <IconSymbol name="person.fill" color={colors.inActiveIcon} size={50} />
                        </View>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    profileItem: {
        padding: 20,
    }
});

export default Profile;