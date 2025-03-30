import PosterCarousel from "@/components/PosterCarousel";
import SearchBar from "@/components/SearchBar";
import { MODE, PARTY } from "@/constants/enums";
import { fetchMoviesintheQueue } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const QueueGames = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: allQueuedGames,
    loading: gamesLoading,
    error: gamesError,
    refetch,
  } = useFetch(fetchMoviesintheQueue);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );
  const soloQueueMovies = allQueuedGames?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.SOLO
  );

  const friendQueueMovies = allQueuedGames?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.FRIENDS
  );

  const familyQueueMovies = allQueuedGames?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.FAMILY
  );

  const christineQueueMovies = allQueuedGames?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.CHRISTINE
  );
  console.log(allQueuedGames);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        className="flex-1 px-5 mb-32"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {gamesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : gamesError ? (
          <Text>Error: {gamesError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search/search-movies")}
              placeholder="Search for a movie"
            />
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              In The Queue
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QueueGames;
