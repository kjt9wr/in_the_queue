import { icons } from "@/constants/icons";
import { fetchSingleMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieActions from "./MovieActions";
import { MOVIE_RELEASE_STATUS } from "@/constants/enums";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchSingleMovieDetails(id as string)
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {!loading && (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.name}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {`${movie?.release_date?.split("-")[0]}`}
              </Text>
            </View>
            {movie?.status === MOVIE_RELEASE_STATUS.RELEASED && (
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />

                <Text className="text-white font-bold text-sm">
                  {Math.round(movie?.vote_average * 10) / 10}/10
                </Text>

                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count} votes)
                </Text>
              </View>
            )}
            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movie?.genres?.map((g: any) => g.name).join(" • ") || "N/A"
              }
            />
          </View>
          {movie && <MovieActions movie={movie} loading={loading} />}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MovieDetails;
