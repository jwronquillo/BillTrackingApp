import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
};

require('events').EventEmitter.defaultMaxListeners = 15;