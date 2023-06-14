import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Tweet } from "../../../../components/Tweet";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTweetsApi } from "../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";

export default function TabOneScreen() {
  const { listTweets } = useTweetsApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.page}>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />
      <Link href="/new-tweet" asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingButton}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    padding: 15,
    borderRadius: 25,

    position: "absolute",
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
});
