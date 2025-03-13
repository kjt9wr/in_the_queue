import SearchBar from "@/components/SearchBar";
import ShowsWithParty from "@/components/ShowsWithParty";
import TVShowCard from "@/components/TVShowCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchShowsintheQueue } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Index = () => {
  const router = useRouter();

  const {
    data: allQueuedShows,
    loading: showsLoading,
    error: showsError,
  } = useFetch(fetchShowsintheQueue);

  const soloQueueShows = allQueuedShows?.filter(
    (tvShow: TVShow) => tvShow.party === "Solo"
  );

  const friendQueueShows = allQueuedShows?.filter(
    (tvShow: TVShow) => tvShow.party === "Friends"
  );

  const familyQueueShows = allQueuedShows?.filter(
    (tvShow: TVShow) => tvShow.party === "Family"
  );

  const christineQueueShows = allQueuedShows?.filter(
    (tvShow: TVShow) => tvShow.party === "Christine"
  );

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 mb-32"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
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
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                In The Queue
              </Text>
            </>
            <ShowsWithParty shows={soloQueueShows} party={"Solo"} />
            <ShowsWithParty shows={friendQueueShows} party={"Friends"} />
            <ShowsWithParty shows={familyQueueShows} party={"Family"} />
            <ShowsWithParty shows={christineQueueShows} party={"Christine"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
