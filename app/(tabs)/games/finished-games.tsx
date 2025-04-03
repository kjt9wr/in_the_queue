import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import VideoGameCard from "@/components/Cards/VideoGameCard";
import { fetchFinishedGames } from "@/services/api";

const FinishedGames = () => {
  const {
    data: games,
    loading: gamesLoading,
    error: gamesError,
    refetch,
  } = useFetch(fetchFinishedGames);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
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
        {gamesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : gamesError ? (
          <Text className="text-white">Error: {gamesError?.message}</Text>
        ) : (
          <View>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Finished
              </Text>
              <FlatList
                data={games}
                renderItem={({ item }) => <VideoGameCard {...item} />}
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

export default FinishedGames;
