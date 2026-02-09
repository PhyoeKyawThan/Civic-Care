import { Header } from "@/components/header";
import HomeCardNavigator from "@/components/home-card-navigator";
import IssuePost from "@/components/issue-post";
import TextButton from "@/components/text-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useIssue } from "@/services/issues";
import { mapIssueToUI } from "@/utils/issueAdapter";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TopTap = createMaterialTopTabNavigator();
const width = Dimensions.get('screen').width;

function Home() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { issues, recentActivity, loading } = useIssue();
  const isDark = colorScheme === 'dark';
  useEffect(() => {
    recentActivity();
  }, [recentActivity]);
  const uiIssues = issues.map(mapIssueToUI);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <HomeCardNavigator />
        <TextButton title="တိုင်ကြားရန်" onPress={() => { }} style={{
          container: {
            width: width - 20,
            margin: 'auto',
            backgroundColor: '#de9f1f',
            padding: 10,
            borderRadius: 20,
            alignItems: 'center'
          },
          text: {
            color: '#ffff',
            fontSize: 20,
          }
        }} />
        <Pressable onPress={() => { }} style={{
          width: width,
          padding: 10,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontWeight: '600',
            color: Colors.light.inActiveIcon
          }}>Recent Issues posts</Text>
          <MaterialIcons name="arrow-forward-ios" color={Colors.light.inActiveIcon} size={23} />
        </Pressable>
        <View style={{
          paddingBottom: insets.bottom + 50
        }}>
          <FlatList
            data={uiIssues}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <IssuePost issue={item} />}
            contentContainerStyle={styles.feed_container}
            // onEndReached={loadNextPage}
            onEndReachedThreshold={0.6}
            refreshing={false}
            // onRefresh={handleOnRefresh}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" /> : null
            }
          />
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // backgroundColor: '#F8FAFC',
  },
  feed_container: {
    flex: 1,
  }
});

export default Home;