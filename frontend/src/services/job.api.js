import axios from "axios";

export const getAllJobs = ({ search = "", sortBy = "createdAt", sortOrder = "desc" }) => {
  let url = `/api/jobs?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return axios.get(url);
};

export const getJobById = (id) => {
  return axios.get(`/api/jobs/${id}`);
};