import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import DashboardScreen from "./Dashboard";
import CalendarScreen from "./Calendar";
import SettingsScreen from "./Settings";
import TipsScreen from "./tips";

const Tab = createBottomTabNavigator();
const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'dashboard';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    }
                     else if (route.name === 'Tips') {
                        iconName = 'lightbulb-o';
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007BFF',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {display: 'flex' },
            })}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
                <Tab.Screen name="Tips" component={TipsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                
            </Tab.Navigator>
    );
};

export default BottomNav;