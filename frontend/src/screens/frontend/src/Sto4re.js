@@ -11,6 +11,9 @@ const initialState = {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
@@ -47,6 +50,7 @@ function reducer(state, action) {
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
@@ -57,6 +61,11 @@ function reducer(state, action) {
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
