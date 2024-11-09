import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboardView = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
