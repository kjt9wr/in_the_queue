import CustomButton from "@/components/CustomButton";
import QueuePickerForm from "@/components/QueuePickerForm";
import { MODE, PARTY, RELEASE_STATUS, VIEW_STATUS } from "@/constants/enums";
import { icons } from "@/constants/icons";
import { deleteFromDB, updateMovie } from "@/services/appwrite";
import { movieIsReleased } from "@/services/helpers";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

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
      release_status: movieIsReleased(movie)
        ? RELEASE_STATUS.RELEASED
        : RELEASE_STATUS.UPCOMING,
      party: nextViewingStatus === VIEW_STATUS.QUEUE ? queue : movie.party,
      view_status: nextViewingStatus,
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
      {/* Select Queue Form */}
      {showForm && (
        <QueuePickerForm
          queue={queue}
          loading={loading}
          changeQueue={(itemValue) => setQueue(itemValue)}
          onSubmit={onSubmit}
          reset={reset}
        />
      )}
      {/* Action Buttons */}
      {!showForm && (
        <View className="flex-row gap-x-6 mt-2">
          {movieIsReleased(movie) &&
            movie.view_status !== VIEW_STATUS.QUEUE && (
              <CustomButton
                title="Add to Queue"
                handlePress={() => {
                  setShowForm(VIEW_STATUS.QUEUE);
                }}
                containerStyles="mt-7 bg-blue-400"
                isLoading={loading}
                icon={icons.enqueue}
                iconStyles="w-8 mr-3"
              />
            )}
          {movie.view_status === VIEW_STATUS.QUEUE &&
            movie.status === RELEASE_STATUS.RELEASED && (
              <CustomButton
                title={"Watched"}
                handlePress={() => {
                  onSubmit(VIEW_STATUS.WATCHED);
                }}
                containerStyles="mt-7 bg-purple-400"
                isLoading={loading}
                icon={icons.check}
                iconStyles="w-8"
              />
            )}
          {!movieIsReleased(movie) &&
            movie.release_status !== RELEASE_STATUS.UPCOMING && (
              <CustomButton
                title="Add to Coming Soon"
                handlePress={() => {
                  onSubmit(VIEW_STATUS.QUEUE);
                }}
                containerStyles="mt-7 bg-green-700"
                isLoading={loading}
                icon={icons.timerWhite}
                iconStyles="w-8 mr-2"
              />
            )}
          {movie.view_status === VIEW_STATUS.QUEUE && (
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
