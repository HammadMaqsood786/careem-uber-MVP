import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { setPickupData } from '../../../store/actions/pickupActions';
import { useDispatch } from 'react-redux';

function PickupScreen({ navigation }) {

    const dispatch = useDispatch();

    // ========= Code to access the Current Location =========== //

    // const [location, setLocation] = useState(null)

    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    });
    const [errorMsg, setErrorMsg] = useState(null);

    const currLocation = location;




    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ ...location, latitude, longitude });

            // ========= Code for Realtime updated location ========== //

            // Location.watchPositionAsync({
            //     distanceInterval: 0.1,
            //     timeInterval: 100,
            // }, (response) => {
            //     const { coords: { latitude, longitude } } = response
            //     setLocation({ ...location, latitude, longitude })
            // })

        })();
    }, []);

    // console.log("This is location ======>", location)

    return (
        <View style={styles.container} >
            <MapView style={styles.map} region={location} >

                <Marker
                    coordinate={location}
                    title={'Pickup'}
                    description={'Your current location'}

                />
            </MapView>

            <View style={styles.pickupBtnContainer} >
                <TouchableOpacity style={styles.pickupBtn} onPress={() => {
                    navigation.navigate('Destination', {
                        currentLocation: currLocation,
                    });
                }}  >
                    <Text style={{ fontSize: 19, }} >Confirm Pickup</Text>
                </TouchableOpacity>
            </View>
        </View >
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
});

export default PickupScreen;
