import { Header } from "@/components/header";
import { Colors } from "@/constants/theme";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IssuesScreen from "../screens/issue_screen";
import OnSolvingIssueScreen from "../screens/onsolvingissues_screen";
import SolvedScreen from "../screens/solved_screen";

const TopTap = createMaterialTopTabNavigator();

function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <TopTap.Navigator screenOptions={{
        tabBarScrollEnabled: true,
        // tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          backgroundColor: '#231d1d'
        },
        // tabBarInactiveTintColor: 'Colors.light.text',
        tabBarLabelStyle: {
          fontWeight: '700',
          borderBottomColor: "white"
        },
        tabBarStyle: {
          // backgroundColor: '#90D5ff',
          backgroundColor: Colors.light.tabBarBackgroundColor,
          elevation: 0,
          marginTop: 0,
          borderBottomColor: '#92f68e',
          borderBottomWidth: 1,
        },
        sceneStyle: {
          backgroundColor: Colors.light.background
        }
      }}>
        <TopTap.Screen name="Issues" options={{
          title: "ဒေသဖွင့်ဖြိုးရေး"
        }} component={IssuesScreen} />
        <TopTap.Screen options={{
          title: "မဆောင်ရွက်ခင်"
        }} name="Solved" component={SolvedScreen} />
        <TopTap.Screen options={{
          title: "ဆောင်ရွက်ဆဲ"
        }} name="Onsolving" component={OnSolvingIssueScreen} />

        <TopTap.Screen options={{
          title: "ဆောင်ရွက်ပြီး"
        }} name="solved" component={OnSolvingIssueScreen} />
      </TopTap.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8FAFC',
  },
  
});

export default Home;