// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import BookmarkButton from "../components/BookmarkButton";

// export default function JobDetailScreen({ route }) {
//   const { job } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{job.title}</Text>
//       <Text>Company Name{job.company_name}</Text>
//       <Text>city:{job.city_location}</Text>
//       <Text>{job.description}</Text>
//       <BookmarkButton job={job} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 }
// });















// import React from "react";
// import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Icon library
// import BookmarkButton from "../components/BookmarkButton";

// export default function JobDetailScreen({ route }) {
//   const { job } = route.params;

//   const handleCallHR = () => {
//     if (job.custom_link) {
//       Linking.openURL(job.custom_link);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Job Title */}
//       <Text style={styles.title}>{job.title}</Text>

//       {/* Company Info */}
//       <View style={styles.section}>
//         <Ionicons name="business-outline" size={20} color="#555" />
//         <Text style={styles.companyName}>{job.company_name}</Text>
//       </View>

//       {/* Location */}
//       <View style={styles.section}>
//         <Ionicons name="location-outline" size={20} color="#555" />
//         <Text style={styles.detailText}>{job.job_location_slug}</Text>
//       </View>

//       {/* Job Role & Type */}
//       <View style={styles.section}>
//         <Ionicons name="briefcase-outline" size={20} color="#555" />
//         <Text style={styles.detailText}>{job.job_role} ({job.job_hours})</Text>
//       </View>

//       {/* Salary */}
//       <View style={styles.section}>
//         <Ionicons name="cash-outline" size={20} color="#555" />
//         <Text style={styles.detailText}>{job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : "Salary Not Disclosed"}</Text>
//       </View>

//       {/* Experience */}
//       <View style={styles.section}>
//         <Ionicons name="calendar-outline" size={20} color="#555" />
//         <Text style={styles.detailText}>Experience: {job.primary_details?.Experience || "Not mentioned"}</Text>
//       </View>

//       {/* Job Description */}
//       <Text style={styles.subHeading}>Job Description</Text>
//       <Text style={styles.description}>{job.description || "No description available"}</Text>

//       {/* Call HR Button */}
//       <TouchableOpacity style={styles.callButton} onPress={handleCallHR}>
//         <Ionicons name="call-outline" size={20} color="#fff" />
//         <Text style={styles.callButtonText}>{job.button_text || "Call HR"}</Text>
//       </TouchableOpacity>

//       {/* Bookmark Button */}
//       <BookmarkButton job={job} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   section: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 8,
//     color: "#555",
//   },
//   detailText: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: "#666",
//   },
//   subHeading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 15,
//     marginBottom: 5,
//     color: "#444",
//   },
//   description: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 20,
//   },
//   callButton: {
//     flexDirection: "row",
//     backgroundColor: "#007BFF",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 15,
//   },
//   callButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     marginLeft: 8,
//   },
// });



import React from "react";
import { 
  View, Text, Button, StyleSheet, TouchableOpacity, Linking, ScrollView, Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon library
import BookmarkButton from "../components/BookmarkButton";

export default function JobDetailScreen({ route }) {
  const { job } = route.params;

  const handleCallHR = () => {
    if (job.custom_link) {
      Linking.openURL(job.custom_link);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Job Header */}
      <View style={styles.header}>
        {/* Job Logo */}
        {job.creatives?.length > 0 && job.creatives[0]?.thumb_url ? (
          <Image source={{ uri: job.creatives[0].thumb_url }} style={styles.logo} />
        ) : (
          <Ionicons name="image-outline" size={50} color="#ccc" style={styles.logoPlaceholder} />
        )}

        {/* Job Title & Company */}
        <View style={styles.headerText}>
          {/* <Text style={styles.title}>{job.title}</Text> */}
          <Text style={styles.companyName}>{job.company_name}</Text>
        </View>
      </View>
      <View style={styles.section}>
        {/* //<Ionicons name="call-outline" size={20} color="#555" /> */}
        <Text style={styles.detailText}>
          Job Id: {job.id || "Not mentioned"}
        </Text>
      </View>
      {/* Location */}
      <View style={styles.section}>
        <Ionicons name="location-outline" size={20} color="#555" />
        <Text style={styles.detailText}>{job.job_location_slug}</Text>
      </View>

      {/* Job Role & Type */}
      <View style={styles.section}>
        <Ionicons name="briefcase-outline" size={20} color="#555" />
        <Text style={styles.detailText}>{job.job_role} ({job.job_hours})</Text>
      </View>

      {/* Salary */}
      <View style={styles.section}>
        <Ionicons name="cash-outline" size={20} color="#555" />
        <Text style={styles.detailText}>
          {job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : "Salary Not Disclosed"}
        </Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Ionicons name="calendar-outline" size={20} color="#555" />
        <Text style={styles.detailText}>
          Experience: {job.primary_details?.Experience || "Not mentioned"}
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="call-outline" size={20} color="#555" />
        <Text style={styles.detailText}>
          contact: {job.whatsapp_no || "Not mentioned"}
        </Text>
      </View>

      <View style={styles.section}>
        {/* <Ionicons name="call-outline" size={20} color="#555" /> */}
        <Text style={styles.detailText}>
          category: {job.job_category || "Not mentioned"}
        </Text>
      </View>
      <View style={styles.section}>
        {/* //<Ionicons name="call-outline" size={20} color="#555" /> */}
        <Text style={styles.detailText}>
          Applied: {job.num_applications || "Not mentioned"}
        </Text>
      </View>
      <View style={styles.section}>
        {/* //<Ionicons name="call-outline" size={20} color="#555" /> */}
        <Text style={styles.detailText}>
          Openings: {job.openings_count || "Not mentioned"}
        </Text>
      </View>

      {/* Job Description */}
      <Text style={styles.subHeading}>Job Description</Text>
      <Text style={styles.description}>{job.title || "No description available"}</Text>

      {/* Call HR Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCallHR}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.callButtonText}>{job.button_text || "Call HR"}</Text>
      </TouchableOpacity>

      {/* Bookmark Button */}
      <BookmarkButton job={job} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#666",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#444",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  callButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 8,
  },
});

