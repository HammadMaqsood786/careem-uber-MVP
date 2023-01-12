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
            <Stack.Navigator>
                <Stack.Screen
                    name="Pickup"
                    component={PickupScreen}
                    options={{

                        headerStyle: {
                            backgroundColor: '#252526',//#3F3F3F
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen name="Destination" component={DestinationScreen}
                    options={{

                        headerStyle: {
                            backgroundColor: '#252526',//#3F3F3F
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen name="Cars" component={CarSelection}
                    options={{
                        headerTitle: 'Select Vehicle',
                        headerStyle: {
                            backgroundColor: '#252526',//#3F3F3F
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen name="Summary" component={Summary}
                    options={{
                        headerTitle: 'Ride Info',
                        headerStyle: {
                            backgroundColor: '#252526',//#3F3F3F
                        },
                        headerTintColor: '#fff',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;