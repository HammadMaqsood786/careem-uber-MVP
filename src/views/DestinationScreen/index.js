import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { SearchBar } from '@rneui/themed';

function DestinationScreen({ route, navigation }) {

    const { currentLocation } = route.params;

    // console.log("current location =======>", currentLocation);

    const { longitude, latitude } = currentLocation;

    console.log("longitude =======>", longitude);
    console.log("latitiude =======>", latitude);

    const userLongitude = longitude;
    const userLatitude = latitude;


    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    });

    const userDestination = location;

    const [query, setQuery] = useState("");
    const [destination, setDestination] = useState([]);
    const [placesBox, setPlacesBox] = useState(false);
    const [placeName, setPlaceName] = useState("");

    const searchPlaces = (text) => {
        setQuery(text);
        setPlacesBox(true);
    }


    console.log("query =====>", query);

    useEffect(() => {

        const { latitude, longitude } = location;

        if (query == "") {
            setPlacesBox(false);
        }

        //============ Foursquare api code ===============//

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
                console.log("For geocode response", response.results)
                setDestination(response.results)

            })
            .catch(err => console.error("Error", err));

    }, [query]);

    // This function is used to insert the user picked location (latitude, longitude) into the location state

    const selectLocation = ({ latitude, longitude }, name) => {
        setLocation({ ...location, latitude, longitude })
        setPlacesBox(false);
        setPlaceName(name);
        console.log("location after", location)
        // setLocationListView(false)
    }
    console.log("Place Name", placeName);

    const navigateAndSendData = () => {
        navigation.navigate('Car Selection', {

            userDestination: userDestination,
            placeName: placeName,
            userLatitude: userLatitude,
            userLongitude: userLongitude
        })
    }

    // console.log("The destination", destination);

    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.inner} >

                    <MapView style={styles.map} region={location} loadingEnabled={true} >
                        <Marker
                            coordinate={location}
                            title={'Destination'}
                            description={'Place where you are going'}
                        />
                    </MapView>

                    <TextInput style={styles.searchBar} cursorColor="black" placeholder='Search' onChangeText={(text) => searchPlaces(text)}>

                    </TextInput>

                   
                    {placesBox &&
                        <View style={styles.placesList} >
                            <FlatList
                                data={destination}
                                renderItem={({ item }) =>
                                    <TouchableHighlight
                                        activeOpacity={0.5}
                                        underlayColor={'#99ccff'}
                                        onPress={() => selectLocation(item.geocodes.main, item.name)}>
                                        <View style={styles.placesNameBox} >
                                            <Text style={styles.placesNames}>{item.name}</Text>
                                        </View>
                                    </TouchableHighlight>
                                }
                            />
                        </View>

                    }
                   

                    <View style={styles.pickupBtnContainer} >
                        <TouchableOpacity style={styles.pickupBtn} onPress={navigateAndSendData}  >
                            <Text style={{ fontSize: 19, }} >Confirm Destination</Text>
                        </TouchableOpacity>
                    </View>

                </View >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252526',
    },
    inner: {
        flex: 1,
        justifyContent: 'space-between',
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
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30,
        // padding: 5,
        paddingLeft: 20,
        fontSize: 20,
        
    },
    placesList: {
        width: '90%',
        height: '56%',
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: 73,
        marginLeft: '5%',
        marginRight: '5%',
        borderWidth: 2,
        borderColor: '#00e600',
        borderRadius: 8,
        // shadowColor: 'black',
    },
    placesNameBox: {
        width: '90%',
        height: 35,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 5,
        marginLeft: '5%',
        marginRight: '5%',
    },
    placesNames: {
        fontSize: 25,
    },
    pickupBtnContainer: {
        // flex: 1,
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