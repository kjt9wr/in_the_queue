import React from "react";
import { FlatList, Text, View } from "react-native";
import PosterCard from "./PosterCard";

interface Props {
  sectionTitle: string;
  movies?: MovieFromDB[];
}

const PosterCarousel = ({ sectionTitle, movies }: Props) => {
  return (
    <View>
      {movies && movies.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {sectionTitle}
          </Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => <PosterCard {...item} />}
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
    </View>
  );
};

export default PosterCarousel;
