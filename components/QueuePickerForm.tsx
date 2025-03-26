import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { PARTY, VIEWING_STATUS } from "@/constants/enums";
import CustomButton from "./CustomButton";

interface QueuePickerProps {
  queue: string;
  loading: boolean;
  changeQueue: (queue: string) => void;
  onSubmit: (queue: string) => Promise<void>;
  reset: () => void;
}

const QueuePickerForm = ({
  queue,
  loading,
  changeQueue,
  onSubmit,
  reset,
}: QueuePickerProps) => {
  return (
    <>
      <View className="mt-6">
        <Text className="text-white">Add to Queue: </Text>
        <Picker
          selectedValue={queue}
          onValueChange={changeQueue}
          style={{ backgroundColor: "#221F3D", color: "white" }}
          prompt="Select a Queue"
        >
          <Picker.Item label={PARTY.SOLO} value={PARTY.SOLO} />
          <Picker.Item label={PARTY.FRIENDS} value={PARTY.FRIENDS} />
          <Picker.Item label={PARTY.CHRISTINE} value={PARTY.CHRISTINE} />
          <Picker.Item label={PARTY.FAMILY} value={PARTY.FAMILY} />
        </Picker>
      </View>
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

        <CustomButton
          title={`Add to ${queue} queue`}
          handlePress={() => {
            onSubmit(VIEWING_STATUS.QUEUE);
          }}
          containerStyles="mt-7 bg-blue-400"
          isLoading={loading}
          icon={null}
        />
      </View>
    </>
  );
};

export default QueuePickerForm;
