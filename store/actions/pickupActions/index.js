
function setPickupData(pickupData) {
    console.log('theme inside setTheme action', pickupData)
    return {
        type: 'SET_DATA',
        data: pickupData
    }
}

export {
    setPickupData
}