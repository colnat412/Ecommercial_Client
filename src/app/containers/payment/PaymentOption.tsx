import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ProductDetailHeader } from "../../navigation/components";
import PaymentProfile from "./PaymentProfile";
import { Line } from "../Line";
import { PaymentMethod } from "./PaymentMethod";

const PaymentOption = () => {
  return (
    <View style={styles.container}>
      <ProductDetailHeader title="Payment" />
      <View style={styles.priceText}>
        <Text style={{ fontSize: 26, letterSpacing: 3 }}>TOTAL</Text>
        <Text style={{ fontSize: 26, fontWeight: "bold", letterSpacing: 3 }}>
          $2.500
        </Text>
      </View>
      <Line />
      <PaymentProfile />
      <Line />
      <PaymentMethod />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 32, flexDirection: "column", gap: 10 },
  priceText: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PaymentOption;
