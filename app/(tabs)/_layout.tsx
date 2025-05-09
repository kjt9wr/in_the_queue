import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

import { MODE } from "@/constants/enums";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
    backgroundColor: "grey",
  },
  tabBar: {
    backgroundColor: "#0F0D23",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 36,
    height: 52,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0F0D23",
  },
  tabBarItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
const TabIcon = ({ focused, icon, title, highlight }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image
          source={icon}
          tintColor="#151312"
          className="size-5"
          resizeMode="contain"
        />
        <Text className="text-secondary text-sm font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image
          source={icon}
          tintColor="#A8B5DB"
          className="size-5"
          resizeMode="contain"
        />
      </View>
    );
  }
};

const hideTab = (name: string) => {
  return (
    <Tabs.Screen
      name={name}
      options={{
        href: null,
      }}
    />
  );
};

const TabsLayout = () => {
  const [mode, setMode] = useState<string>(MODE.TV_SHOWS);
  const router = useRouter();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const changeMode = (mode: string) => {
    setMode(mode);
    switch (mode) {
      case MODE.TV_SHOWS:
        router.replace("/(tabs)");
        break;
      case MODE.MOVIES:
        router.replace("/(tabs)/movie/queue-movies");
        break;
      case MODE.VIDEO_GAMES:
        router.replace("/(tabs)/games/queue-games");
        break;
      default:
        break;
    }
    bottomSheetModalRef?.current?.dismiss();
  };
  let topLogoSource;
  switch (mode) {
    case MODE.TV_SHOWS:
      topLogoSource = icons.logoSeries;
      break;
    case MODE.MOVIES:
      topLogoSource = icons.logoMovies;
      break;
    case MODE.VIDEO_GAMES:
      topLogoSource = icons.logoGames;
      break;
    default:
      topLogoSource = icons.logo;
      break;
  }
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <View className="bg-primary">
            <Image
              source={images.bg}
              className="absolute w-full z-0"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className="mx-auto"
            >
              <Image
                source={topLogoSource}
                className="w-12 h-12 mt-20 mb-5 mx-auto"
              />
            </TouchableOpacity>
          </View>
          {mode === MODE.TV_SHOWS && (
            <Tabs
              screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabBarItem,
                tabBarStyle: styles.tabBar,
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: "Queue",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.queue}
                      title="Queue"
                      highlight={images.highlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="watching-series"
                options={{
                  title: "Watching",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.tv}
                      title="Watching"
                      highlight={images.highlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="coming-soon-series"
                options={{
                  title: "Coming Soon",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.timer}
                      title="Coming Soon"
                      highlight={images.highlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="finished-series"
                options={{
                  title: "Finished",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.finished}
                      title="Finished"
                      highlight={images.highlight}
                    />
                  ),
                }}
              />
              {hideTab("movie/queue-movies")}
              {hideTab("movie/coming-soon-movies")}
              {hideTab("movie/finished-movies")}

              {hideTab("games/queue-games")}
              {hideTab("games/playing-games")}
              {hideTab("games/coming-soon-games")}
              {hideTab("games/finished-games")}
            </Tabs>
          )}

          {mode === MODE.MOVIES && (
            <Tabs
              screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabBarItem,
                tabBarStyle: styles.tabBar,
              }}
            >
              <Tabs.Screen
                name="movie/queue-movies"
                options={{
                  title: "Queue",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.queue}
                      title="Queue"
                      highlight={images.yellowHighlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="movie/coming-soon-movies"
                options={{
                  title: "Coming Soon",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.timer}
                      title="Coming Soon"
                      highlight={images.yellowHighlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="movie/finished-movies"
                options={{
                  title: "Finished",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.finished}
                      title="Watched"
                      highlight={images.yellowHighlight}
                    />
                  ),
                }}
              />

              {hideTab("index")}
              {hideTab("watching-series")}
              {hideTab("coming-soon-series")}
              {hideTab("finished-series")}

              {hideTab("games/queue-games")}
              {hideTab("games/playing-games")}
              {hideTab("games/coming-soon-games")}
              {hideTab("games/finished-games")}
            </Tabs>
          )}

          {mode === MODE.VIDEO_GAMES && (
            <Tabs
              screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabBarItem,
                tabBarStyle: styles.tabBar,
              }}
            >
              <Tabs.Screen
                name="games/queue-games"
                options={{
                  title: "Queue",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.queue}
                      title="Queue"
                      highlight={images.blueHighlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="games/playing-games"
                options={{
                  title: "Playing",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.controller}
                      title="Playing"
                      highlight={images.blueHighlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="games/coming-soon-games"
                options={{
                  title: "Coming Soon",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.timer}
                      title="Coming Soon"
                      highlight={images.blueHighlight}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="games/finished-games"
                options={{
                  title: "Finished",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <TabIcon
                      focused={focused}
                      icon={icons.finished}
                      title="Finished"
                      highlight={images.blueHighlight}
                    />
                  ),
                }}
              />

              {hideTab("index")}
              {hideTab("watching-series")}
              {hideTab("coming-soon-series")}
              {hideTab("finished-series")}

              {hideTab("movie/queue-movies")}
              {hideTab("movie/coming-soon-movies")}
              {hideTab("movie/finished-movies")}
            </Tabs>
          )}

          <BottomSheetModal ref={bottomSheetModalRef}>
            <BottomSheetView style={styles.contentContainer}>
              <View className="flex flex-row justify-center items-center">
                <TouchableOpacity
                  onPress={() => changeMode(MODE.TV_SHOWS)}
                  className="mx-auto items-center"
                >
                  <Image
                    source={icons.logoSeries}
                    className="w-16 h-16 mb-4 mx-10"
                  />
                  <Text>TV Shows</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => changeMode(MODE.MOVIES)}
                  className="mx-auto items-center"
                >
                  <Image
                    source={icons.logoMovies}
                    className="w-16 h-16 mb-4 mx-10"
                  />
                  <Text>Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeMode(MODE.VIDEO_GAMES)}
                  className="mx-auto items-center"
                >
                  <Image
                    source={icons.logoGames}
                    className="w-16 h-16 mb-4 mx-10"
                  />
                  <Text>Video Games</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <StatusBar backgroundColor="#0F0D23" style="light" />
    </>
  );
};

export default TabsLayout;
