import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet
} from "react-native";

import IssuePost from "@/components/issue-post";
import { useIssue } from "@/services/issues";
import { mapIssueToUI } from "@/utils/issueAdapter";

export default function IssuesScreen() {
  const [page, setPage] = useState(1);
  const { issues, loading, hasNext } = useIssue(page);

  const loadNextPage = () => {
    if (!loading && hasNext) {
      setPage((p) => p + 1);
    }
  };
  const uiIssues = issues.map(mapIssueToUI);

  return (
    <FlatList
      data={uiIssues}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <IssuePost issue={item} />}
      contentContainerStyle={styles.feed_container}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.6}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  feed_container: {
    paddingBottom: 70,
  },
});
