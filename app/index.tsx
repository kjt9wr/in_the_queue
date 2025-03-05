import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">In The Queue</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Go To Profile
      </Link>
    </View>
  );
}
