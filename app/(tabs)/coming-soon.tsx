import TVShowCard from "@/components/TVShowCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchComingSoonShowsDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const ComingSoon = () => {
  const {
    data: detailedShows,
    loading: detailsLoading,
    error: detailsError,
    refetch,
  } = useFetch(fetchComingSoonShowsDetails);

  const [refreshing, setRefreshing] = useState(false);
  const releaseDatedShows = detailedShows?.filter(
    (tvShow: TVShow) => tvShow.next_episode_to_air
  );

  const awaitingReturnShows = detailedShows?.filter(
    (tvShow: TVShow) =>
      !tvShow.next_episode_to_air && tvShow.status === "Returning Series"
  );

  const showsInLimbo = detailedShows?.filter(
    (tvShow: TVShow) =>
      !tvShow.next_episode_to_air && tvShow.status !== "Returning Series"
  );

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image source={icons.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" />
        {detailsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : detailsError ? (
          <Text>Error: {detailsError?.message}</Text>
        ) : (
          <View>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Coming Soon
              </Text>
              <FlatList
                data={releaseDatedShows}
                renderItem={({ item }) => <TVShowCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-12"
                scrollEnabled={false}
              />
            </>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Awaiting New Season
              </Text>
              <FlatList
                data={awaitingReturnShows}
                renderItem={({ item }) => <TVShowCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-12"
                scrollEnabled={false}
              />
            </>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Uncertain Futures or Awaiting Movies
              </Text>
              <FlatList
                data={showsInLimbo}
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

export default ComingSoon;
