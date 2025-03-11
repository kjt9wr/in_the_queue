import TVShowCard from "@/components/TVShowCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchAllShows } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Watching = () => {
  const router = useRouter();

  const {
    data: shows,
    loading: showsLoading,
    error: showsError,
  } = useFetch(() => fetchAllShows());

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {showsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : showsError ? (
          <Text>Error: {showsError?.message}</Text>
        ) : (
          <View>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Watching Now
              </Text>
              <FlatList
                data={shows}
                renderItem={({ item }) => <TVShowCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Watching;
