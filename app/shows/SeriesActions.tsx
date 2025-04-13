import CustomButton from "@/components/CustomButton";
import QueuePickerForm from "@/components/QueuePickerForm";
import {
  MODE,
  PARTY,
  SHOW_TERMINATED_STATUSES,
  VIEW_STATUS,
} from "@/constants/enums";
import { icons } from "@/constants/icons";
import { deleteFromDB, updateShow } from "@/services/appwrite";
import { determineReleaseStatus } from "@/services/helpers";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface SeriesActionsProps {
  loading: boolean;
  status: string;
  show: TVShow;
}
const SeriesActions = ({ show, loading, status }: SeriesActionsProps) => {
  const router = useRouter();
  const [queue, setQueue] = useState<string>(PARTY.SOLO);
  const [showForm, setShowForm] = useState<string>("");

  const reset = () => {
    setQueue(PARTY.SOLO);
    setShowForm("");
  };

  const onSubmit = async (nextViewingStatus: string) => {
    const showToAdd: ShowFromDB = {
      name: show.name,
      release_status: determineReleaseStatus(show),
      party: nextViewingStatus === VIEW_STATUS.QUEUE ? queue : show.party,
      view_status: nextViewingStatus,
      TMDB_ID: show.id,
      poster_path: show.poster_path,
    };

    await updateShow(showToAdd).then(() => {
      reset();
      router.back();
    });
  };

  const onDelete = async (showId: number) => {
    await deleteFromDB(showId, MODE.TV_SHOWS).then(() => {
      reset();
      router.back();
    });
  };

  return (
    <View className="ml-5">
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
          {status !== VIEW_STATUS.QUEUE && (
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
          {status === VIEW_STATUS.QUEUE && (
            <CustomButton
              title="Start"
              handlePress={() => {
                onSubmit(VIEW_STATUS.CURRENTLY_WATCHING);
              }}
              containerStyles="mt-7 bg-green-700 pr-5"
              isLoading={loading}
              icon={icons.play}
              iconStyles="w-8 mr-2"
            />
          )}
          {status === VIEW_STATUS.QUEUE && (
            <CustomButton
              title="Rewatch"
              handlePress={() => {
                onSubmit(VIEW_STATUS.REWATCHING);
              }}
              containerStyles="mt-7 bg-purple-700"
              isLoading={loading}
              icon={icons.rewatch}
              iconStyles="w-8 mr-1"
            />
          )}
          {status === VIEW_STATUS.QUEUE && (
            <CustomButton
              title="Remove"
              handlePress={() => {
                onDelete(show.id);
              }}
              containerStyles="mt-7 bg-red-700"
              isLoading={loading}
              textStyles="mr-2"
              icon={icons.trash}
              iconStyles="w-6 mx-2"
            />
          )}
          {(status === VIEW_STATUS.CURRENTLY_WATCHING ||
            status === VIEW_STATUS.REWATCHING) && (
            <CustomButton
              title={
                SHOW_TERMINATED_STATUSES.includes(show.status)
                  ? "Finish Show"
                  : "Caught Up"
              }
              handlePress={() => {
                onSubmit(VIEW_STATUS.CAUGHT_UP);
              }}
              containerStyles="mt-7 bg-purple-400"
              isLoading={loading}
              icon={icons.check}
              iconStyles="w-8"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default SeriesActions;
