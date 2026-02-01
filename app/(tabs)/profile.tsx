import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const user = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View>
        <Text>Hello From Profile {user?.user?.email}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile;