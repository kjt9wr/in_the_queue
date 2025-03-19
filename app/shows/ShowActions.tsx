import CustomButton from "@/components/CustomButton";
import { PARTY, VIEWING_STATUS } from "@/constants/enums";
import { updateShow } from "@/services/appwrite";
import { determineReleaseStatus } from "@/services/helpers";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

interface ShowActionsProps {
  loading: boolean;
  status: string;
  show: TVShow;
}
const ShowActions = ({ show, loading, status }: ShowActionsProps) => {
  const router = useRouter();
  const [queue, setQueue] = useState<string>(PARTY.SOLO);
  const [showForm, setShowForm] = useState<string>("");

  const reset = () => {
    setQueue(PARTY.SOLO);
    setShowForm("");
  };

  const startWatching = async () => {
    onSubmit(VIEWING_STATUS.CURRENTLY_WATCHING);
  };

  const onSubmit = async (nextStatus: string) => {
    const showToAdd: ShowFromDB = {
      Name: show?.name || "",
      Release_Status: determineReleaseStatus(show),
      Party:
        nextStatus === VIEWING_STATUS.CURRENTLY_WATCHING ? show.party : queue,
      Viewing_Status: nextStatus,
      TMDB_ID: show?.id || 0,
    };

    await updateShow(showToAdd).then(() => {
      reset();
      router.back();
    });
  };

  return (
    <View>
      {showForm && (
        <View className="mt-6">
          <Picker
            selectedValue={queue}
            onValueChange={(itemValue) => setQueue(itemValue)}
            style={{ backgroundColor: "white" }}
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
          />
          {showForm === VIEWING_STATUS.QUEUE && (
            <CustomButton
              title={`Add to ${queue} queue`}
              handlePress={() => {
                onSubmit(VIEWING_STATUS.QUEUE);
              }}
              containerStyles="mt-7 bg-green-700"
              isLoading={loading}
            />
          )}
        </View>
      )}
      {/* Action Buttons */}
      {!showForm && (
        <View className="flex-row gap-x-6 mt-2">
          {status !== VIEWING_STATUS.QUEUE && (
            <CustomButton
              title="Add to Queue"
              handlePress={() => {
                setShowForm(VIEWING_STATUS.QUEUE);
              }}
              containerStyles="mt-7 bg-green-700"
              isLoading={loading}
            />
          )}
          {status === VIEWING_STATUS.QUEUE && (
            <CustomButton
              title="Start Watching"
              handlePress={() => {
                startWatching();
              }}
              containerStyles="mt-7 bg-green-700"
              isLoading={loading}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ShowActions;
