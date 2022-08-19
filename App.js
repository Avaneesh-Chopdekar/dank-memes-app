import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

import { AppBar, ActivityIndicator, Button } from "@react-native-material/core";

import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

export default function App() {
  const [subreddit, setSubreddit] = useState("");
  const [meme, setMeme] = useState();
  const [loading, setLoading] = useState(true);

  const fetchMeme = () => {
    setLoading(true);
    fetch("https://meme-api.herokuapp.com/gimme")
      .then((res) => res.json())
      .then((data) => {
        setMeme(data.url);
        setSubreddit(data.subreddit);
      });
  };

  const shareMeme = async () => {
    if (Platform.OS === "web") {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(meme);
    await Sharing.shareAsync(imageTmp.uri);
  };

  useEffect(() => fetchMeme(), []);

  return (
    <View style={styles.container}>
      <View style={styles.statusbar} />
      <AppBar
        title="Dank Memes"
        centerTitle
        color="orangered"
        titleStyle={styles.whiteTitle}
        elevation
      />
      <Text style={styles.subredditText}>r/{subreddit}</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="orangered"
          style={styles.loading}
        />
      ) : null}
      <Image
        source={{ uri: meme }}
        fadeDuration={100}
        resizeMode="contain"
        style={{
          width: 360,
          height: 450,
          alignSelf: "center",
          display: loading ? "none" : "flex",
        }}
        onLoad={() => setLoading(false)}
      />
      <View style={styles.controls}>
        <Button
          title="Next"
          titleStyle={styles.whiteTitle}
          color="orangered"
          trailing={() => (
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          )}
          onPress={fetchMeme}
        />
        <Button
          title="Share"
          titleStyle={styles.whiteTitle}
          color="orangered"
          trailing={() => <MaterialIcons name="send" size={24} color="white" />}
          onPress={meme !== "" ? shareMeme : null}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusbar: {
    height: Constants.statusBarHeight,
    backgroundColor: "#cc3700",
  },
  whiteTitle: { color: "white" },
  subredditText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  loading: { height: 450 },
  controls: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
