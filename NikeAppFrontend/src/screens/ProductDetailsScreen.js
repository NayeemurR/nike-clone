import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;

  const { data, isLoading, error } = useGetProductQuery(id);
  const product = data?.data;

  // const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    Alert.alert("Success", "Product added to cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching product {error.error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width, aspectRatio: 1 }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        {/* <View style={{ padding: 20 }}> */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <TouchableOpacity
        onPress={addToCart}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
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

export default ProductDetailsScreen;
