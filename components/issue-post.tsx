import { useVote } from "@/services/vote_services";
import { IssueUI } from "@/types/IssueUI";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageViewer from "./image-viewer";
import { IconSymbol } from "./ui/icon-symbol";

interface IssuePostProps {
    issue: IssueUI;
}

export default function IssuePost({ issue }: IssuePostProps) {
    const [showFullText, setShowFullText] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const { vote, sendVote, isLoading } = useVote({ issue_id: issue.id, initialVotes: issue.votes });
    const toggleReadMore = () => {
        setShowFullText(!showFullText);
    };

    const toggleVisible = (image: string | null = null) => {
        setVisible(!visible);
        if (image) {
            setCurrentImage(image);
        }
    };

    const StatusBadge = ({ viewed }: { viewed: boolean }) => (
        <View style={[styles.statusBadge, viewed ? styles.viewedBadge : styles.pendingBadge]}>
            <Text style={[styles.statusText, viewed ? styles.viewedText : styles.pendingText]}>
                {viewed ? 'Viewed' : 'Pending'}
            </Text>
        </View>
    );

    const handleUpVote = () => {
        if (isLoading) return;
        const value = vote.my_vote === 1 ? 0 : 1;
        sendVote(value);
    };

    const handleDownVote = () => {
        if (isLoading) return;
        const value = vote.my_vote === -1 ? 0 : -1;
        sendVote(value);
    };

    const VoteButton = ({
        type,
        count,
        myVote,
    }: {
        type: 'upvote' | 'downvote'
        count: number
        myVote: number
    }) => {
        const isActive =
            (type === 'upvote' && myVote === 1) ||
            (type === 'downvote' && myVote === -1)
        return (
            <TouchableOpacity
                style={[
                    styles.voteButton,
                    isActive && (type === 'upvote'
                        ? styles.highlightUpVote
                        : styles.highlightDownVote),
                ]}
                onPress={type === 'upvote' ? handleUpVote : handleDownVote}
            >
                <View style={styles.voteContent}>
                    <IconSymbol
                        name={
                            type === 'upvote'
                                ? 'hand.thumbsup.fill'
                                : 'hand.thumbsdown.fill'
                        }
                        size={20}
                        color={
                            !isActive
                                ? '#D3D3D3'
                                : type === 'upvote'
                                    ? '#4CAF50'
                                    : '#F9A825'
                        }
                    />
                    <Text
                        style={[
                            styles.voteCount,
                            isActive && styles.activeVoteText,
                        ]}
                    >
                        {count}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <View style={styles.card}>
                {/* Header with user info */}
                <View style={styles.header}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: issue.profile_image || 'https://dummyimage.com/100x100/E0E0E0/757575.png&text=User' }}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{issue.username}</Text>
                        <Text style={styles.date}>{issue.reported_date}</Text>
                    </View>
                    <StatusBadge viewed={issue.is_viewed} />
                </View>

                {/* Issue Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>{issue.title}</Text>

                    <TouchableOpacity activeOpacity={0.7} onPress={toggleReadMore}>
                        <Text style={styles.description} numberOfLines={showFullText ? undefined : 3}>
                            {issue.reported_text}
                        </Text>
                        {issue.reported_text.length > 150 && (
                            <Text style={styles.readMore}>
                                {showFullText ? 'Read Less' : 'Read More'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Image Gallery */}
                {issue.reported_images && issue.reported_images.length > 0 && (
                    <View style={styles.imageGallery}>
                        {issue.reported_images.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => toggleVisible(image)}
                                style={styles.imageContainer}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={styles.thumbnail}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Footer Actions */}
                <View style={styles.footer}>
                    <View style={styles.voteSection}>
                        <VoteButton type="upvote" count={vote.up} myVote={vote.my_vote} />
                        <VoteButton type="downvote" count={vote.down} myVote={vote.my_vote} />
                    </View>

                    <TouchableOpacity style={styles.commentButton}>
                        <IconSymbol name="bubble.left.fill" size={18} color="#666" />
                        <Text style={styles.commentText}>Comments</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ImageViewer image={currentImage} visible={visible} onClose={toggleVisible} />
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F5F5',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    date: {
        fontSize: 13,
        color: '#666',
        fontWeight: '400',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    pendingBadge: {
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    viewedBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.2)',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    pendingText: {
        color: '#FF9800',
    },
    viewedText: {
        color: '#4CAF50',
    },
    content: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
        lineHeight: 24,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
        marginBottom: 8,
    },
    readMore: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
        marginTop: 4,
    },
    imageGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    thumbnail: {
        width: 100,
        height: 100,
        backgroundColor: '#F5F5F5',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    voteSection: {
        flexDirection: 'row',
        gap: 8,
    },
    voteButton: {
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    highlightUpVote: {
        // backgroundColor: 'red'
    },
    highlightDownVote: {
        backgroundColor: 'light'
    },
    voteContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    voteCount: {
        fontSize: 14,
        fontWeight: '600',
        // color: '#333',
        color: '#D3D3D3',
        minWidth: 20,
        textAlign: 'center',
    },
    activeVoteText: {
        color: '#333',
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    commentText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
});