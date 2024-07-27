import axios from "axios";
import { DataType } from "../types/DataType";
import { BASE_URL } from "./baseUrl";

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
export const fetchProfile = async (token: string, username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/get/${username}`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const createRecord = async (token: string, data: DataType) => {
  try {
    const response = await axios.post(`${BASE_URL}/data/create`, data, {
      headers: {
        "x-auth": token,
      },
    });
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
