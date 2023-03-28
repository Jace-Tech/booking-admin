import { STORAGE_NAME } from "config"
import { logMessage } from "config/functions"
import { DELETE_BOOKING_ENDPOINT } from "./base"

export const handleDeleteBooking = async (id) => {
  let token = localStorage.getItem(STORAGE_NAME)
  if(!token) return {success: false, message: "Failed to fetch", data: null}
  token = JSON.parse(token)['token']

  const options = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  try {
    const request = await fetch(DELETE_BOOKING_ENDPOINT.replace(":id", id), options);
    const response = await request.json();
    logMessage(response);
    return response
  } catch (error) {
    logMessage({error})
    return {success: false, message: error.message, data: null}
  }
}