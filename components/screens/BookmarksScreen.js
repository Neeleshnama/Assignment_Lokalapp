import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import JobCard from "../components/JobCard";
import { getBookmarks } from "../storage/bookmarkStorage";

export default function BookmarksScreen({ navigation }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const jobs = await getBookmarks();
      setBookmarkedJobs(jobs);
    };
    loadBookmarks();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={() => navigation.navigate("JobDetails", { job: item })} />
        )}
      />
    </View>
  );
}
