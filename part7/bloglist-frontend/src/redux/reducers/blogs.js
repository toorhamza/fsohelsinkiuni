export default function blogs(state = [], action) {
  switch (action.type) {
    case "ALL_BLOGS":
      state = action.data;
      return state;
    case "ADD_BLOG":
      return state.concat(action.data);
    case "DEL_BLOG":
      state = state.filter((b) => b.id !== action.id);
      return state;
    case "LIKE_BLOG":
      state = state.map((b) =>
        b.id === action.id ? { ...b, likes: b.likes + 1 } : b
      );
      return state;
    default:
      return state;
  }
}
