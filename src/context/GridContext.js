import React, { createContext, useReducer } from "react";
import GridContextReducer from "./GridContextReducer";

//inital state
const initState = {
  grid__images: [],
  grid__filteredImages: [],
  grid__navSelectorState: "fresh",
};

//create context
export const GridContext = createContext(initState);

//context provider
const GridContextProvider = (props) => {
  const [state, dispatch] = useReducer(GridContextReducer, initState);

  const storeFetchedImages = (images) => {
    dispatch({
      type: "STORE_FETCHED_IMAGES",
      images,
    });
  };

  const storeFilteredImages = (images) => {
    dispatch({
      type: "STORE_FILTERED_IMAGES",
      images,
    });
  };

  const changeNavSelector = (navSelector) => {
    dispatch({
      type: "CHANGE_NAV_SELECTOR",
      navSelector,
    });
  };

  return (
    <GridContext.Provider
      value={{
        gridState: state,
        storeFetchedImages,
        storeFilteredImages,
        changeNavSelector,
      }}
    >
      {props.children}
    </GridContext.Provider>
  );
};

export default GridContextProvider;
