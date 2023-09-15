export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  desc: "",
  shortTitle: "",
  shortDesc: "",
  cat: "",
  cover: "",
  deliveryTime: 0,
  revisionNumber: 0,
  price: 0,
  images: [],
  features: [],
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "DELETE_FEATURE":
      return {
        ...state,
        features: state.features.filter((f) => {
          return f !== action.payload;
        }),
      };
    default:
      return state;
  }
};
