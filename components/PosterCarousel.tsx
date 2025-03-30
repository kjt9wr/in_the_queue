import React from "react";
import { FlatList, Text, View } from "react-native";
import MovieCarouselCard from "./Cards/MovieCarouselCard";
import SeriesCarouselCard from "./Cards/SeriesCarouselCard";
import { MODE } from "@/constants/enums";
import GameCarouselCard from "./Cards/GameCarouselCard";

interface Props {
  sectionTitle: string;
  mode: string;
  movies?: MovieFromDB[];
  shows?: ShowFromDB[];
  games?: VideoGameFromDB[];
}

const PosterCarousel = ({
  sectionTitle,
  mode,
  shows,
  movies,
  games,
}: Props) => {
  return (
    <View>
      {shows && shows.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {sectionTitle}
          </Text>
          <FlatList
            data={shows}
            renderItem={({ item }) => <SeriesCarouselCard {...item} />}
            keyExtractor={(item) => item.TMDB_ID.toString()}
            horizontal
            className="mb-4 mt-3"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
            }}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
      {movies && movies.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {sectionTitle}
          </Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCarouselCard {...item} />}
            keyExtractor={(item) => item.TMDB_ID.toString()}
            horizontal
            className="mb-4 mt-3"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
            }}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
      {mode === MODE.VIDEO_GAMES && games && games.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {sectionTitle}
          </Text>
          <FlatList
            data={games}
            renderItem={({ item }) => <GameCarouselCard {...item} />}
            keyExtractor={(item) => item.IGDB_ID.toString()}
            horizontal
            className="mb-4 mt-3"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
            }}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
    </View>
  );
};

export default PosterCarousel;
