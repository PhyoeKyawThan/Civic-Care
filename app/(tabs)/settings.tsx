import { useAuth } from "@/hooks/use-auth";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Settings(){
  const auth = useAuth();
  return (
    <SafeAreaView>
      <Button title="Logout" onPress={()=>auth.logout()}/>
    </SafeAreaView>
  )
}

export default Settings;