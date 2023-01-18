import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { setPickupData } from '../../../store/actions/pickupActions';
import { useDispatch } from 'react-redux';

function PickupScreen({ navigation }) {

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [placesBox, setPlacesBox] = useState(false);
    const [placeName, setPlaceName] = useState("");
    const [pickup, setPickup] = useState([]);

    const searchPlaces = (text) => {
        setQuery(text);
        setPlacesBox(true);
    }
    // ========= Code to access the Current Location =========== //

    // const [location, setLocation] = useState(null)

    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    });

    const [dragLocation, setDragLocation] = useState({
        // latitude: 24.8960659,
        // longitude: 67.0545239,
        latitude: 24.9324548,
        longitude: 67.0869205,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.0012,
    })

    //24.9324548,67.0869205 Lucky One Mall LAt Long
    const [errorMsg, setErrorMsg] = useState(null);

    const currLocation = location;

    //24.8960659,67.0545239 Nationa Stadium Lat Long

    //For places Search
    // useEffect(() => {

    //     if (query == "") {
    //         setPlacesBox(false);
    //     }

    //     const { latitude, longitude } = location;

    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: 'fsq3YmyU2CvERiMkIOaa+4hZR3EMy0w1HinrEWAvZC/b9JQ='
    //         }
    //     };

    //     fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latitude}%2C${longitude}&radius=100000`, options)

    //         .then(response => response.json())
    //         .then(response => {
    //             console.log("For geocode response", response.results)
    //             // setPickup(response.results)
    //             setDragLocation(response.results)




    //         })
    //         .catch(err => console.error("Error", err));

    // }, [query]);

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
                setPickup(response.results)
                console.log("For geocode response", response.results)

            })
            .catch(err => console.error("Error", err));

    }, [query]);

    const selectLocation = ({ latitude, longitude }, name) => {
        // setLocation({ ...location, latitude, longitude })
        setDragLocation({ ...dragLocation, latitude, longitude })
        setPlacesBox(false);
        setPlaceName(name);
        console.log("Drag location", dragLocation)
        // setLocationListView(false)
    }
    // console.log("Place Name", placeName);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ ...location, latitude, longitude });
            // setDragLocation({ ...dragLocation, latitude, longitude })
            // console.log("Coords===>", coords)


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

    console.log("current location ====>", location);
    // console.log("This is location ======>", location)

    return (
        <View style={styles.container} >

            <MapView style={styles.map} region={location} >

                <Marker
                    coordinate={location}
                    title={'Pickup'}
                    description={'Your current location'}
                    pinColor={'green'}

                />

                <Marker

                    draggable
                    coordinate={dragLocation}
                    title={'Pickup'}
                    description={'Your current location'}
                    onDragEnd={e => {
                        console.log('Drag ===>', e.nativeEvent.coordinate)
                    }}
                // style={{ width: 100, height: 50 }}
                // image={require('../../../assets/lo.png')}

                />
            </MapView>
            <TextInput style={styles.searchBar} cursorColor="black" placeholder='Search' onChangeText={(text) => searchPlaces(text)}>
            </TextInput>

            <>
                {placesBox &&
                    <View style={styles.placesList} >
                        <FlatList
                            data={pickup}
                            renderItem={({ item }) =>
                                <TouchableHighlight
                                    activeOpacity={0.5}
                                    underlayColor={'grey'}
                                    onPress={() => selectLocation(item.geocodes.main, item.name)}>
                                    <View style={styles.placesNameBox} >
                                        <Text style={styles.placesNames}>{item.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />
                    </View>

                }
            </>


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
        fontSize: 18,

    },
    dragIcon: {
        width: 30,
        height: 30,
    },
    placesList: {
        width: '90%',
        height: '40%',
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
