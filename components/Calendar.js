import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [billsToPay, setBillsToPay] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [newBillTitle, setNewBillTitle] = useState('');
    const [newBillAmount, setNewBillAmount] = useState('');

    useEffect(() => {
        const defaultDate = new Date().toISOString().split('T')[0];
        setSelectedDate(defaultDate);
        setCurrentDate(defaultDate);
        fetchBills(defaultDate);
    }, []);
    
    const fetchBills = async (date) => {
        try {
            const response = await fetch(`/api/bills?date=${date}`);
            if(!response.ok) {
                throw new Error('Rror fetching bills');
            }
            const data = await response.json();
            setBillsToPay(data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    } ;

    const addBill = async () => {
        if (newBillTitle && newBillAmount && selectedDate) {
            try {
                const reponse = await fetch("/api/bills", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        title: newBillTitle,
                        amount: parseFloat(newBillAmount),
                        date: selectedDate,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Error adding bill');
                }
                fetchBills(selectedDate);
                setModalVisible(false);
                setNewBillTitle('');
                setNewBillAmount('');
            } catch (error) {
                console.error("Error adding bill:", error);
            }
        }
    };

    const removeBill = async (id) => {
        try {
            const reponse = await fetch (`/api/bills/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleteing bill');
            }
            fetchBills(selectedDate);
            setModalVisible(false);
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    const editBill = async () => {
        if (selectedBill && newBillTitle && newBillAmount) {
            try {
                const response = await fetch (`/api/bills/${selectedBll.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        title: newBillTitle,
                        amount: parseFloat(newBillAmount),
                        date: selectedDate,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Error editing bill');
                }
                fetchBills(selectedDate);
                setModalVisible(false);
                setNewBillTitle('');
                setNewBillAmount('');
            } catch (error) {
                console.error("Error editing bill:", error);
            }
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
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
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
            <View style={styles.billsContainer}>
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
                        <Text style={styles.billText}>{bill.title}: ${bill.amount}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => openModal(null)}>
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
});

export default CalendarScreen;
