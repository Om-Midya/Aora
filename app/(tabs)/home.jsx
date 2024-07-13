import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";

const home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Home</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl text-semibold font-pmedium text-gray-100">
                  Welcome back, John
                </Text>
                <Text className="text-lg text-secondary font-pmedium">
                  Here are some of the latest updates
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default home;
