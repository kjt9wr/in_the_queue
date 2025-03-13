import { View, Text, FlatList } from "react-native";
import React from "react";
import TVShowCard from "./TVShowCard";

interface Props {
  party: string;
  shows?: TVShow[];
}

const ShowsWithParty = ({ party, shows }: Props) => {
  return (
    <View>
      {shows && shows.length > 0 && (
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            {party} Queue
          </Text>
          <FlatList
            data={shows}
            renderItem={({ item }) => <TVShowCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2 pb-22"
            scrollEnabled={false}
          />
        </>
      )}
    </View>
  );
};

export default ShowsWithParty;
