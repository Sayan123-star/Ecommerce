import {createStore, combineReducers, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailReducer, ProductReducer, deleteProductReducer, delupProductReducer, newProductReducer } from "./reducers/Product.reducer";
import { UserReducer, allUsersReducer, oneUserReducer, profileReducer } from "./reducers/userreducer";
import { cartReducer } from "./reducers/cart.reducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderReducer, ordersDetailsReducer } from "./reducers/order.reducer";

const reducer = combineReducers({
    products: ProductReducer,
    productDetail: ProductDetailReducer,
    user:UserReducer,
    profile:profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: ordersDetailsReducer,
    newProduct: newProductReducer,
    delupProduct:delupProductReducer,
    getAllOrders:allOrdersReducer,
    order:orderReducer, 
    allUsers: allUsersReducer,
    userDetail: oneUserReducer,
})

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
}

const middleware = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

