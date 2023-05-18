import React, { useState } from 'react';
import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Polyline } from "react-native-maps";

function CarSelection({ route, navigation }) {

    const [vehicle, setVehicle] = useState("");

    // These states for conditional styling
    const [vehicleActive, setVehicleActive] = useState(true);
    const [carMiniActive, setCarMiniActive] = useState(true);
    const [bikeActive, setBikeActive] = useState(true);
    const [rickshawActive, setRickshawActive] = useState(true);

    const selectedVehicle = vehicle;

    const { userDestination, placeName, userLongitude, userLatitude } = route.params;
    console.log("User Destination", userDestination);
    console.log("Place Name", placeName);

    const destLongitude = userDestination.longitude;
    const destLatitude = userDestination.latitude;

    console.log("destLongitude===>", destLongitude)
    console.log("destLatitude===>", destLatitude)

    const location = {
        latitude: 24.8952922,
        longitude: 67.0823298,
        longitudeDelta: 0.222,
        latitudeDelta: 0.222,

    }

    const userLocation = {
        longitude: userLongitude,
        latitude: userLatitude,
        longitudeDelta: 0.122,
        latitudeDelta: 0.122,
    }

    const destinationLocation = {
        longitude: destLongitude,
        latitude: destLatitude,
        longitudeDelta: 1.002,
        latitudeDelta: 1.002,
    }
    // const carIcon = "https://cdn-icons-png.flaticon.com/512/3202/3202926.png";

    //vehicleActive ? styles.bigCarIcon : styles.bigCarIconActive
    // style={vehicleActive ? styles.bigCarBox : styles.bigCarBoxActive} 
    //style={styles.bigCarBox} 

    console.log("Vehicle", vehicle);

    const activeStyling = () => {
        setVehicle("Car AC");
        setCarMiniActive(true);
        setBikeActive(true);
        setRickshawActive(true);
        setVehicleActive(false);
    }

    const activeStylingMini = () => {
        setVehicle("Car Mini");
        setVehicleActive(true);
        setBikeActive(true);
        setRickshawActive(true);
        setCarMiniActive(false);
    }

    const activeStylingBike = () => {
        setVehicle("Bike");
        setVehicleActive(true);
        setCarMiniActive(true);
        setRickshawActive(true);
        setBikeActive(false);

    }

    const activeStylingRickshaw = () => {
        setVehicle("Rickshaw");
        setVehicleActive(true);
        setCarMiniActive(true);
        setBikeActive(true);
        setRickshawActive(false);
    }

    return (
        <View style={styles.container} >
            <MapView style={styles.map} region={location} loadingEnabled={true} >
                <Marker
                    coordinate={userLocation}
                    title={'Pickup'}
                    description={'Your current location'}
                />

                <Polyline
                    coordinates={[userLocation, destinationLocation]} //specify our coordinates
                    strokeColor={"#1a8cff"}
                    strokeWidth={5}
                // lineDashPattern={[1]}
                />

                <Marker
                    coordinate={destinationLocation}
                    title={'Destination'}
                    description={'Place where you are going'}
                />
            </MapView>

            <View style={styles.vehicleBox} >
                <View style={styles.carsBox} >
                    <View style={vehicleActive ? styles.bigCarBox : styles.bigCarBoxActive} onTouchStart={activeStyling} >
                        <Image style={styles.bigCarIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/512/9175/9175833.png" }} />
                        <Text style={styles.vehicleNames} >Car AC</Text>
                    </View>

                    <View style={carMiniActive ? styles.smallCarBox : styles.smallCarBoxActive} onTouchStart={activeStylingMini} >
                        <Image style={styles.smallCarIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png" }} />
                        <Text style={styles.vehicleNames} >Car Mini</Text>
                    </View>

                    <View style={bikeActive ? styles.bikeBox : styles.bikeBoxActive} onTouchStart={activeStylingBike}  >
                        <Image style={styles.bikeIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1168/1168041.png" }} />
                        <Text style={styles.vehicleNames} >Bike</Text>
                    </View>

                    <View style={rickshawActive ? styles.autoBox : styles.autoBoxActive} onTouchStart={activeStylingRickshaw}  >
                        <Image style={styles.autoIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3790/3790389.png" }} />
                        <Text style={styles.vehicleNames} >Rickshaw</Text>
                    </View>

                    {/* <View style={styles.parent} >
                        <View>
                            <Text>This is box 1</Text>
                        </View>

                        <View>
                            <Text>This is box 2</Text>
                        </View>
                    </View> */}

                </View>

                <View style={styles.pickupBtnContainer} >
                    <TouchableOpacity style={styles.pickupBtn} onPress={() => navigation.navigate('Ride Info', {
                        placeName: placeName,
                        selectedVehicle: selectedVehicle,
                        userLongitude: userLongitude,
                        userLatitude: userLatitude,
                        destLatitude: destLatitude,
                        destLongitude: destLongitude,
                    })}  >
                        <Text style={{ fontSize: 19, }} >Vehicle Selected</Text>
                    </TouchableOpacity>
                </View>

                {/* <Button size="lg" containerStyle={{ width: 100, height: 50, }} >Small</Button> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252526',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '50%',
    },
    vehicleBox: {
        width: '95%',
        height: '50%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    carsBox: {
        // flex: 0.5,
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginTop: 15,
        // borderWidth: 2,
        // position: 'relative',
        // display: 'inline',

    },
    bigCarBox: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'white',
    },
    bigCarBoxActive: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#1a8cff'
    },
    bigCarIcon: {
        width: '100%',
        height: '80%',
    },
    smallCarBox: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    smallCarBoxActive: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1a8cff',
    },
    smallCarIcon: {
        width: '100%',
        height: '90%',
    },
    // carsBox2: {
    //     width: '100%',
    //     height: '50%',
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    // },
    bikeBox: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bikeBoxActive: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#1a8cff',
    },
    bikeIcon: {
        width: '80%',
        height: '80%',
        // marginLeft: 2,
    },
    autoBox: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    autoBoxActive: {
        width: '23%',
        height: '43%',
        borderWidth: 2,
        borderColor: '#1a8cff',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#1a8cff',

    },
    autoIcon: {
        width: '80%',
        height: '80%',
        marginTop: 3,
        // marginLeft: 5,
    },
    vehicleNames: {
        fontSize: 15,
        marginBottom: 5,
    },
    pickupBtnContainer: {
        width: '100%',
        height: '20%',
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
    },
    exampleBtn: {
        width: 20,
        height: 20,
    },
    // parent: {
    //     width: '100%',
    //     height: 50,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }

})

export default CarSelection;