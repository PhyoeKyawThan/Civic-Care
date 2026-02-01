import { ImageViewerType } from "@/types/ImageViewer";
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

const { width, height } = Dimensions.get('screen');

export default function ImageViewer({
    image, visible, onClose
}: ImageViewerType) {
    return <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={onClose} style={{
                position: 'absolute',
                top: 50,
                right: 20,
                zIndex: 9999,
            }}>
                <IconSymbol name="x.circle" size={35} color='white' />
            </TouchableOpacity>
            <View style={styles.modalContent}>

                <Image src={image ?? ''} style={{
                    width: width - 40,
                    height: height - 100,
                }} resizeMode="contain" />
            </View>
        </View>
    </Modal>
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        // backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        // elevation: 5,
    },
    modalText: { marginBottom: 15, fontSize: 18 },
})