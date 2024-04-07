import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [billsToPay, setBillsToPay] = useState([
        { id: 1, title: 'Electricity Bill', amount: 50, date: '2024-04-07' },
        { id: 2, title: 'Internet Bill', amount: 30, date: '2024-04-10' },
        { id: 3, title: 'Rent', amount: 500, date: '2024-04-06' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [newBillTitle, setNewBillTitle] = useState('');
    const [newBillAmount, setNewBillAmount] = useState('');

    useEffect(() => {
        const defaultDate = new Date().toISOString().split('T')[0];
        setSelectedDate(defaultDate);
        setCurrentDate(defaultDate);
    }, []);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const addBill = () => {
        if (newBillTitle && newBillAmount && selectedDate) {
            const newBill = {
                id: billsToPay.length + 1,
                title: newBillTitle,
                amount: parseFloat(newBillAmount),
                date: selectedDate,
            };
            setBillsToPay([...billsToPay, newBill]);
            setModalVisible(false);
            setNewBillTitle('');
            setNewBillAmount('');
        }
    };

    const removeBill = (id) => {
        setBillsToPay(billsToPay.filter((bill) => bill.id !== id));
        setModalVisible(false);
    };

    const editBill = () => {
        if (selectedBill && newBillTitle && newBillAmount) {
            setBillsToPay(
                billsToPay.map((bill) =>
                    bill.id === selectedBill.id ? {
                        ...bill,
                        title: newBillTitle,
                        amount: parseFloat(newBillAmount)
                    } : bill
                )
            );
            setModalVisible(false);
            setNewBillTitle('');
            setNewBillAmount('');
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

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
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
            <View style={styles.billsContainer}>
                {billsToPay
                    .filter((bill) => bill.date === selectedDate)
                    .map((bill) => (
                        <TouchableOpacity
                            key={bill.id}
                            style={[
                                styles.billItem,
                                isOverdue(bill.date) && { backgroundColor: 'red' },
                                isSoonDue(bill.date) && { backgroundColor: 'green' },
                                !isOverdue(bill.date) && !isSoonDue(bill.date) && { backgroundColor: 'yellow' },
                            ]}
                            onPress={() => {
                                setSelectedBill(bill);
                                setNewBillTitle(bill.title);
                                setNewBillAmount(String(bill.amount));
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.billText}>{bill.title}: ${bill.amount}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
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
                        <TouchableOpacity style={styles.button} onPress={() => removeBill(selectedBill.id)}>
                            <Text style={styles.buttonText}>Delete Bill</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarContainer: {
        padding: 20,
    },
    billsContainer: {
        padding: 20,
    },
    billItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    billText: {
        fontSize: 16,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'tomato',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CalendarScreen;
