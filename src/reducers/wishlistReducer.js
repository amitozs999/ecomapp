let initialState = [];

//load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("wishlist")) {
    initialState = JSON.parse(localStorage.getItem("wishlist"));
  } else {
    initialState = [];
  }
}

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return action.payload;
    default:
      return state;
  }
};
