export default function user(state = null, action) {
    switch (action.type) {
      case "SAVE_USER_DATA":
        state = action.data;
        return state;
        case "DEL_USER":
            state = null;
            return state;
      default:
        return state;
    }
  }
  