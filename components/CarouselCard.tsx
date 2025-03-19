import { Link } from "expo-router";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { images } from "@/constants/images";

const CarouselCard = ({ id, name, poster_path, viewing_status }: TVShow) => {
  return (
    <Link href={`/shows/${id}`} asChild>
      <TouchableOpacity className="w-32 relative mr-5 pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        {viewing_status === "Rewatching" && (
          <View className="absolute top-2 -left-3.5 px-6 py-1 rounded-full">
            <MaskedView
              maskElement={
                <Text className="font-bold text-white text-6xl">
                  Rewatching
                </Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        )}

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CarouselCard;
