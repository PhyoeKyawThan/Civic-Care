import { Colors } from "@/constants/theme";
// import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface IssueSampleProps {
    issue_sample: {
        issueType: string;
        sampleFormatText: string;
        visible: boolean;
    };
    onClose: () => void;
}

export default function IssueSampleFormat({
    issue_sample,
    onClose,
}: IssueSampleProps) {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const copyText = async () => {
        // await Clipboard.setStringAsync(issue_sample.sampleFormatText);
        setIsCopied(true);
    };
    const insets = useSafeAreaInsets();
    return (
            <Modal
                visible={issue_sample.visible}
                animationType="slide"
                transparent={false}
                onRequestClose={onClose}
            >
                <View style={[styles.container, {
                    marginTop: insets.top
                }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>ပိတ်ရန်</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.title}>{issue_sample.issueType}</Text>

                    {/* Selectable Content */}
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={copyText}
                            style={{
                                position: 'absolute',
                                zIndex: 9999,
                                borderRadius: 18,
                                backgroundColor: Colors.light.background,
                                padding: 8,
                                right: 0,
                                top: -30
                            }}>
                            <Text style={ isCopied ?{
                                textAlign: 'center',
                                fontWeight: '600',
                                color: 'green',
                            } :{
                                textAlign: 'center',
                                fontWeight: '400'
                            }}>{isCopied ? 'Copied Text': 'Copy Text'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.sampleText}>
                            {issue_sample.sampleFormatText}
                        </Text>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        // justifyContent: 'center'
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
    },
    close: {
        color: "#2563eb",
        fontSize: 16,
    },
    content: {
        marginTop: 20
    },
    sampleText: {
        fontSize: 16,
        padding: 10,
        lineHeight: 22,
        textAlign: 'justify'
    },
});
