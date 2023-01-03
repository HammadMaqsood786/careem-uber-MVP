import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function DestinationScreen({ route, navigation }) {

    const {currentLocation} = route.params;
    console.log("Pickup Location =======>",currentLocation);
    
    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    });

    return (
        <View style={styles.container} >

            <MapView style={styles.map} region={location} >
                <Marker
                    coordinate={location}
                    title={'Location'}
                    description={'Default Location'}
                />
            </MapView>
            
            <TextInput style={styles.searchBar} cursorColor="black"  >
                
            </TextInput>
            <View style={styles.pickupBtnContainer} >
                <TouchableOpacity style={styles.pickupBtn} onPress={() => navigation.navigate('Cars')}  >
                    <Text style={{ fontSize: 19, }} >Confirm Destination</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252526',
    },
    map: {
        width: '100%',
        height: '90%',
    },
    searchBar: {
        flex: 1,
        width: '90%',
        height: '8%', 
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: 10,
        marginLeft: '5%',
        marginRight: '5%',
        borderColor: 'black',
        borderRadius: 30,

    },
    pickupBtnContainer: {
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pickupBtn: {

        width: '95%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00e600',
    }
})

export default DestinationScreen;