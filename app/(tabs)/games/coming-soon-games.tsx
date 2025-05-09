import VideoGameCard from "@/components/Cards/VideoGameCard";
import { PLAY_STATUS, RELEASE_STATUS } from "@/constants/enums";
import { fetchComingSoonVideoGamesDetails } from "@/services/api";
import { updateVideoGame } from "@/services/appwrite";
import { gameIsReleased } from "@/services/helpers";
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

const ComingSoonGames = () => {
  const {
    data: detailedGames,
    loading: detailsLoading,
    error: detailsError,
    refetch,
  } = useFetch(fetchComingSoonVideoGamesDetails);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );

  useEffect(() => {
    detailedGames?.forEach((game: VideoGame) => {
      if (gameIsReleased(game)) {
        const videoGameToAdd: VideoGameFromDB = {
          name: game.name,
          release_status: RELEASE_STATUS.RELEASED,
          party: game.party,
          play_status: PLAY_STATUS.QUEUE,
          IGDB_ID: game.id,
          owned: game.owned || false,
        };
        try {
          updateVideoGame(videoGameToAdd);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, [detailedGames]);

  const sortedGames = detailedGames
    ?.filter((game: VideoGame) => game.first_release_date)
    .sort((a: VideoGame, b: VideoGame) => {
      if (a.first_release_date < b.first_release_date) return -1;
      if (a.first_release_date > b.first_release_date) return 1;
      return 0;
    });

  const gamesWithoutReleaseDate = detailedGames?.filter(
    (game: VideoGame) => !game.first_release_date
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
          <Text className="text-white">Error: {detailsError?.message}</Text>
        ) : (
          <>
            <View>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Coming Soon
              </Text>
              <FlatList
                data={sortedGames}
                renderItem={({ item }) => <VideoGameCard {...item} />}
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
            </View>
            <View>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Release Date Unknown
              </Text>
              <FlatList
                data={gamesWithoutReleaseDate}
                renderItem={({ item }) => <VideoGameCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-28"
                scrollEnabled={false}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ComingSoonGames;
