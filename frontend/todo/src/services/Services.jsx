import axios from "axios";

const BASE_URL = "http://localhost:5074/api/Users"; // Swagger’a göre

export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response.data; // { token, user } gibi dönmeli
  } catch (error) {
    console.error("Login hatası:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Register hatası:", error);
    throw error;
  }
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token bulunamadı!");
  return { Authorization: `Bearer ${token}` };
};

export const getTasks = async () => {
  const response = await axios.get("http://localhost:5074/api/Tasks", {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createTask = async (data) => {
  const response = await axios.post("http://localhost:5074/api/Tasks", data, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axios.put(
    `http://localhost:5074/api/Tasks/${id}`,
    data,
    {
      headers: getAuthHeader(),
    },
  );
  return response.data;
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5074/api/Tasks/${id}`,
      {
        headers: getAuthHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error("Silme hatası:", error);
    throw error;
  }
};
