import data from "../data/galery.json";
import categoryData from "../data/category.json";

class GaleryJson {
  // Method to get all data
  static getAllData() {
    return data; // No need to parse again, as it's already a JavaScript object
  }

  // Method to get an item by its ID
  static getById(id) {
    return data.find((item) => item.id == id);
  }

  static getCategories() {
    // console.log(categoryData);
    return categoryData;
  }

  static getJobs(limit = 5) {
    const jobs = [];

    for (const category of categoryData) {
      for (const job of category.jobs) {
        if (jobs.length < limit) {
          job.category = category.name;
          jobs.push(job);
        } else {
          return jobs;
        }
      }
    }

    return jobs;
  }

  static getJobsByCategory(query) {
    console.log(query);
    const jobs = [];
    for (const category of categoryData) {
      if (category.name == query) {
        return category.jobs;
      }
    }
    return [];
  }

  static getJobById(jobId) {
    console.log("job : " + jobId);
    for (const category of categoryData) {
      const job = category.jobs.find((job) => job.id == jobId);
      if (job) {
        job.category = category;
        return job;
      }
    }
    return null;
  }
}

export { GaleryJson };
