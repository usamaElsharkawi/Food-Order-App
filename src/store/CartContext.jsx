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

  const cartTotalAmount = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
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
    totalAmount: cartTotalAmount,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
