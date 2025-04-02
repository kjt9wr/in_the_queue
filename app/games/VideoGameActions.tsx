import CustomButton from "@/components/CustomButton";
import QueuePickerForm from "@/components/QueuePickerForm";
import {
  MODE,
  MOVIE_RELEASE_STATUS,
  PARTY,
  VIEWING_STATUS,
} from "@/constants/enums";
import { icons } from "@/constants/icons";
import {
  deleteFromDB,
  updateMovie,
  updateVideoGame,
} from "@/services/appwrite";
import { gameIsReleased } from "@/services/helpers";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

interface VideoGameActionsProps {
  loading: boolean;
  selectedGame: VideoGame;
}
const VideoGameActions = ({ selectedGame, loading }: VideoGameActionsProps) => {
  const router = useRouter();
  const [queue, setQueue] = useState<string>(PARTY.SOLO);
  const [showForm, setShowForm] = useState<string>("");

  const reset = () => {
    setQueue(PARTY.SOLO);
    setShowForm("");
  };

  const onSubmit = async (nextViewingStatus: string) => {
    const gameToAdd: VideoGameFromDB = {
      name: selectedGame.name,
      release_status: gameIsReleased(selectedGame)
        ? MOVIE_RELEASE_STATUS.RELEASED
        : MOVIE_RELEASE_STATUS.UPCOMING,
      party:
        nextViewingStatus === VIEWING_STATUS.QUEUE ? queue : selectedGame.party,
      play_status: nextViewingStatus,
      IGDB_ID: selectedGame.id,
      poster_path: selectedGame.poster_path,
      owned: selectedGame.owned || false,
    };

    await updateVideoGame(gameToAdd).then(() => {
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
          {gameIsReleased(selectedGame) &&
            selectedGame.play_status !== VIEWING_STATUS.QUEUE && (
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
          {/* {selectedGame.viewing_status === VIEWING_STATUS.QUEUE &&
            selectedGame.status === MOVIE_RELEASE_STATUS.RELEASED && (
              <CustomButton
                title={"Watched"}
                handlePress={() => {
                  onSubmit(VIEWING_STATUS.WATCHED);
                }}
                containerStyles="mt-7 bg-purple-400"
                isLoading={loading}
                icon={icons.check}
                iconStyles="w-8"
              />
            )}
          {selectedGame.status !== MOVIE_RELEASE_STATUS.RELEASED &&
            selectedGame.release_status !== MOVIE_RELEASE_STATUS.UPCOMING && (
              <CustomButton
                title="Add to Coming Soon"
                handlePress={() => {
                  onSubmit(VIEWING_STATUS.QUEUE);
                }}
                containerStyles="mt-7 bg-green-700"
                isLoading={loading}
                icon={icons.timerWhite}
                iconStyles="w-8 mr-2"
              />
            )}
          {selectedGame.viewing_status === VIEWING_STATUS.QUEUE && (
            <CustomButton
              title="Remove"
              handlePress={() => {
                onDelete(selectedGame.id);
              }}
              containerStyles="mt-7 bg-red-700"
              isLoading={loading}
              textStyles="mr-2"
              icon={icons.trash}
              iconStyles="w-6 mx-2"
            />
          )} */}
        </View>
      )}
    </View>
  );
};

export default VideoGameActions;
