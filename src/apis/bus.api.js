import { logMessage } from "config/functions";
import { DELETE_BUS_ENDPOINT, ROUTE_BUSES_ENDPOINT, UPDATE_BUS_ENDPOINT } from "./base";
import { STORAGE_NAME } from "config";

export const handleGetRouteBuses = async (id) => {
  try {
    const request = await fetch(ROUTE_BUSES_ENDPOINT.replace(":id", id));
    const response = await request.json();
    logMessage(response);
    return response;
  } catch (error) {
    logMessage({ error });
    return { success: false, message: error.message, data: null };
  }
};


export const handleDeleteBus = async (id) => {
  let token = localStorage.getItem(STORAGE_NAME);
  if (!token) return { success: false, message: "Failed to fetch", data: null };
  token = JSON.parse(token)["token"];

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const request = await fetch(
      DELETE_BUS_ENDPOINT.replace(":id", id),
      options
    );
    const response = await request.json();
    logMessage(response);
    return response;
  } catch (error) {
    logMessage({ error });
    return { success: false, message: error.message, data: null };
  }
};

export const handleUpdateBus = async (id, data) => {
  let token = localStorage.getItem(STORAGE_NAME);
  if (!token) return { success: false, message: "Failed to fetch", data: null };
  token = JSON.parse(token)["token"];

  const options = {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const request = await fetch(
      UPDATE_BUS_ENDPOINT.replace(":id", id),
      options
    );
    const response = await request.json();
    logMessage(response);
    return response;
  } catch (error) {
    logMessage({ error });
    return { success: false, message: error.message, data: null };
  }
};