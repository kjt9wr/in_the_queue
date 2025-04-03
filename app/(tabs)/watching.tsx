import PosterCarousel from "@/components/PosterCarousel";
import { MODE, PARTY } from "@/constants/enums";
import { fetchWatchingNow } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const Watching = () => {
  const {
    data: shows,
    loading: showsLoading,
    error: showsError,
    refetch,
  } = useFetch(fetchWatchingNow);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );

  const soloShows = shows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.SOLO
  );

  const friendShows = shows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.FRIENDS
  );

  const familyShows = shows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.FAMILY
  );

  const christineShows = shows?.filter(
    (tvShow: ShowFromDB) => tvShow.Party === PARTY.CHRISTINE
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
          <Text className="text-white">Error: {showsError?.message}</Text>
        ) : (
          <View>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Watching Now
              </Text>
            </>
            <PosterCarousel
              shows={soloShows}
              sectionTitle={`Watching ${PARTY.SOLO}`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={christineShows}
              sectionTitle={`Watching with ${PARTY.CHRISTINE}`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={friendShows}
              sectionTitle={`Watching with ${PARTY.FRIENDS}`}
              mode={MODE.TV_SHOWS}
            />
            <PosterCarousel
              shows={familyShows}
              sectionTitle={`Watching with ${PARTY.FAMILY}`}
              mode={MODE.TV_SHOWS}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Watching;
