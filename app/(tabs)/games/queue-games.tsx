import PosterCarousel from "@/components/PosterCarousel";
import SearchBar from "@/components/SearchBar";
import { MODE, PARTY } from "@/constants/enums";
import { fetchGamesintheQueue, fetchMoviesintheQueue } from "@/services/api";
import { fetchCoverArt, fetchGameDetails } from "@/services/igdm";
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
  } = useFetch(fetchGamesintheQueue);

  const { data: singleGameData } = useFetch(() => fetchGameDetails(136625));
  const { data: coverArtData } = useFetch(() => fetchCoverArt(114879));

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );
  const soloQueueGames = allQueuedGames?.filter(
    (movie: VideoGameFromDB) => movie.party === PARTY.SOLO
  );

  const friendQueueGames = allQueuedGames?.filter(
    (movie: VideoGameFromDB) => movie.party === PARTY.FRIENDS
  );

  const familyQueueGames = allQueuedGames?.filter(
    (movie: VideoGameFromDB) => movie.party === PARTY.FAMILY
  );

  const christineQueueGames = allQueuedGames?.filter(
    (movie: VideoGameFromDB) => movie.party === PARTY.CHRISTINE
  );
  console.log(allQueuedGames);

  console.log(singleGameData);
  console.log(coverArtData);

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
              placeholder="Search for a video game"
            />
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              In The Queue
            </Text>

            <PosterCarousel
              games={soloQueueGames}
              sectionTitle={`${PARTY.SOLO} Queue`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={friendQueueGames}
              sectionTitle={`${PARTY.FRIENDS} Queue`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={familyQueueGames}
              sectionTitle={`${PARTY.FAMILY} Queue`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={christineQueueGames}
              sectionTitle={`${PARTY.CHRISTINE} Queue`}
              mode={MODE.VIDEO_GAMES}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QueueGames;
