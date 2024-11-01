import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingIndex = state.findIndex(
        (item) => item.id === action.id && item.size === action.size
      );

      if (existingIndex >= 0) {
        const updatedState = [...state];
        updatedState[existingIndex] = {
          ...state[existingIndex],
          qty: state[existingIndex].qty + action.qty,
          price: state[existingIndex].price + action.price,
        };
        return updatedState;
      } else {
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
          },
        ];
      }

    case "REMOVE":
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      return [];

    case "UPDATE":
      const updatedArray = state.map((item) =>
        item.id === action.id && item.size === action.size
          ? {
              ...item,
              qty: item.qty + action.qty,
              price: item.price + action.price,
            }
          : item
      );
      return updatedArray;

    default:
      console.log("Error in Reducer");
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;

const useCart = () => useContext(CartStateContext);
const useDispatchCart = () => useContext(CartDispatchContext);

export { useCart, useDispatchCart };
