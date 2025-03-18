import CustomButton from "@/components/CustomButton";
import { PARTY } from "@/constants/enums";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";

interface ShowActionsProps {
  loading: boolean;
  status: string;
}
const ShowActions = ({ loading, status }: ShowActionsProps) => {
  const [queue, setQueue] = useState<string>(PARTY.SOLO);
  const [showForm, setShowForm] = useState(false);

  const reset = () => {
    setQueue(PARTY.SOLO);
    setShowForm(false);
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
          <CustomButton
            title={`Add to ${queue} queue`}
            handlePress={() => {
              setShowForm(true);
            }}
            containerStyles="mt-7 bg-green-700"
            isLoading={loading}
          />
        </View>
      )}
      {status !== "Queue" && !showForm && (
        <View className="flex-row gap-x-6 mt-2">
          <CustomButton
            title="Add to Queue"
            handlePress={() => {
              setShowForm(true);
            }}
            containerStyles="mt-7 bg-green-700"
            isLoading={loading}
          />

          <CustomButton
            title="Start Watching"
            handlePress={() => {}}
            containerStyles="mt-7 bg-green-700"
            isLoading={loading}
          />
        </View>
      )}
    </View>
  );
};

export default ShowActions;
