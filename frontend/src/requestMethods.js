import axios from "axios";

const BASE_URL = "http://localhost:3500/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY0NzA3MDI2Zjg5YzNmMzc3NWEyYzY1OCIsImVtYWlsIjoiZ2lhbm5pczM0QGV4YW1wbGUuY29tIiwicm9sZXMiOlsiQ3VzdG9tZXIiLCJBZG1pbiJdfSwiaWF0IjoxNjg1NzcwNDU2LCJleHAiOjE2ODU4NTY4NTZ9.x_089q9m0qCrmEHdWmNkwahskoT-ek1o-av7Osh92tM"
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
