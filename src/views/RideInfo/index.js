import React from "react";
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';


//This is for React native paper
// import { Avatar, Button, Card, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Summary({ route }) {

    const { placeName, selectedVehicle, userLongitude, userLatitude, destLatitude, destLongitude, } = route.params;

    const lat1 = userLatitude;
    const lon1 = userLongitude;
    const lat2 = destLatitude;
    const lon2 = destLongitude;

    //Function to calculate the distance in KM with using latitude and longitude of two different locations
    let distance;

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        // return d;

        distance = parseInt(d);

        console.log("distance ===>", distance);
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    let rent;

    switch (selectedVehicle) {
        case "Car AC":
            rent = 80 * distance
            break;
        case "Car Mini":
            rent = 75 * distance
            break;
        case "Rickshaw":
            rent = 50 * distance
            break;
        case "Bike":
            rent = 30 * distance
            break;
        default: 
            break;
    }

    console.log("Rent====>", rent);

    const findingRideAlert = () => {
        Alert.alert('Please Wait', 'We are finding rides for you', [
            {
                text: 'OK'
            },
           
        ],

         {
            cancelable: true,
            }
        )
    }


    // console.log("Place Name===>", placeName);
    // console.log("Vehicle ====>", selectedVehicle);

    return (
        <View style={styles.container} >
            <View style={styles.rideInfoBox} >
                <View style={styles.childs} >
                    <Text style={styles.infoText} >Pickup</Text>
                </View>

                <View style={styles.childs} >
                    <Text style={styles.infoText} >Drop off: {placeName}</Text>
                </View>

                <View style={styles.childs} >
                    <Text style={styles.infoText} >Distance: {distance} KM</Text>
                </View>

                <View style={styles.childs} >
                    <Text style={styles.infoText} >Vehicle: {selectedVehicle}</Text>
                </View>

                <View style={styles.childs} >
                    <Text style={styles.infoText} >Rs: {rent}</Text>
                </View>
            </View>

            <View style={styles.pickupBtnContainer} >
                <TouchableOpacity style={styles.pickupBtn} onPress={findingRideAlert} >
                    <Text style={{ fontSize: 19, }} >Chalo letsGo</Text>
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
    rideInfoBox: {
        width: '90%',
        height: '65%',
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        marginLeft: '5%',
        marginTop: '20%',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    childs: {
        width: '90%',
        height: 50,
        // backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',

    },
    infoText: {
        fontSize: 25,
        marginTop: 10,
        color: 'white',

    },
    pickupBtnContainer: {
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pickupBtn: {

        width: '90%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00e600',
    }
})

export default Summary;