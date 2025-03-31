import { PLAY_STATUS } from "@/constants/enums";
import { formatDate } from "@/services/helpers";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const VideoGameCard = ({
  id,
  poster_path,
  name,
  first_release_date,
  play_status,
}: VideoGame) => {
  return (
    <Link href={`/games/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://images.igdb.com/igdb/image/upload/t_720p/${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {name}
        </Text>
        {first_release_date && play_status !== PLAY_STATUS.FINISHED && (
          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {formatDate(first_release_date)}
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default VideoGameCard;
