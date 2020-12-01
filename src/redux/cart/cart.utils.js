export const addItemToCart = (cartItems, cartItemToAdd) => {
  const exsitingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (exsitingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const exsitingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (exsitingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
