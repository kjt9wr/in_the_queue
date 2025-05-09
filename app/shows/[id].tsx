import { icons } from "@/constants/icons";
import { fetchSingleShowDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SeriesActions from "./SeriesActions";

interface ShowInfoProps {
  label: string;
  value?: string | number | null;
}

const ShowInfo = ({ label, value }: ShowInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
const displaySeasons = (num: number) => {
  return num == 1 ? `1 Season` : `${num} Seasons`;
};

const ShowDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: show, loading } = useFetch(() =>
    fetchSingleShowDetails(id as string)
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {!loading && (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${show?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{show?.name}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {`${show?.first_air_date?.split("-")[0]} • ${displaySeasons(
                  show?.number_of_seasons
                )}`}
              </Text>
            </View>

            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />

              <Text className="text-white font-bold text-sm">
                {Math.round(show?.vote_average * 10) / 10}/10
              </Text>

              <Text className="text-light-200 text-sm">
                ({show?.vote_count} votes)
              </Text>
            </View>
            <ShowInfo label="Overview" value={show?.overview} />
            <ShowInfo
              label="Genres"
              value={show?.genres?.map((g: any) => g.name).join(" • ") || "N/A"}
            />
            <ShowInfo
              label="Networks"
              value={
                show?.networks?.map((g: any) => g.name).join(" • ") || "N/A"
              }
            />
          </View>
          {show && (
            <SeriesActions
              show={show}
              loading={loading}
              status={show.view_status}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ShowDetails;
