












import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import JobCard from "../components/JobCard";
import { getBookmarks, removeBookmark } from "../storage/bookmarkStorage";
import { Ionicons } from "@expo/vector-icons";

export default function BookmarksScreen({ navigation }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const loadBookmarks = async () => {
    const jobs = await getBookmarks();
    if (Array.isArray(jobs)) {
      setBookmarkedJobs(jobs);
    }
  };

  useEffect(() => {
    loadBookmarks();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={loadBookmarks} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleRemoveBookmark = async (jobId) => {
    await removeBookmark(jobId);
    loadBookmarks(); // Refresh bookmarks list
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <JobCard 
              job={item} 
              onPress={() => navigation.navigate("JobDetails", { job: item })} 
            />
            {/* Floating Remove Button */}
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => handleRemoveBookmark(item.id)}
            >
              <Text style={styles.removeText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 15,
  },
  cardContainer: {
    position: "relative",
    marginBottom: 20,
  },
  removeButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  removeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
