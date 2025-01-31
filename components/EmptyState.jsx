import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-2xl text-semibold font-pmedium text-gray-100">
        {title}
      </Text>
      <Text className="text-lg text-secondary font-pmedium">{subtitle}</Text>
      <CustomButton
        title="Upload a video"
        containerStyles="w-full mt-4"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
