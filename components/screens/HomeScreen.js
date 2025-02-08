// import React, { useState, useEffect } from "react";
// import { View, FlatList, ActivityIndicator } from "react-native";
// import JobCard from "../components/JobCard";
// import { fetchJobs } from "../services/jobsApi";

// export default function HomeScreen({ navigation }) {
//   const [jobs, setJobs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   // const loadJobs = async () => {
//   //   if (loading) return;
//   //   setLoading(true);
//   //   const newJobs = await fetchJobs(page);
   
//   //   setJobs((prev) => [...prev, ...newJobs]);
//   //  // setPage(page + 1);
//   //  console.log(jobs);
//   //   setLoading(false);
//   // };
//   const loadJobs = async () => {
//     if (loading) return;
//     setLoading(true);
    
//     const newJobs = await fetchJobs(page);
//     console.log(newJobs);
    
//     // Ensure `newJobs` is an array before updating state
//     if (Array.isArray(newJobs)) {
//         setJobs((prev) => [...prev, ...newJobs]);
//         //setPage(page + 1);
//     }
    
//     console.log(newJobs); // Debugging: Check if data is fetched correctly
//     setLoading(false);
// };


//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={jobs}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <JobCard job={item} onPress={() => navigation.navigate("JobDetails", { job: item })} />
//         )}
//         onEndReached={loadJobs}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
//       />
//     </View>
//   );
// }






import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import JobCard from "../components/JobCard";

export default function HomeScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);

    const newJobs = await fetchJobs(page);
    
    if (Array.isArray(newJobs)) {
      setJobs((prev) => [...prev, ...newJobs]);
      //setPage(page + 1);
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={() => navigation.navigate("JobDetails", { job: item })} />
        )}
        onEndReached={loadJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}
