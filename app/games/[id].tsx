import { MOVIE_RELEASE_STATUS, PlatformsById } from "@/constants/enums";
import { icons } from "@/constants/icons";
import { fetchSingleVideoGameDetails } from "@/services/api";
import { formatDate } from "@/services/helpers";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface VideoGameInfoProps {
  label: string;
  value?: string | number | null;
}

const VideoGameInfo = ({ label, value }: VideoGameInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const VideoGameDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: selectedGame, loading } = useFetch(() =>
    fetchSingleVideoGameDetails(id as string)
  );

  let releaseYear;
  if (!loading && selectedGame && selectedGame.first_release_date) {
    releaseYear = formatDate(selectedGame?.first_release_date)?.split("-")[0];
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {!loading && (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://images.igdb.com/igdb/image/upload/t_720p/${selectedGame?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">
              {selectedGame?.name}
            </Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">{releaseYear}</Text>
            </View>
            {selectedGame?.status === MOVIE_RELEASE_STATUS.RELEASED && (
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />

                <Text className="text-white font-bold text-sm">
                  {Math.round(selectedGame?.rating * 10) / 10}/10
                </Text>
              </View>
            )}
            <VideoGameInfo label="Overview" value={selectedGame?.summary} />

            <VideoGameInfo
              label="Platforms"
              value={
                selectedGame?.platforms
                  .map((platform_id: number) => PlatformsById[platform_id])
                  .join(" • ") || "N/A"
              }
            />
          </View>
          {/* {movie && <MovieActions movie={movie} loading={loading} />} */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default VideoGameDetails;
