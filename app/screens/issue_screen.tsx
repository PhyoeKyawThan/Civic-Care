import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import IssuePost from "@/components/issue-post";
import { Colors } from "@/constants/theme";
import { useIssue } from "@/services/issues";
import { mapIssueToUI } from "@/utils/issueAdapter";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

const filterItems = [
  {
    'label': 'လုပ်ဆောင်ချက်များ',
    'value': null
  },
  {
    'label': 'မဆောင်ရွက်ခင်',
    'value': 'open',
  },
  {
    'label': 'ဆောင်ရွက်ဆဲ',
    'value': 'in_progress'
  },
  {
    'label': 'ဆောင်ရွက်ပြီး',
    'value': 'resolved'
  }
]

const { width, height } = Dimensions.get('screen');


export default function IssuesScreen() {
  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      title: "ပတ်ဝန်းကျင်ဖွံ့ဖြိုးတိုးတက်ရေး",
      center: true
    })
  })
  const {
    fetchIssues,
    issues,
    refetch,
    count,
    loading,
    error,
    currentStatus,
    filterByStatus,
    currentPage,
    setPage,
    hasNext,
    hasPrevious
  } = useIssue();

  useEffect(() => {
    fetchIssues();
  }, [currentPage, currentStatus, fetchIssues]);
  const handleOnRefresh = useCallback(() => {
    fetchIssues();
  }, [currentPage, currentPage, fetchIssues]);
  const DropDownList = () => (<Dropdown
    style={{
      width: width - 20,
      marginTop: 10,
      marginStart: 10,
      borderRadius: 100,
      paddingStart: 20,
      paddingEnd: 20,
      paddingTop: 10,
      paddingBottom: 10,
      elevation: 1,
      shadowColor: Colors.light.headerBackgroundColor,
      borderBottomColor: '#a0f3be'
    }}
    activeColor="#a0f3be"
    data={filterItems.map((item) => ({
      label: item.label,
      value: item.value,
    }))}
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder='လုပ်ဆောင်ချက်များ'
    value={currentStatus}
    onChange={item => filterByStatus(item.value)}
  />);

  if (error) return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <DropDownList />
    <Text style={{
      fontWeight: "bold"
    }}>Error: {error}</Text></View>;

  const loadNextPage = () => {
    if (!loading && hasNext) {
      setPage(currentPage + 1);
    }
  };

  if (loading && issues.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <DropDownList />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }
  if (!loading && count === 0) {
    return (
      <View style={{ flex: 1 }}>
        <DropDownList />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ fontWeight: '800' }}>ရှာမတွေ့ပါ</Text>
        </View>
      </View>
    );
  }
  const uiIssues = issues.map(mapIssueToUI);
  return (
    <View style={{
      flex: 1,
    }}>
      <DropDownList />
      <FlatList
        data={uiIssues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <IssuePost issue={item} />}
        contentContainerStyle={styles.feed_container}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.6}
        refreshing={false}
        onRefresh={handleOnRefresh}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  feed_container: {
    paddingBottom: 70,
  },
});
