import axios from "axios";
import { DataType } from "../types/DataType";

const BASE_URL = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

export const fetchData = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/userdocs/get`, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data.data;
};

export const createRecord = async (token: string, data: DataType) => {
  const response = await axios.post(`${BASE_URL}/userdocs/create`, data, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data;
};

export const updateRecord = async (
  token: string,
  id: string,
  data: DataType
) => {
  const response = await axios.post(`${BASE_URL}/userdocs/set/${id}`, data, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data;
};

export const deleteRecord = async (token: string, id: string) => {
  const response = await axios.post(`${BASE_URL}/userdocs/delete/${id}`, null, {
    headers: {
      "x-auth": token,
    },
  });
  return response.data;
};
