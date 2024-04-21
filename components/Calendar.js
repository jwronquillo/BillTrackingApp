import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Animated } from "react-native";
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'; // Import SQLite

const db = SQLite.openDatabase('bills.db'); // Open or create SQLite database

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [billsToPay, setBillsToPay] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [newBillTitle, setNewBillTitle] = useState('');
    const [newBillAmount, setNewBillAmount] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [fadeBillAnim] = useState(new Animated.Value(0)); // Add fade animation for bill container

    useEffect(() => {
        fadeIn();
    }, []);

    useEffect(() => {
        const defaultDate = new Date().toISOString().split('T')[0];
        setSelectedDate(defaultDate);
        setCurrentDate(defaultDate);
        createTable();
        fetchBills(defaultDate);
    }, []);

    useEffect(() => {
        fadeInBillContainer();
    }, [billsToPay]); // Trigger fade animation when billsToPay changes

    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();
    };

    const fadeInBillContainer = () => {
        Animated.timing(
            fadeBillAnim,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();
    };
    
    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS bills (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount REAL, date TEXT)'
            );
        });
    };

    const fetchBills = (date) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM bills WHERE date = ?',
                [date],
                (_, { rows }) => {
                    setBillsToPay(rows._array);
                },
                (_, error) => {
                    console.error("Error fetching bills:", error);
                }
            );
        });
    };

    const addBill = async () => {
        if (newBillTitle && newBillAmount && selectedDate) {
            try {
                db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO bills (title, amount, date) VALUES (?, ?, ?)',
                        [newBillTitle, parseFloat(newBillAmount), selectedDate],
                        () => {
                            fetchBills(selectedDate);
                            setModalVisible(false);
                            setNewBillTitle('');
                            setNewBillAmount('');
                        },
                        (_, error) => {
                            console.error("Error adding bill:", error);
                        }
                    );
                });
            } catch (error) {
                console.error("Error adding bill:", error);
            }
        }
    };

    const editBill = async () => {
        if (selectedBill && newBillTitle && newBillAmount) {
            try {
                db.transaction(tx => {
                    tx.executeSql(
                        'UPDATE bills SET title = ?, amount = ?, date = ? WHERE id = ?',
                        [newBillTitle, parseFloat(newBillAmount), selectedDate, selectedBill.id],
                        () => {
                            fetchBills(selectedDate);
                            setModalVisible(false);
                            setNewBillTitle('');
                            setNewBillAmount('');
                        },
                        (_, error) => {
                            console.error("Error editing bill:", error);
                        }
                    );
                });
            } catch (error) {
                console.error("Error editing bill:", error);
            }
        }
    };

    const removeBill = async (id) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM bills WHERE id = ?',
                    [id],
                    () => {
                        fetchBills(selectedDate);
                        setModalVisible(false);
                    },
                    (_, error) => {
                        console.error("Error deleting bill:", error);
                    }
                );
            });
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    const isOverdue = (date) => {
        return new Date(date) < new Date(currentDate);
    };

    const isSoonDue = (date) => {
        const dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() - 3);
        return new Date(dueDate) >= new Date(currentDate);
    };

    const openModal = (bill) => {
        setSelectedBill(bill);
        setNewBillTitle(bill ? bill.title : '');
        setNewBillAmount(bill ? String(bill.amount) : '');
        setModalVisible(true);
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.calendarContainer}>
                <View style={styles.calendarWrapper}>
                    <Calendar
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                            fetchBills(day.dateString);
                        }}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'tomato' },
                            [currentDate]: { selected: true, dotColor: 'black', marked: true },
                        }}
                        theme={{
                            todayTextColor: 'green',
                            selectedDayBackgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }}
                    />
                </View>
            </View>
            <View style={styles.upcoming}>
                <Text style={styles.ucText}>Upcoming Bills</Text>
            </View>
            <Animated.View style={[styles.billsContainer, { opacity: fadeBillAnim }]}>
                {billsToPay.map((bill) => (
                    <TouchableOpacity
                        key={bill.id}
                        style={[
                            styles.billItem,
                            isOverdue(bill.date) && { backgroundColor: 'red' },
                            isSoonDue(bill.date) && { backgroundColor: 'green' },
                            !isOverdue(bill.date) && !isSoonDue(bill.date) && { backgroundColor: 'yellow' },
                        ]}
                        onPress={() => openModal(bill)}
                    >
                        <Text style={styles.billText}>{bill.title}: </Text>
                        <Text style={styles.billText}>Php { bill.amount}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
            <TouchableOpacity style={styles.addButton} onPress={() => openModal(null)}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedBill ? 'Edit Bill' : 'Add Bill'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newBillTitle}
                            onChangeText={setNewBillTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            keyboardType="numeric"
                            value={newBillAmount}
                            onChangeText={setNewBillAmount}
                        />
                        <TouchableOpacity style={styles.button} onPress={selectedBill ? editBill : addBill}>
                            <Text style={styles.buttonText}>{selectedBill ? 'Edit Bill' : 'Add Bill'}</Text>
                        </TouchableOpacity>
                        {selectedBill &&
                            <TouchableOpacity style={[styles.button,styles.deletebutton]} onPress={() => removeBill(selectedBill.id)}>
                                <Text style={[styles.buttonText,styles.deletebutton]} >Delete Bill</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarContainer: {
        padding: 20,
    },
    calendarWrapper: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    upcoming:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ucText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase', 
    },
    billsContainer: {
        padding: 20,
    },
    billItem: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5, 
    },
    billText: {
        fontSize: 18, // Decrease font size slightly
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#FFFFFF', // White background for the modal content
        padding: 30,
        borderRadius: 10,
        width: '80%',
        elevation: 5, // Add elevation for a shadow effect

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc', // Lighter border color
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    deletebutton: {
        backgroundColor: 'red',
    },
});

export default CalendarScreen;
