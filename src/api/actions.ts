import axios from "axios";
import { DataType } from "../types/DataType";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://backendspa-i6dw.onrender.com";
// const BASE_URL = "http://localhost:5000";
export const fetchData = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/get`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data.data;
  } catch (err) {
    localStorage.removeItem("token");
  }
};

export const createRecord = async (token: string, data: DataType) => {
  try {
    const response = await axios.post(`${BASE_URL}/data/create`, data, {
      headers: {
        "x-auth": token,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateRecord = async (
  token: string,
  id: string,
  data: DataType
) => {
  const response = await axios.post(`${BASE_URL}/data/set/${id}`, data, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data;
};

export const deleteRecord = async (token: string, id: string) => {
  const response = await axios.post(`${BASE_URL}/data/delete/${id}`, null, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data;
};
