import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveBookmark, removeBookmark } from "../storage/bookmarkStorage";

export default function BookmarkButton({ job }) {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(job.id);
    } else {
      await saveBookmark(job);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleBookmark}>
      <Text style={styles.text}>{bookmarked ? "Remove Bookmark" : "Bookmark"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 10, backgroundColor: "blue", borderRadius: 5, marginTop: 10 },
  text: { color: "white", textAlign: "center" }
});
