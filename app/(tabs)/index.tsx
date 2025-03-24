import SearchBar from "@/components/SearchBar";
import ShowsCarousel from "@/components/ShowsCarousel";

import { PARTY } from "@/constants/enums";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchShowsintheQueue } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
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

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <View className="bg-primary flex-1">
      {/* <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      /> */}
      <ScrollView
        className="flex-1 px-5 mb-32"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Image source={icons.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" /> */}
        {showsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : showsError ? (
          <Text>Error: {showsError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a TV show"
            />
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              In The Queue
            </Text>

            <ShowsCarousel
              shows={soloQueueShows}
              sectionTitle={`${PARTY.SOLO} Queue`}
            />
            <ShowsCarousel
              shows={friendQueueShows}
              sectionTitle={`${PARTY.FRIENDS} Queue`}
            />
            <ShowsCarousel
              shows={familyQueueShows}
              sectionTitle={`${PARTY.FAMILY} Queue`}
            />
            <ShowsCarousel
              shows={christineQueueShows}
              sectionTitle={`${PARTY.CHRISTINE} Queue`}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
