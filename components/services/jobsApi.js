export async function fetchJobs(page) {
    const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=1`);
   // return response.json();

    const data = await response.json();
    //console.log(data);

    // Ensure the response contains a valid array
    return Array.isArray(data.jobs) ? data.jobs : [];
  }
  