import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Modal, Button } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const TipsScreen = () => {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);

    const handleModalOpen = (modalNumber) => {
        switch (modalNumber) {
            case 1:
                setModalVisible1(true);
                break;
            case 2:
                setModalVisible2(true);
                break;
            case 3:
                setModalVisible3(true);
                break;
            case 4:
                setModalVisible4(true);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.content}>
            <Text style={styles.MoneyMinder}>Money Minder</Text>
            <Text style={styles.MindYourMoney}>Mind your Money</Text>
            <FlatList
                data={[
                    { id: 1, title: 'WAYS TO SAVE MONEY', icon: 'check-circle-outline' },
                    { id: 2, title: 'WAYS TO BUDGET MONEY', icon: 'check-circle-outline' },
                    { id: 3, title: 'SET BUDGET GOALS', icon: 'check-circle-outline' },
                    { id: 4, title: 'DOs AND DONTs', icon: 'exclamationcircleo' }
                ]}
                renderItem={({ item }) => (
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.button}
                            onPress={() => handleModalOpen(item.id)}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>{item.title}</Text>
                                {item.icon === 'exclamationcircleo' && <AntDesign name={item.icon} size={50} color="red" />}
                                {item.icon !== 'exclamationcircleo' && <MaterialIcons name={item.icon} size={50} color="#28A745" />}
                            </View>
                            
                        </Pressable>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Modal 1</Text>
                        </View>
                        <Text>Modal 1 Content</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible1(false)} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => setModalVisible2(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Modal 2</Text>
                        </View>
                        <Text>Modal 2 Content</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible2(false)} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => setModalVisible3(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Modal 3</Text>
                        </View>
                        <Text>Modal 3 Content</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible3(false)} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={() => setModalVisible4(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Modal 4</Text>
                        </View>
                        <Text>Modal 4 Content</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible4(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    MoneyMinder: {
        marginTop: 40,
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        color: '#007BFF',
    },
    MindYourMoney: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 24,
        paddingHorizontal: 100,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 25,
        backgroundColor: '#D9D9D9',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    button: {
        paddingVertical: '10%',
        paddingHorizontal: '7%',
        backgroundColor: '#A6DFAE',
        borderRadius: 25,
        
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Aligns items to the ends of the container
        paddingHorizontal: 10,
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 30,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        
    },
    modalTitleText: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TipsScreen;
