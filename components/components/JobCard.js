// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function JobCard({ job, onPress }) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Text style={styles.title}>{job.title}</Text>
//       <Text>{job.company_name}</Text>
//       <Text>{job.city_location}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: { padding: 15, margin: 10, backgroundColor: "#fff", borderRadius: 8, elevation: 2 },
//   title: { fontSize: 18, fontWeight: "bold" }
// });




import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon library for icons

export default function JobCard({ job, onPress }) {
  return (
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
        {/* <Text style={styles.jobId}> {job.job_hours}</Text> */}

        <View style={styles.locationContainer}>
        <Ionicons name="briefcase-outline" size={16} color="#555" />
        <Text style={styles.detailText}>{job.job_role} ({job.job_hours})</Text>
      </View>

        {/* <Text style={styles.jobRole}>{job.job_role}</Text> */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{job.job_location_slug}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
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
  jobRole: {
    fontSize: 14,
    color: "#444",
    marginVertical: 3,
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
});
