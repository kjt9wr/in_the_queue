import CustomButton from "@/components/CustomButton";
import {
  MODE,
  MOVIE_RELEASE_STATUS,
  PARTY,
  VIEWING_STATUS,
} from "@/constants/enums";
import { icons } from "@/constants/icons";
import { deleteFromDB, updateMovie } from "@/services/appwrite";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface SeriesActionsProps {
  loading: boolean;
  movie: Movie;
}
const SeriesActions = ({ movie, loading }: SeriesActionsProps) => {
  const router = useRouter();
  const [queue, setQueue] = useState<string>(PARTY.SOLO);
  const [showForm, setShowForm] = useState<string>("");

  const reset = () => {
    setQueue(PARTY.SOLO);
    setShowForm("");
  };

  const onSubmit = async (nextViewingStatus: string) => {
    const movieToAdd: MovieFromDB = {
      name: movie.title,
      release_status:
        movie.status === MOVIE_RELEASE_STATUS.RELEASED
          ? MOVIE_RELEASE_STATUS.RELEASED
          : MOVIE_RELEASE_STATUS.UPCOMING,
      party: nextViewingStatus === VIEWING_STATUS.QUEUE ? queue : movie.party,
      viewing_status: nextViewingStatus,
      TMDB_ID: movie.id,
      poster_path: movie.poster_path,
    };
    await updateMovie(movieToAdd).then(() => {
      reset();
      router.back();
    });
  };

  const onDelete = async (movieId: number) => {
    await deleteFromDB(movieId, MODE.MOVIES).then(() => {
      reset();
      router.back();
    });
  };

  return (
    <View className="ml-5">
      {showForm && (
        <View className="mt-6">
          <Text className="text-white">Add to Queue: </Text>
          <Picker
            selectedValue={queue}
            onValueChange={(itemValue) => setQueue(itemValue)}
            style={{ backgroundColor: "#221F3D", color: "white" }}
            prompt="Select a Queue"
          >
            <Picker.Item label={PARTY.SOLO} value={PARTY.SOLO} />
            <Picker.Item label={PARTY.FRIENDS} value={PARTY.FRIENDS} />
            <Picker.Item label={PARTY.CHRISTINE} value={PARTY.CHRISTINE} />
            <Picker.Item label={PARTY.FAMILY} value={PARTY.FAMILY} />
          </Picker>
        </View>
      )}
      {/* Select Form */}
      {showForm && (
        <View className="flex-row gap-x-6 mt-2">
          <CustomButton
            title="Cancel"
            handlePress={() => {
              reset();
            }}
            containerStyles="mt-7 text-blue-700 font-semibold border border-gray-500 rounded"
            isLoading={loading}
            icon={null}
          />
          {showForm === VIEWING_STATUS.QUEUE && (
            <CustomButton
              title={`Add to ${queue} queue`}
              handlePress={() => {
                onSubmit(VIEWING_STATUS.QUEUE);
              }}
              containerStyles="mt-7 bg-blue-400"
              isLoading={loading}
              icon={null}
            />
          )}
        </View>
      )}
      {/* Action Buttons */}
      {!showForm && (
        <View className="flex-row gap-x-6 mt-2">
          {movie.status === MOVIE_RELEASE_STATUS.RELEASED &&
            movie.viewing_status !== VIEWING_STATUS.QUEUE && (
              <CustomButton
                title="Add to Queue"
                handlePress={() => {
                  setShowForm(VIEWING_STATUS.QUEUE);
                }}
                containerStyles="mt-7 bg-blue-400"
                isLoading={loading}
                icon={icons.enqueue}
                iconStyles="w-8 mr-3"
              />
            )}
          {movie.viewing_status === VIEWING_STATUS.QUEUE &&
            movie.status === MOVIE_RELEASE_STATUS.RELEASED && (
              <CustomButton
                title={"Watched"}
                handlePress={() => {
                  onSubmit(VIEWING_STATUS.CAUGHT_UP);
                }}
                containerStyles="mt-7 bg-purple-400"
                isLoading={loading}
                icon={icons.check}
                iconStyles="w-8"
              />
            )}
          {movie.status !== MOVIE_RELEASE_STATUS.RELEASED &&
            movie.release_status !== MOVIE_RELEASE_STATUS.UPCOMING && (
              <CustomButton
                title="Add to Coming Soon"
                handlePress={() => {
                  onSubmit(VIEWING_STATUS.CURRENTLY_WATCHING);
                }}
                containerStyles="mt-7 bg-green-700"
                isLoading={loading}
                icon={icons.timerWhite}
                iconStyles="w-8 mr-2"
              />
            )}
          {movie.viewing_status === VIEWING_STATUS.QUEUE && (
            <CustomButton
              title="Remove"
              handlePress={() => {
                onDelete(movie.id);
              }}
              containerStyles="mt-7 bg-red-700"
              isLoading={loading}
              textStyles="mr-2"
              icon={icons.trash}
              iconStyles="w-6 mx-2"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default SeriesActions;
