import MovieCard from "@/components/Cards/MovieCard";
import { RELEASE_STATUS, VIEW_STATUS } from "@/constants/enums";
import { fetchComingSoonMoviesDetails } from "@/services/api";
import { updateMovie } from "@/services/appwrite";
import { movieIsReleased } from "@/services/helpers";
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

const ComingSoonMovies = () => {
  const {
    data: detailedMovies,
    loading: detailsLoading,
    error: detailsError,
    refetch,
  } = useFetch(fetchComingSoonMoviesDetails);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = refetch();

      return () => fetchData;
    }, [])
  );

  useEffect(() => {
    detailedMovies?.forEach((movie: Movie) => {
      if (movieIsReleased(movie)) {
        const movieToAdd: MovieFromDB = {
          name: movie.title,
          release_status: RELEASE_STATUS.RELEASED,
          party: movie.party,
          view_status: VIEW_STATUS.QUEUE,
          TMDB_ID: movie.id,
        };
        try {
          updateMovie(movieToAdd);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, [detailedMovies]);

  const sortedMovies = detailedMovies
    ?.filter((movie: Movie) => movie.release_date)
    .sort((a: Movie, b: Movie) => {
      if (a.release_date < b.release_date) return -1;
      if (a.release_date > b.release_date) return 1;
      return 0;
    });

  const noReleaseDate = detailedMovies?.filter(
    (movie: Movie) => !movie.release_date
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
          <View>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Coming Soon
              </Text>
              <FlatList
                data={sortedMovies}
                renderItem={({ item }) => <MovieCard {...item} />}
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
            </>
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Release Date TBD
              </Text>
              <FlatList
                data={noReleaseDate}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-12 mb-10"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ComingSoonMovies;
