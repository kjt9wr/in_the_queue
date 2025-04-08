import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  iconStyles?: string;
  isLoading: boolean;
  icon: any;
}
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  iconStyles,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-full ${containerStyles} min-h-[62px] px-2 flex flex-row justify-center items-center  ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {icon && !isLoading && (
        <Image
          source={icon}
          className={`h-10 ${iconStyles}`}
          resizeMode="contain"
        />
      )}

      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className=""
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
