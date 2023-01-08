import React from "react";
import { View, StyleSheet, Text, T } from 'react-native';

function Summary() {

    return (
        <View style={styles.container} >
            <Text>Summary</Text>

            {/* <View style={styles.pickupBtnContainer} >
                <TouchableOpacity style={styles.pickupBtn} onPress={() => {
                    navigation.navigate('Summary')
                }}  >
                    <Text style={{ fontSize: 19, }} >Confirm Pickup</Text>
                </TouchableOpacity>
            </View> */}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // pickupBtnContainer: {
    //     width: '100%',
    //     height: '10%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',

    // },
    // pickupBtn: {

    //     width: '95%',
    //     height: '80%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 10,
    //     backgroundColor: '#00e600',
    // }
})

export default Summary;