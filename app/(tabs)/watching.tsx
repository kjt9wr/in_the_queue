import ShowsCarousel from "@/components/ShowsCarousel";
import { PARTY } from "@/constants/enums";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchWatchingNow } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const Watching = () => {
  const {
    data: shows,
    loading: showsLoading,
    error: showsError,
  } = useFetch(fetchWatchingNow);

  const soloShows = shows?.filter(
    (tvShow: TVShow) => tvShow.party === PARTY.SOLO
  );

  const friendShows = shows?.filter(
    (tvShow: TVShow) => tvShow.party === PARTY.FRIENDS
  );

  const familyShows = shows?.filter(
    (tvShow: TVShow) => tvShow.party === PARTY.FAMILY
  );

  const christineShows = shows?.filter(
    (tvShow: TVShow) => tvShow.party === PARTY.CHRISTINE
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
            <>
              <Text className="text-2xl text-white font-bold mt-5 mb-3">
                Watching Now
              </Text>
            </>
            <ShowsCarousel
              shows={soloShows}
              sectionTitle={`Watching ${PARTY.SOLO}`}
            />
            <ShowsCarousel
              shows={friendShows}
              sectionTitle={`Watching with ${PARTY.FRIENDS}`}
            />
            <ShowsCarousel
              shows={familyShows}
              sectionTitle={`Watching with ${PARTY.FAMILY}`}
            />
            <ShowsCarousel
              shows={christineShows}
              sectionTitle={`Watching with ${PARTY.CHRISTINE}`}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Watching;
