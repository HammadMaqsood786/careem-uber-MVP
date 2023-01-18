import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PickupScreen from '../src/views/PickupScreen';
import DestinationScreen from '../src/views/DestinationScreen';
import CarSelection from '../src/views/CarSelectionScreen';
import Summary from '../src/views/RideInfo';


const Stack = createNativeStackNavigator();


function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{

                headerStyle: {
                    backgroundColor: '#252526',//#3F3F3F
                },
                headerTintColor: '#fff',
            }} >
                <Stack.Screen
                    name="Pickup"
                    component={PickupScreen}

                />
                <Stack.Screen name="Destination" component={DestinationScreen}

                />
                <Stack.Screen name="Cars" component={CarSelection}

                />
                <Stack.Screen name="Summary" component={Summary}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;