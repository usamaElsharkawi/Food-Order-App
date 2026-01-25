// Hello Gemini in this file we will build a cart context
// what i wanna you to do is to follow  the instructions that in the lines that begining with "Gemini>>" (focus on this lines )



// Gemini>> 1- import the createContext function from the react library
// Gemini>> 2- create a cart context with a intial state of {itme:[] , addItem:()=>{},removeItem:()=>{}}
// Gemini>> 3- Export the cart context as default export
// Gemini>> 4- create a CartContextProvider component that will wrap the app and provide the cart context
//       -inside the CartContextProvider component we will use the useReducer hook to manage its state that will be the value of the cart context 
//       --the reducer function will listen to two actions "ADD_ITEM" and "REMOVE_ITEM"
//       ---ADD-ITEM:
//       ----if the item is already in the cart then increase the quantity
//       ----if the item is not in the cart then add it to the cart with quantity 1
//       ---REMOVE-ITEM:
//       ----remove the item from the cart if the quantity is 1
//       ----decrease the quantity of the item if the quantity is more than 1
//       --return the new state in immutable way
// Gemini>> 5- Export the CartContextProvider as named export

import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Determine if the item already exists using findIndex (better performance than find for updates)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const updatedItems = [...state.items]; // Create a copy of the array (Immutability Step 1)

    if (existingCartItemIndex > -1) {
      // Item exists: Update quantity
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      }; // Create a copy of the object (Immutability Step 2)
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Item is new: Add to array with quantity 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // Remove the item completely
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Decrease quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }

  const cartContext = {
    items: cartState.items,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
