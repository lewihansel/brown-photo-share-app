export default (state, action) => {
  console.log(action);
  switch (action.type) {
    case "STORE_FETCHED_IMAGES":
      return {
        ...state,
        grid__images: action.images,
        grid__filteredImages: action.images,
      };
    case "STORE_FILTERED_IMAGES":
      return {
        ...state,
        grid__filteredImages: action.images,
      };
    case "CHANGE_NAV_SELECTOR":
      return {
        ...state,
        grid__navSelectorState: action.navSelector,
      };
    default:
      return state;
  }
};
