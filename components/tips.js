import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Modal, Button, ScrollView } from "react-native";
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
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Ways to Save Money</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>#1. Track Your Expenses</Text>
                        <Text>Understanding your expenses is the first step in learning to save. Record your expsenses such as household utilities, groceries, and more. </Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#2. Set Specific Saving Goals</Text>
                        <Text>Think of a purpose for both short and long term savings. You can estimate how much you will need and how long it will take to achieve.</Text>
                        <Text style={{ fontStyle: 'italic' }}>Short-term savings: Vacation trip, Emergency Fund, or New Phone</Text>
                        <Text style={{ fontStyle: 'italic' }}>Long-term savingss: Retirement Fund, Education Fund, Insurances</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#3. Determine Your Financial Priorities</Text>
                        <Text>Knowing your expenses and saving goals will impact how you will save. Think on how you will allocate your money in expenses, short and long term savings. For example, if you need to repair something in your car, you might want to allocate a bit more compare to other savings such as retirement plan because you need the money for the repair immediately.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>References:https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money</Text>
                        
                    </ScrollView>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible1(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => setModalVisible2(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Ways to Budget Money</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>#1. The "50/30/20"</Text>
                        <Text>This method provides an allocation plan on the money that you receive monthly, mainly 50% for necessary expenses, 30% for discretionary expenses, and 20% savings and debts.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Necessary Expenses: Groceries, Bills, Transportation expenses</Text>
                        <Text style={{ fontStyle: 'italic' }}>Discretionary Expenses: Wants such as new clothes or treating yourself during rest days</Text>
                        <Text style={{ fontStyle: 'italic' }}>Savings and Debts: Loan payments, Insurances, Emergency Funds</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: These expenses may vary depending on your needs and knowing your expenses and priorities is important. You can also change the allocation such as 55/35/10, depending on your plan.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#2. The Envelope Method</Text>
                        <Text>This method can be incorporated with the "50/30/20". You can use an envelope in separating the cash that will be used for different expenses. This can help in setting boundaries, avoiding spending more that the alloted budget.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: This might be uncomfortable to other people that doesn't like cold cash lying around their house but you can use different ways in separating your money such as E-wallets for household bills, or separate bank account for savings</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#3. The "Pay yourself first"</Text>
                        <Text>This method focuses on making savings and paying debts. You will prioritized listing the amount of savings and debt payments first, the remaining amount will be allocated to your other expenses. This ensures that you will pay your debts on time and have some savings before anything else.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: You may include utility bills in prioritizing to make sure you won't miss any payments</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>References:https://www.lendingtree.com/student/simple-budget/</Text>
                        
                    </ScrollView>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible2(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => setModalVisible3(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Setting Your Financial Goals</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>#1. Make Your Goals Specific</Text>
                        <Text>This method will give more importance on your financial goal. Instead of "I want to save money for the future", you can set it to "I want to save for my new house". Specificying your goals can give you a view on how you will plan on saving.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#2. Make Your Goal Measurable</Text>
                        <Text>Making your goal measurable allows you to see how much you will need and how long you can probably achieve it. For example, having an emergency fund that is worth 3 times of your monthly salary. You can achieve this by saving 10% of your salary every month for 30 months, or 20% for a much shorter time of 15 months.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: Remember to set priorities if you have multiple goals. This will help you in managing your goals and think on how you can achieve them.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#3. Give yourself a deadline</Text>
                        <Text>"I will start someday" sometimes held you back in making your goal a reality. Let's say that you want to buy a new TV for your living room and plan to save bit-by-bit in order to afford it. Setting a deadline creates importance on your goal that will make sure that you will be able to achieve your goal.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: Measure your goal first, this will help you in setting a reasonable deadline for your goal</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>References:https://www.ramseysolutions.com/personal-growth/setting-financial-goals</Text>
                        
                    </ScrollView>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible3(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={() => setModalVisible4(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Setting Your Financial Goals</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>#1. Saving Money</Text>
                        <Text style={{ fontWeight: 'bold' }}>Do: Track Your Expenses</Text>
                        <Text>Tracking your expenses gives you an idea on how much you can possibly save. This can also give ideas on how you can cut down some of the expenses in order to save more. </Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: Future expenses still may vary compare from your previos tracks but still, it will give you an idea on how much you can save</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>Don't: Keep Your Savings in the Same Basket with Expenses</Text>
                        <Text>Let's say you only have one bank account where you withdraw your money and keep your savings. It is much better to have a different bank account for your savings. This will help you track how much you are saving and avoid spending your savings because of losing track in one account</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: Setting a new bank account requires a minimum initial deposit. You might consider other ways in keeping money temporarily such as piggy banks, or safe compartment in your room.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#2. Budgeting Money</Text>
                        <Text style={{ fontWeight: 'bold' }}>Do: Plan Ahead</Text>
                        <Text>Planning ahead before recieving your next salary will give you more preparation. For example, you might change how you will budget your expenses on months with hollidays, or months that foresees higher household utilities such as electricity and water. Planning this ahead will also help you on your saving goals.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: There might be small adjustments as we cannot predict the future but still, planning ahead makes the adjustments less stressful.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>Don't: Restrict Your Budget Too Much</Text>
                        <Text>Being too tight can affect how you see budgeting. You may feel bad in times that you overspend. Giving some allowances on expected expenses might help to avoid overspending. </Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: There will be times that you will overspend unexpectedly but don't lose grip on your budgeting. You can evaluate on what happened and develop a plan to handle it next time.</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>#3. Setting Goals</Text>
                        <Text style={{ fontWeight: 'bold' }}>Do: Make Your Goal into Smaller Goals</Text>
                        <Text>Let's say you want to renovate your house. You can set smaller goals like fixing the bathroom, upgrading the kitchen, or other parts of your home. In this way, you can handle each goal because it will be more specific and easier to plan.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic' }}>Note: This can also help you feel more optimistic as achieving a goal can give you possitive emotions</Text>
                        <Text>      </Text>
                        <Text style={{ fontWeight: 'bold' }}>Don't: Keep Your Savings in One Basket</Text>
                        <Text>Keeping your savings into different baskets can help you track your current progress. This also give extra safety against unfortunate events such as thefts, frauds, and other criminal activities.</Text>
                        <Text>      </Text>
                        <Text style={{ fontStyle: 'italic', marginBottom: 40 }}>Note: You can also ask your bank for a time deposit. This can prevent you from getting your savings right away and grow further with higher interest rates. This is very helpful especially in long-term savings such as retirement fund.</Text>

                    </ScrollView>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible4(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
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
        fontSize: 60,
        fontWeight: 'bold',

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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5, 
    
        
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
        fontWeight: 'bold',
        
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#FFFFFF', // White background for the modal
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '75%', // Limiting the maximum height
        elevation: 5, // Add elevation for a shadow effect
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitleText: {
        marginLeft: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333333', // Dark color for the title text
    },
    closeButton: {
        backgroundColor: '#A6DFAE', // Coral color for the button
        paddingVertical: 12, // Adjust padding as needed
        paddingHorizontal: 24, // Adjust padding as needed
        borderRadius: 15, // Round button corners
        marginTop: 20, // Push it up from the bottom
        alignSelf: 'center', // Center the button horizontally
        elevation: 3, // Add elevation for a shadow effect
        width: '78%',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'black', // White color for the text
        textAlign: 'center',
        fontWeight: 'bold', // Bold font weight for emphasis
    },
    
    
});

export default TipsScreen;
