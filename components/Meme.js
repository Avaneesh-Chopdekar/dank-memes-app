import { Image } from "react-native";
import { ActivityIndicator } from "@react-native-material/core";

export default function Meme({ loading, setLoading, meme }) {
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="orangered"
          style={{ height: "65%" }}
        />
      ) : null}
      <Image
        source={{ uri: meme }}
        fadeDuration={100}
        resizeMode="contain"
        style={{
          width: 360,
          height: "65%",
          alignSelf: "center",
          display: loading ? "none" : "flex",
        }}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
