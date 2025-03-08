import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      {/* <Text
        className={`${focused ? "font-semibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="watching"
          options={{
            title: "Watching",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.tv}
                color={color}
                name="Watching"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="coming-soon"
          options={{
            title: "Coming Soon",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.timer}
                color={color}
                name="ComingSoon"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="queue"
          options={{
            title: "Queue",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.queue}
                color={color}
                name="Queue"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="finished"
          options={{
            title: "Finished",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.finished}
                color={color}
                name="Finished"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
