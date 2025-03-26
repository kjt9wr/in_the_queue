import CustomButton from "@/components/CustomButton";
import { PARTY, VIEWING_STATUS } from "@/constants/enums";
import { icons } from "@/constants/icons";
import { deleteShow, updateShow } from "@/services/appwrite";
import { determineReleaseStatus } from "@/services/helpers";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text } from "react-native";

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
    // const showToAdd: ShowFromDB = {
    //   name: show.name,
    //   Release_Status: determineReleaseStatus(show),
    //   Party: nextViewingStatus === VIEWING_STATUS.QUEUE ? queue : show.party,
    //   Viewing_Status: nextViewingStatus,
    //   TMDB_ID: show.id,
    //   poster_path: show.poster_path,
    // };
    // await updateShow(showToAdd).then(() => {
    //   reset();
    //   router.back();
    // });
  };

  const onDelete = async (showId: number) => {
    // await deleteShow(showId).then(() => {
    //   reset();
    //   router.back();
    // });
  };

  return (
    <View className="ml-5">
      {/* {showForm && (
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
      )} */}
      {/* Select Form */}
      {/* {showForm && (
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
      )} */}
      {/* Action Buttons */}
      {!showForm && (
        <View className="flex-row gap-x-6 mt-2">
          {movie.status === "Released" && movie.viewing_status !== "Queue" && (
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
          {movie.viewing_status === "Queue" && movie.status === "Released" && (
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
          {movie.status !== "Released" &&
            movie.release_status !== "upcoming" && (
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
          {movie.viewing_status === "Queue" && (
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
