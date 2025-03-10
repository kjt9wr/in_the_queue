import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllShows } from "../../lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { fetchShows } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import TVShowCard from "@/components/TVShowCard";

const Index = () => {
  // const { data, refetch, isLoading } = useAppwrite(getAllShows);

  const router = useRouter();

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  const {
    data: shows,
    loading: showsLoading,
    error: showsError,
  } = useFetch(() => fetchShows({ query: "" }));

  // console.log(data);
  return (
    <SafeAreaView className="bg-primary h-full">
      <Image source={images.bg} className="absolute w-full z-0" />
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
                Watch List
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
              />
            </>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
