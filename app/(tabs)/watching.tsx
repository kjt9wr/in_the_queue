import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllShows } from "../../lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

const Watching = () => {
  const { data, refetch, isLoading } = useAppwrite(getAllShows);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(data);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.Name}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Watching Page
                </Text>
                <Text className="font-pmedium text-sm text-gray-100">
                  Shows
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Watching;
