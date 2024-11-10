import { Home, User } from "@/src/assets";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const PaymentProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <User width={20} height={20} />
        <Text>Phung Anh Minh</Text>
      </View>
      <View style={styles.info}>
        <Home width={20} height={20} />
        <Text style={{ letterSpacing: 1 }}>100 Suoi Bac, Son Hoa, Phu Yen</Text>
      </View>
      <View style={styles.info}>
        <User width={20} height={20} />
        <Text style={{ letterSpacing: 1 }}>0123456789</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    padding: 16,
  },
  info: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default PaymentProfile;
