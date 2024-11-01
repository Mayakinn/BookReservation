import React from "react";
import ReservationList from "../components/ReservationList";

const ReservationPage: React.FC = () => {
  return (
    <div>
      <h1 className="py-2 container text-center">My Reservations</h1>
      <ReservationList />
    </div>
  );
};

export default ReservationPage;
