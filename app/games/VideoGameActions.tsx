import CustomButton from "@/components/CustomButton";
import QueuePickerForm from "@/components/QueuePickerForm";
import {
  MODE,
  MOVIE_RELEASE_STATUS,
  PARTY,
  PLAY_STATUS,
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

  console.log(selectedGame);

  const onSubmit = async (nextPlayStatus: string) => {
    const gameToAdd: VideoGameFromDB = {
      name: selectedGame.name,
      release_status: gameIsReleased(selectedGame)
        ? MOVIE_RELEASE_STATUS.RELEASED
        : MOVIE_RELEASE_STATUS.UPCOMING,
      party: nextPlayStatus === PLAY_STATUS.QUEUE ? queue : selectedGame.party,
      play_status: nextPlayStatus,
      IGDB_ID: selectedGame.id,
      poster_path: selectedGame.poster_path,
      owned: selectedGame.owned || false,
    };

    await updateVideoGame(gameToAdd).then(() => {
      reset();
      router.back();
    });
  };

  const onDelete = async (game_id: number) => {
    await deleteFromDB(game_id, MODE.VIDEO_GAMES).then(() => {
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
            selectedGame.play_status !== PLAY_STATUS.QUEUE && (
              <CustomButton
                title="Add to Queue"
                handlePress={() => {
                  setShowForm(PLAY_STATUS.QUEUE);
                }}
                containerStyles="mt-7 bg-blue-400"
                isLoading={loading}
                icon={icons.enqueue}
                iconStyles="w-8 mr-3"
              />
            )}

          {selectedGame.play_status === PLAY_STATUS.QUEUE &&
            gameIsReleased(selectedGame) && (
              <CustomButton
                title="Start Playing"
                handlePress={() => {
                  onSubmit(PLAY_STATUS.CURRENTLY_PLAYING);
                }}
                containerStyles="mt-7 bg-green-700"
                isLoading={loading}
                icon={icons.play}
                iconStyles="w-8 mr-2"
              />
            )}
          {selectedGame.play_status === PLAY_STATUS.CURRENTLY_PLAYING &&
            gameIsReleased(selectedGame) && (
              <CustomButton
                title={"Finished"}
                handlePress={() => {
                  onSubmit(PLAY_STATUS.FINISHED);
                }}
                containerStyles="mt-7 bg-purple-400"
                isLoading={loading}
                icon={icons.check}
                iconStyles="w-8"
              />
            )}

          {/* 

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
         */}
          {selectedGame.play_status === PLAY_STATUS.QUEUE &&
            gameIsReleased(selectedGame) && (
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
            )}
        </View>
      )}
    </View>
  );
};

export default VideoGameActions;
