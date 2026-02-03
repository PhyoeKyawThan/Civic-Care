import IssuePost from "@/components/issue-post";
import { Colors } from "@/constants/theme";
import { useIssue } from "@/services/issues";
import { useSearch } from "@/services/search";
import { mapIssueToUI } from "@/utils/issueAdapter";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useRouter } from "expo-router";
import debounce from 'lodash.debounce';
import { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('screen');

const SuggestionItem = ({ suggestion_text, filterBySearch }:
    {
        suggestion_text: string,
        filterBySearch: () => void,
    }) => {
    return (
        <TouchableOpacity onPress={filterBySearch} style={styles.suggestionItem}>
            <Text>{suggestion_text}</Text>
        </TouchableOpacity>
    )
}

export default function SearchScreen() {
    const color = Colors.light;
    const router = useRouter();
    const [searchText, setSearchText] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
    const { doSearch, result } = useSearch();
    const {
        issues,
        count,
        loading,
        error,
        filterBySearch,
        currentPage,
        setPage,
        hasNext,
    } = useIssue();
    const loadNextPage = () => {
        if (!loading && hasNext) {
            setPage(currentPage + 1);
        }
    };
    const debouncedSearch = useCallback(
        debounce((text) => {
            doSearch(text);
        }, 500),
        []
    );

    const handleTextChange = (text: string) => {
        setSearchText(text);
        setShowSuggestions(true);
        debouncedSearch(text);
    };

    const handleSelectSuggestion = (title: string) => {
        setSearchText(title);
        filterBySearch(title);
        setShowSuggestions(false);
    };

    const uiIssues = issues.map(mapIssueToUI);

    const backgroundImage = require('@/assets/images/gad_background_watermark.png');
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <Stack.Screen options={{
                headerShown: false
            }} />
            <View style={{
                margin: 20,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 10
            }}>
                <MaterialIcons name="arrow-back" size={28}
                    onPress={() => router.back()}
                    style={{
                        width: 20,
                    }}
                />
                <TextInput
                    placeholder="ရှာဖွေရန်..."
                    placeholderTextColor={color.inActiveIcon}
                    style={{
                        backgroundColor: "#fffefe",
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                        borderRadius: 8,
                        fontSize: 16,
                        width: width - 100,
                        color: color.text,
                    }}
                    value={searchText}
                    autoFocus={true}
                    onChangeText={handleTextChange}
                />

                <MaterialIcons
                    name="search"
                    size={28}
                    color={color.inActiveIcon}
                    style={{ width: 20 }}
                />
            </View>
            {/* suggestion views */}
            <View style={styles.suggestionViewContainer}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.background}
                >
                    <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
                    <View style={styles.overlay} />
                    {showSuggestions && result.length > 0 ? (
                        result.map((res) => (
                            <SuggestionItem
                                key={res.id}
                                suggestion_text={res.title}
                                filterBySearch={() => handleSelectSuggestion(res.title)}
                            />
                        ))
                    ) : (<FlatList
                        data={uiIssues}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <IssuePost issue={item} />}
                        contentContainerStyle={styles.feed_container}
                        onEndReached={loadNextPage}
                        onEndReachedThreshold={0.6}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" /> : null
                        }
                    />)}
                </ImageBackground>
            </View>
            {/* searched contents views */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    suggestionViewContainer: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    suggestionItem: {
        padding: 20,
        color: 'black',
        fontWeight: 'bold'
    }
    ,
    feed_container: {
        paddingBottom: 70,
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
    },
})