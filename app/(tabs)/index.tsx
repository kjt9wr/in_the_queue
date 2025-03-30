import PosterCarousel from "@/components/PosterCarousel";
import SearchBar from "@/components/SearchBar";

import { MODE, PARTY } from "@/constants/enums";
import { fetchShowsintheQueue } from "@/services/api";
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

const Index = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: allQueuedShows,
    loading: showsLoading,
    error: showsError,
    refetch,
  } = useFetch(fetchShowsintheQueue);

  const { data: singleGameData } = useFetch(() => fetchGameDetails(284716));
  const { data: coverArtData } = useFetch(() => fetchCoverArt(388752));
  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );

  const soloQueueShows = allQueuedShows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.SOLO
  );

  const friendQueueShows = allQueuedShows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.FRIENDS
  );

  const familyQueueShows = allQueuedShows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.FAMILY
  );

  const christineQueueShows = allQueuedShows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.CHRISTINE
  );

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
        {showsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : showsError ? (
          <Text>Error: {showsError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search/search-series")}
              placeholder="Search for a TV show"
            />
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              In The Queue
            </Text>

            <PosterCarousel
              shows={soloQueueShows}
              sectionTitle={`${PARTY.SOLO} Queue`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={friendQueueShows}
              sectionTitle={`${PARTY.FRIENDS} Queue`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={familyQueueShows}
              sectionTitle={`${PARTY.FAMILY} Queue`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={christineQueueShows}
              sectionTitle={`${PARTY.CHRISTINE} Queue`}
              mode={MODE.TV_SHOWS}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
