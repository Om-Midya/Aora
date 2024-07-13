import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appWrite";

const SignIn = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "Plaese fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await createUser(form.userName, form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold font-psemibold">
            Sign up for Aora
          </Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChange={(value) => setForm({ ...form, userName: value })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChange={(value) => setForm({ ...form, email: value })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign up"
            containerStyles="w-full mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View>
            <Text className="text-gray-100 text-center text-lg mt-7 font-pregular">
              Already Have an account?{" "}
              <Link href="/sign-in" className="text-secondary-200">
                Log In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
