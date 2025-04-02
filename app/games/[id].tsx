import { PlatformsById } from "@/constants/enums";
import { fetchSingleVideoGameDetails } from "@/services/api";
import { formatDate } from "@/services/helpers";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoGameActions from "./VideoGameActions";

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
    fetchSingleVideoGameDetails(Number(id))
  );

  let releaseYear;
  if (!loading && selectedGame && selectedGame.first_release_date) {
    releaseYear = formatDate(selectedGame?.first_release_date)?.split("-")[0];
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {!loading && selectedGame && (
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
            {selectedGame?.rating && (
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Text className="text-white font-bold text-sm">
                  Rating: {Math.round(selectedGame?.rating * 10) / 10}/100
                </Text>
              </View>
            )}
            <VideoGameInfo label="Summary" value={selectedGame?.summary} />

            <VideoGameInfo
              label="Platforms"
              value={
                selectedGame?.platforms
                  .map((platform_id: number) => PlatformsById[platform_id])
                  .join(" • ") || "N/A"
              }
            />
          </View>
          {selectedGame && (
            <VideoGameActions selectedGame={selectedGame} loading={loading} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default VideoGameDetails;
