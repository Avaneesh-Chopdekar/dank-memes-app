import { View, Platform, StyleSheet } from "react-native";

import { Button } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";

import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

export default function Controls({ fetchMeme, meme }) {
  const shareMeme = async () => {
    if (Platform.OS === "web") {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(meme);
    await Sharing.shareAsync(imageTmp.uri);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  whiteTitle: { color: "white" },
  controls: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
