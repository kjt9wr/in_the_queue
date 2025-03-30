import VideoGameCard from "@/components/Cards/VideoGameCard";
import { fetchComingSoonVideoGamesDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
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

  // useEffect(() => {
  //   detailedMovies?.forEach((movie: Movie) => {
  //     if (movie.status === MOVIE_RELEASE_STATUS.RELEASED) {
  //       const movieToAdd: MovieFromDB = {
  //         name: movie.title,
  //         release_status: MOVIE_RELEASE_STATUS.RELEASED,
  //         party: movie.party,
  //         viewing_status: VIEWING_STATUS.QUEUE,
  //         TMDB_ID: movie.id,
  //       };
  //       try {
  //         updateMovie(movieToAdd);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   });
  // }, [detailedMovies]);

  // const sortedMovies = detailedMovies
  //   ?.filter((movie: Movie) => movie.release_date)
  //   .sort((a: Movie, b: Movie) => {
  //     if (a.release_date < b.release_date) return -1;
  //     if (a.release_date > b.release_date) return 1;
  //     return 0;
  //   });

  // const noReleaseDate = detailedMovies?.filter(
  //   (movie: Movie) => !movie.release_date
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  console.log(detailedGames);

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
            <Text className="text-2xl text-white font-bold mt-5 mb-3">
              Coming Soon
            </Text>
            <FlatList
              data={detailedGames}
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
        )}
      </ScrollView>
    </View>
  );
};

export default ComingSoonGames;
