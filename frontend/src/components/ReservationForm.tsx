import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reservation } from "../Types/indexReservation";
import { Book } from "../Types/indexBook";
import { createReservation } from "../services/api";
import { bookTypeToString, BookType } from "../Types/indexEnum";

interface ReservationFormProps {
  book: Book;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ book }) => {
  const [bookType, setBookType] = useState<BookType | null>(null);
  const [quickPickUpChecked, setQuickPickUpChecked] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationEndDate, setReservationEndDate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();

  const availableTypes: BookType[] = [];

  Object.values(BookType).forEach((type) => {
    if (typeof type === "number" && (book.type & type) === type) {
      availableTypes.push(type);
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    
    if (!bookType) {
      alert("Please select a book type.");
      return;
    }
    if (reservationDate === "" || reservationEndDate === "") {
      setErrorMessage("Both dates must be selected.");
      return;
    }
    if (new Date(reservationEndDate) < new Date(reservationDate)) {
      setErrorMessage("End date must be later than the start date.");
      return;
    }
    if (new Date(reservationEndDate) == new Date(reservationDate)) {
      setErrorMessage("Date can not be the same");
      return;
    }
    let dateTime = new Date()
    dateTime.setDate(dateTime.getDate() - 1);
    if (dateTime > new Date(reservationDate)) {
      setErrorMessage("Reservation must not be earlier than Today.");
      return;
    }

    setShowConfirmation(true);
  };

  const handleAcceptReservation = async () => {
    if (!bookType) return;
    const reservation: Reservation = {
      bookId: book.id,
      bookType,
      quickPickUpChecked,
      reservationDate,
      reservationEndDate,
    };

    try {
      await createReservation(reservation);
      navigate("/reservations");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  if (showConfirmation) {
    return (
      <div className="container my-3 col-md-8 d-flex flex-column align-items-center">
        <h3>Your reservation is ready for confirmation!</h3>
        <button className="btn btn-primary" onClick={handleAcceptReservation}>
          Confirm Reservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container p-4"
        style={{ borderRadius: "20px", border: "solid black 2px" }}
      >
        <div>
          <label className="px-3 my-1">Book Type:</label>
          <select
            value={bookType || ""}
            className="form-control"
            onChange={(e) => setBookType(Number(e.target.value) as BookType)}
          >
            <option value="" disabled>Select a book type</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {bookTypeToString[type]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="px-3 my-1">Quick Pickup (€5):</label>
          <input
            type="checkbox"
            checked={quickPickUpChecked}
            onChange={(e) => setQuickPickUpChecked(e.target.checked)}
          />
        </div>
        <div>
          <label className="px-3 my-1">Reservation Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </div>
        <div>
          <label className="px-3 my-1">Reservation End Date:</label>
          <input
            type="date"
            className="form-control"
            value={reservationEndDate}
            onChange={(e) => setReservationEndDate(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="text-danger my-2">{errorMessage}</div>
        )}
        <button className="container my-2 btn bg-success" type="submit">
          Reserve
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
