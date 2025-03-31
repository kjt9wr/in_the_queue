import { images } from "@/constants/images";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const GameCarouselCard = ({
  IGDB_ID,
  name,
  poster_path,
  owned,
}: VideoGameFromDB) => {
  return (
    <Link href={`/games/${IGDB_ID}`} asChild>
      <TouchableOpacity className="w-32 relative mr-5 pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://images.igdb.com/igdb/image/upload/t_720p/${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        {owned && (
          <View className="absolute -bottom-12 -right-0.5 px-2 py-1 rounded-full">
            <Image
              source={images.owned}
              className="w-20 h-48"
              resizeMode="contain"
            />
          </View>
        )}

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default GameCarouselCard;
