import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PostImageScreen from './PostImageScreen';
import ViewImagesScreen from './ViewImagesScreen';
import Login from './Login';
import Register from './Register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Post Image" component={PostImageScreen} />
      <Tab.Screen name="View Images" component={ViewImagesScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="MyTab"
          component={MyTabs}
          options={{ headerShown: false }} // Hide header for tab screens
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
