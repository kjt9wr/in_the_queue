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

const QueueMovies = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: allQueuedMovies,
    loading: showsLoading,
    error: showsError,
    refetch,
  } = useFetch(fetchMoviesintheQueue);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );
  const soloQueueMovies = allQueuedMovies?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.SOLO
  );

  const friendQueueMovies = allQueuedMovies?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.FRIENDS
  );

  const familyQueueMovies = allQueuedMovies?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.FAMILY
  );

  const christineQueueMovies = allQueuedMovies?.filter(
    (movie: MovieFromDB) => movie.party === PARTY.CHRISTINE
  );

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
        {showsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : showsError ? (
          <Text>Error: {showsError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search/search-movies")}
              placeholder="Search for a movie"
            />
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              In The Queue
            </Text>

            <PosterCarousel
              movies={soloQueueMovies}
              sectionTitle={`${PARTY.SOLO} Queue`}
              mode={MODE.MOVIES}
            />
            <PosterCarousel
              movies={friendQueueMovies}
              sectionTitle={`${PARTY.FRIENDS} Queue`}
              mode={MODE.MOVIES}
            />
            <PosterCarousel
              movies={familyQueueMovies}
              sectionTitle={`${PARTY.FAMILY} Queue`}
              mode={MODE.MOVIES}
            />
            <PosterCarousel
              movies={christineQueueMovies}
              sectionTitle={`${PARTY.CHRISTINE} Queue`}
              mode={MODE.MOVIES}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QueueMovies;
