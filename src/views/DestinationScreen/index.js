import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

function DestinationScreen({ route, navigation }) {

    const { currentLocation } = route.params;

    // console.log("current location =======>", currentLocation);

    const { longitude, latitude } = currentLocation;

    // console.log("longitude =======>", longitude);
    // console.log("latitiude =======>", latitude);


    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    });

    const [query, setQuery] = useState("");
    const [destination, setDestination] = useState([])


    const searchPlaces = (text) => {
        setQuery(text);
        console.log("query =====>", query);
    }

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //       accept: 'application/json',
        //       Authorization: 'fsq3YmyU2CvERiMkIOaa+4hZR3EMy0w1HinrEWAvZC/b9JQ='
        //     }
        //   };

        //   const endPoint = "https://api.foursquare.com/v3/places/search";

        //   const parameters = {
        //     clientId: "HW2V033ZIP5QGBSGOUXSGUU15EC2XAD3OM41Z2DV31LPJ2RV",
        //     clientSecret: "MIFQRM0VXZX5IJCX20S5PXDCOPVGJR4KD2HODTJWU55RAGNZ",
        //     query: "national",
        //     v: "20230101"

        // }

        // axios.get(endPoint + new URLSearchParams(parameters))
        // .then(response => {
        //   console.log("data", response)
        // })
        // .catch(error => {
        //   console.log("ERROR!! " + error)
        // })

        //============ Foursquare api code ===============//

        const radius = '300';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3YmyU2CvERiMkIOaa+4hZR3EMy0w1HinrEWAvZC/b9JQ='
            }
        };

        fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latitude}%2C${longitude}&radius=100000`, options)

            .then(response => response.json())
            .then(response => {
                console.log(response)
                setDestination(response.results[0].geocodes.main)

            })
            // .then(response => )
            .catch(err => console.error(err));

        console.log("geocodes", destination);


        // const latitiude = destination.latitude;
        // const longitude = destination.longitude;
    
        // // console.log("latitude", destLatitude);
        // // console.log("longitude", destLongitude);
    
        // setLocation({...location, latitude, longitude});
    
        // console.log('location baad wali', location);

    }, [query]);



    return (
        <View style={styles.container} >

            <MapView style={styles.map} region={location} >
                <Marker
                    coordinate={location}
                    title={'Location'}
                    description={'Default Location'}
                />
            </MapView>

            <TextInput style={styles.searchBar} cursorColor="black" placeholder='Search' onChangeText={(text) => searchPlaces(text)}>

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
        borderWidth: 1,
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