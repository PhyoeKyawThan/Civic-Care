import { Header } from "@/components/header";
import HomeCardNavigator from "@/components/home-card-navigator";
import TextButton from "@/components/text-button";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTap = createMaterialTopTabNavigator();
const width = Dimensions.get('screen').width;
function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <HomeCardNavigator/>
      <TextButton title="တိုင်ကြားရန်" onPress={()=>{}} style={{
        container: {
          width: width - 20,
          backgroundColor: '#de9f1f',
          padding: 10,
          borderRadius: 20,
          alignItems: 'center'
        },
        text: {
          color: '#ffff',
          fontSize: 20,
        }
      }}/>
      
      {/* <TopTap.Navigator screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#231d1d'
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          borderBottomColor: "white"
        },
        tabBarStyle: {
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
          title: "ဒေသဖွင့်ဖြိုးရေး",
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
      </TopTap.Navigator> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // backgroundColor: '#F8FAFC',
  },
  
});

export default Home;