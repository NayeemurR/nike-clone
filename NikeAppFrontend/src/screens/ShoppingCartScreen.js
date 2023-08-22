import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
  cartSlice,
} from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>${total}</Text>
      </View>
    </View>
  );
};

const ShoppingCartScreen = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: "Vadim",
        address: "My Home",
        email: "vadim@notjust.dev",
      },
    });

    if (result.data?.status === "ok") {
      console.log(result.data);
      Alert.alert(
        "Order has been submitted",
        `Your order reference is ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        style={styles.items}
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <TouchableOpacity
        onPress={onCreateOrder}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Checkout
          {isLoading && <ActivityIndicator />}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  items: {
    flex: 1,
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    marginBottom: 30,
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShoppingCartScreen;
