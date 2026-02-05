import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/context/auth-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = Colors.light;
const { width, height } = Dimensions.get('screen');

function Profile() {
  const user = useContext(AuthContext);
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profile}>
          {user?.user?.avatar ? <Image src="" style={styles.profileImage} /> : <View style={styles.profileAvatarIcon}><IconSymbol size={100} name="person.fill" color={colors.inActiveIcon} /></View>}
          <Text style={{
            fontWeight: '600'
          }}>@{user?.user?.username}</Text>
          <Text style={{
            fontWeight: '500',
            fontSize: 20
          }}>{user?.user?.full_name}</Text>
          <View style={styles.information}>
            <MaterialIcons style={{
              fontSize: 14,
              fontWeight: '700',
              position: 'absolute',
              right: 20,
              top: 20,
              backgroundColor: colors.secondaryBackgroundColor,
              padding: 15,
              borderRadius: 100
            }}
              onPress={() => Alert.alert('you clicked it')} name="edit" />
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center'
            }}>သင်၏အချက်အလက်များ</Text>
            <View style={styles.informationItem}>
              <MaterialIcons name="email" size={28} />
              <Text style={styles.textInformation}>{user?.user?.email}</Text>
            </View>
            <View style={styles.informationItem}>
              <MaterialIcons name="event" size={28} />
              <Text style={styles.textInformation}>{user?.user?.date_of_birth}</Text>
            </View>
            <View style={styles.informationItem}>
              <MaterialIcons name="phone" size={28} />
              <Text style={styles.textInformation}>{user?.user?.phone}</Text>
            </View>
            <View style={[styles.informationItem]}>
              {/* <MaterialIcons name="mdi:calendar" size={28}/> */}
              <Text style={[styles.textInformation, { color: colors.inActiveIcon }]}> Joined Since: {new Date(user?.user?.created_at ?? '').toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
        <View>
            
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.secondaryBackgroundColor
  },
  profile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    // backgroundColor: colors
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.activeIcon
  },
  profileAvatarIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.activeIcon,
    justifyContent: "center",
    alignItems: 'center'
  },
  information: {
    // height: 500,
    backgroundColor: colors.activeIcon,
    width: width,
    borderTopColor: colors.tabIconSelected,
    borderTopStartRadius: 50,
    borderTopRightRadius: 50,
    // borderTopWidth: 1,
    padding: 20,
    gap: 13,
  },
  informationItem: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center'
  },
  textInformation: {
    fontSize: 14,
    fontWeight: '800'
  }
})

export default Profile;