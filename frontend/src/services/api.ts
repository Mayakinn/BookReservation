import { Reservation } from "../Types/indexReservation"; // Import the updated types
import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:5187/api",
});

export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
};

export const searchBooks = async (queryParams: string) => {
  try {
    const response = await api.get(`/books/search?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};


export const getBookById = async (id: string) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting book by id:", error);
    throw error;
  }
};

export const createReservation = async (reservationData: Reservation) => {
  try {
    const response = await api.post("/reservations", reservationData);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await api.get("/reservations");
    return response.data;
  } catch (error) {
    console.error("Error getting reservations:", error);
    throw error;
  }
};
