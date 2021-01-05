export default function notification(state = null, action) {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        state = action.data
        return state 
      case 'DEL_NOTIFICATION':
        state = null
        return state
      default:
        return state
    }
  }