import TVShowCard from "@/components/Cards/TVShowCard";
import { RELEASE_STATUS, VIEWING_STATUS } from "@/constants/enums";
import { fetchComingSoonShowsDetails } from "@/services/api";
import { updateShow } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );

  useEffect(() => {
    releaseDatedShows?.forEach((show: TVShow) => {
      if (show.next_episode_to_air!.episode_number > 1) {
        const showToAdd: ShowFromDB = {
          name: show.name,
          Release_Status: RELEASE_STATUS.AIRING,
          Party: show.party,
          Viewing_Status: VIEWING_STATUS.QUEUE,
          TMDB_ID: show.id,
        };
        try {
          updateShow(showToAdd);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, [releaseDatedShows]);

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
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
