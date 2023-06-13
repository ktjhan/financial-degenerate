import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TweetType } from "../types";
import { IconButton } from "./IconButton";
import { Link } from "expo-router";

type TweetProps = {
  tweet: TweetType;
};

export const Tweet = ({ tweet }: TweetProps) => {
  return (
    <Link
      href={{
        pathname: `/tweet/${tweet.id}`,
        params: { tweet: JSON.stringify(tweet) },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image src={tweet.user.image} style={styles.userImage} />
        <View style={styles.mainContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.name}>{tweet.user.username}</Text>
            <Text style={styles.name}> • 2h</Text>
          </View>

          <Text style={styles.content}>{tweet.content}</Text>
          {tweet.image && <Image src={tweet.image} styles={styles.image} />}
          <View style={styles.footer}>
            <IconButton icon="comment" text={tweet.numberOfComments} />
            <IconButton icon="retweet" text={tweet.numberOfRetweets} />
            <IconButton icon="heart" text={tweet.numberOfLikes} />
            <IconButton icon="chart" text={tweet.impressions || 0} />
            <IconButton icon="share-apple" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 10,
    borderRadius: 15,
  },
  username: {
    color: "gray",
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
