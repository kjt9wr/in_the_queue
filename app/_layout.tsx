import { Stack } from "expo-router";
import React from "react";
import "../global.css";

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="shows/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="search/search-series"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="search/search-movies"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
