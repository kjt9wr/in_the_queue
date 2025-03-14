import { Link } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";

const CarouselCard = ({ id, name, poster_path }: TVShow) => {
  return (
    <Link href={`/shows/${id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CarouselCard;
