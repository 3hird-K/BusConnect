import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false, // Hide the header
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
