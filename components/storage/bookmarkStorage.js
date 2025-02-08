import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_KEY = "bookmarked_jobs";

export async function saveBookmark(job) {
  let bookmarks = await getBookmarks();
  bookmarks.push(job);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export async function getBookmarks() {
  const storedJobs = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return storedJobs ? JSON.parse(storedJobs) : [];
}

export async function removeBookmark(jobId) {
  let bookmarks = await getBookmarks();
  bookmarks = bookmarks.filter((job) => job.id !== jobId);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}
