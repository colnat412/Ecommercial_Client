import { StackScreenNavigationProp } from "@/src/libs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { DismissKeyboardView } from "../components";
import { ScrollView, View } from "react-native";
import { colors, style } from "@/src/constants";
import { Brand } from "@/src/assets";
import { Button, Text, TextInput } from "react-native-paper";
import { GoBack } from "../navigation/components";



export const Register = () => {
    const [error, setError] = useState('');

    const navigation = useNavigation<StackScreenNavigationProp>();

    return (
        <DismissKeyboardView>
            <ScrollView style={{marginTop: 32}}>
                <View style={[style.centerContainer, style.body]}>
                    <GoBack />
                    <View style={[style.columnCenter, { marginTop: 32 }]}>
                        <View style={{ gap: 10, marginBottom: 32, width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>

                            <Text style={{ color: colors.brand, fontSize: 30, fontWeight: "bold" }}>Register</Text>
                        </View>

                        <View style={[style.columnCenter]}>
                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Fullname"
                                    style={[style.textInput]}
                                    mode="outlined"
                                />
                            </View>

                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Username"
                                    style={[style.textInput]}
                                    mode="outlined"
                                />
                            </View>

                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Email"
                                    style={[style.textInput]}
                                    mode="outlined"
                                />
                            </View>

                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Password"
                                    style={[style.textInput]}
                                    mode="outlined"
                                    secureTextEntry={true}
                                />
                            </View>

                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Phone"
                                    style={[style.textInput]}
                                    mode="outlined"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={[style.columnCenter]}>
                                {error && <Text>{error}</Text>}
                                <TextInput
                                    label="Address"
                                    style={[style.textInput]}
                                    mode="outlined"
                                />
                            </View>

                        </View>
                        <Button
                            onPress={() => { }}
                            style={[style.button, { marginTop: 16 }]}
                            mode="contained"
                            textColor={colors.textBrand}
                        >
                            Register
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </DismissKeyboardView>
    );
}

