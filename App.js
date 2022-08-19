import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppBar } from "@react-native-material/core";
import Controls from "./components/Controls";
import Meme from "./components/Meme";

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

  useEffect(() => fetchMeme(), []);

  return (
    <View style={styles.container}>
      <View style={styles.statusbar} />
      <AppBar
        title="Dank Memes"
        centerTitle
        color="orangered"
        titleStyle={styles.whiteTitle}
        elevation={0}
      />
      <Text style={styles.subredditText}>From r/{subreddit}</Text>
      <Meme meme={meme} loading={loading} setLoading={setLoading} />
      <Controls fetchMeme={fetchMeme} meme={meme} />
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
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
});
