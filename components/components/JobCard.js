










import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveBookmark, removeBookmark, getBookmarks } from "../storage/bookmarkStorage";

export default function JobCard({ job, onPress }) {
  const [bookmarked, setBookmarked] = useState(false);

  const checkBookmarkStatus = async () => {
    const savedJobs = await getBookmarks();
    setBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
  };

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(job.id);
    } else {
      await saveBookmark(job);
    }
    checkBookmarkStatus(); // Refresh bookmark status after action
  };

  return (
    <View>
       <TouchableOpacity onPress={checkBookmarkStatus} style={styles.refreshButton}>
        <Ionicons name="refresh" size={10} color="black" />
      </TouchableOpacity>
      {/* Refresh Button at Top Left */}
      {/* <TouchableOpacity onPress={checkBookmarkStatus} style={styles.refreshButton}>
        <Ionicons name="refresh" size={24} color="black" />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.card} onPress={onPress}>
        {/* Job Image (Left Side) */}
        <View style={styles.imageContainer}>
          {job.creatives?.length > 0 && job.creatives[0]?.thumb_url ? (
            <Image source={{ uri: job.creatives[0].thumb_url }} style={styles.image} />
          ) : (
            <Ionicons name="image-outline" size={50} color="#ccc" style={styles.imagePlaceholder} />
          )}
        </View>

        {/* Job Details (Right Side) */}
        <View style={styles.details}>
          <Text style={styles.companyName}>{job.company_name}</Text>
          <Text style={styles.jobId}>Job ID: {job.id}</Text>

          <View style={styles.locationContainer}>
            <Ionicons name="briefcase-outline" size={16} color="#555" />
            <Text style={styles.detailText}>{job.job_role} ({job.job_hours})</Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{job.job_location_slug}</Text>
          </View>
        </View>

        {/* Floating Bookmark Button */}
        <TouchableOpacity 
          style={[styles.bookmarkButton, bookmarked ? styles.removeBookmark : styles.addBookmark]} 
          onPress={toggleBookmark}
        >
          <Ionicons name={bookmarked ? "close" : "add"} size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    position: "absolute",
    top: 48, 
    left: 11, 
    zIndex: 10, 
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 50,  // Push card down below refresh button
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    width: 50,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    textAlign: "center",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  jobId: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  // Bookmark Button Styles
  bookmarkButton: {
    position: "absolute",
    bottom: -1,
    left: -1,
    width: 40,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addBookmark: {
    backgroundColor: "green",
  },
  removeBookmark: {
    backgroundColor: "red",
  },
});

