import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl">In The Queue</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Go To Profile
      </Link>
    </View>
  );
}
