import { Link } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";

const SeriesCard = ({ id, poster_path, name, next_episode_to_air }: TVShow) => {
  return (
    <Link href={`/shows/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {name}
        </Text>
        {next_episode_to_air && (
          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {next_episode_to_air.air_date}
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default SeriesCard;
