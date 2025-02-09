





import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator,TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import JobCard from "../components/JobCard";
import { getBookmarks, removeBookmark } from "../storage/bookmarkStorage";

export default function HomeScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Fetch jobs from API
  const fetchJobs = async (page) => {
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();
      //console.log(data);
      return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  };

  const checkBookmarkStatus = async () => {
     await getBookmarks();
     loadJobs();
    //setBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
  };
  useEffect(() => {
      const checkBookmarkStatus = async () => {
        const savedJobs = await getBookmarks();
        setBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
      };
  
      checkBookmarkStatus();
    }, []);
  useEffect(() => {
    loadJobs();

   
  }, []);

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);

    const newJobs = await fetchJobs(page);
    
    if (Array.isArray(newJobs)) {
      setJobs((prev) => [...prev, ...newJobs]);
      //setJobs(newJobs)
      //setJobs((prev) => [ ...newJobs]);

      //setPage(page + 1);
    }

    setLoading(false);
  };


  // const loadJobs = async () => {
  //   if (loading) return;
  //   setLoading(true);
  
  //   const response = await fetchJobs(1); // API only has 1 page
  //   const jobList = response?.results || []; // Ensure jobs exist
  
  //   setJobs(jobList);
  //   setLoading(false);
  // };
  
  return (
    <View style={{ flex: 1 }}>
      
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={() => navigation.navigate("JobDetails", { job: item })} />
        )}
        //onEndReached={loadJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 15,
  },
 
});
