import PosterCarousel from "@/components/PosterCarousel";
import { MODE, PARTY } from "@/constants/enums";
import { fetchPlayingNow } from "@/services/appwrite";
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

const PlayingGames = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: allQueuedGames,
    loading: gamesLoading,
    error: gamesError,
    refetch,
  } = useFetch(fetchPlayingNow);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );
  const soloGames = allQueuedGames?.filter(
    (game: VideoGameFromDB) => game.party === PARTY.SOLO
  );

  const friendGames = allQueuedGames?.filter(
    (game: VideoGameFromDB) => game.party === PARTY.FRIENDS
  );

  const familyGames = allQueuedGames?.filter(
    (game: VideoGameFromDB) => game.party === PARTY.FAMILY
  );

  const christineGames = allQueuedGames?.filter(
    (game: VideoGameFromDB) => game.party === PARTY.CHRISTINE
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
        {gamesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : gamesError ? (
          <Text className="text-white">Error: {gamesError?.message}</Text>
        ) : (
          <View>
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              Playing Now
            </Text>

            <PosterCarousel
              games={soloGames}
              sectionTitle={`Playing ${PARTY.SOLO}`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={christineGames}
              sectionTitle={`Playing with ${PARTY.CHRISTINE}`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={friendGames}
              sectionTitle={`Playing with ${PARTY.FRIENDS}`}
              mode={MODE.VIDEO_GAMES}
            />
            <PosterCarousel
              games={familyGames}
              sectionTitle={`Playing with ${PARTY.FAMILY}`}
              mode={MODE.VIDEO_GAMES}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PlayingGames;
