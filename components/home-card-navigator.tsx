import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect } from "react";
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

interface CardProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    index: number;
}

type AppRoute =
    | "/screens/issue_screen"
    | "/screens/water_screen"
    | "/screens/report_screen"
    | "/screens/waste_screen"
    | string;

interface MenuItem {
    id: string;
    icon: ImageSourcePropType;
    title: string;
    route: AppRoute;
}

const { width, height } = Dimensions.get('window');

const itemMargin = 10;
const itemWidth = (width / 2) - (itemMargin * 2);
const cardHeight = itemWidth * 0.9;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = ({ icon, title, onPress, index }: CardProps) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        const delay = index * 100;
        setTimeout(() => {
            scale.value = withSpring(1, {
                damping: 12,
                stiffness: 100,
            });
            opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
            translateY.value = withDelay(delay, withSpring(0, {
                damping: 15,
                stiffness: 90,
            }));
        }, 100);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateY: translateY.value }
        ],
        opacity: opacity.value,
    }));

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={() => {
                scale.value = withSpring(0.96, { damping: 15 });
            }}
            onPressOut={() => {
                scale.value = withSpring(1, { damping: 15 });
            }}
            style={[styles.cardContainer, animatedStyle]}
        >
            <View style={[styles.card, { width: itemWidth, height: cardHeight }]}>
                <View style={styles.iconContainer}>
                    <Image
                        source={icon}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
            </View>
        </AnimatedPressable>
    );
};

const HomeCardNavigator = () => {
    const menuItems: MenuItem[] = [
        {
            id: '1',
            icon: require("@/assets/images/icons/env_dev.png"),
            title: "ပတ်ဝန်းကျင်ဖွံ့ဖြိုးတိုးတက်ရေး",
            route: "/screens/issue_screen"
        },
        {
            id: '2',
            icon: require("@/assets/images/icons/rain.png"),
            title: "သဘာဝဘေးအန္တာရာယ်",
            route: "/screens/water_screen"
        },
        {
            id: '3',
            icon: require("@/assets/images/icons/issues.png"),
            title: "တိုင်ကြားချက်များ",
            route: "/screens/report_screen"
        },
        {
            id: '4',
            icon: require("@/assets/images/icons/trash_bin.png"),
            title: "ပတ်ဝန်းကျင်သန့်ရှင်းသာယာရေး",
            route: "/screens/waste_screen"
        },
    ];

    const handlePress = (route: AppRoute) => {
        router.push(route as any);
    };

    return (
        <View style={styles.container}>
            {menuItems.map((item, index) => (
                <Card
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    onPress={() => handlePress(item.route)}
                    index={index}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: itemMargin,
        paddingTop: itemMargin,
        justifyContent: 'space-between',
    },
    cardContainer: {
        marginBottom: itemMargin,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    iconContainer: {
        width: 72,
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: '700',
        color: Colors.light.inActiveIcon,
        fontSize: 14,
        paddingBottom: 8,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: -0.2,
    },
});

export default HomeCardNavigator;