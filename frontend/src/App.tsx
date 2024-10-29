import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage"; 
import ReservationsPage from "./pages/ReservationPage"; 

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} /> 
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </>
  );
};

export default App;
