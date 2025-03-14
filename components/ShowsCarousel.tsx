import React from "react";
import { FlatList, Text, View } from "react-native";
import CarouselCard from "./CarouselCard";

interface Props {
  sectionTitle: string;
  shows?: TVShow[];
}

const ShowsCarousel = ({ sectionTitle, shows }: Props) => {
  return (
    <View>
      {shows && shows.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {sectionTitle}
          </Text>
          <FlatList
            data={shows}
            renderItem={({ item }) => <CarouselCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            className="mb-4 mt-3"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 26,
            }}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
    </View>
  );
};

export default ShowsCarousel;
