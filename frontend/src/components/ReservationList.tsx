import React, { useEffect, useState } from "react";
import { Reservation } from "../Types/indexReservation";
import { getReservations } from "../services/api";

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservations();
        setReservations(response);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Reservations List</h1>
      <ul className="list-group">
        {reservations.map((reservation) => (
          <li className="list-group-item" key={reservation.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Book ID: {reservation.bookId}</h5>
                <p className="mb-1">Book Type: {reservation.bookType}</p>
                <p className="mb-1">Quick Pickup: {reservation.quickPickUpChecked ? "Yes" : "No"}</p>
                <p className="mb-1">
                  Reservation Dates: {formatDate(reservation.reservationDate)} to {formatDate(reservation.reservationEndDate)}
                </p>
                <h6 className="mb-0">Total Price: {reservation.totalPrice}€</h6>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
