export default function reducer(state = {}, action) {
    console.log('data inside reducer', action.data)
    switch (action.type) {
        case 'SET_DATA': return { ...state, pickupData: action.data }
        case 'REMOVE_THEME': return { ...state, theme: null }
        default: return state
    }
}
