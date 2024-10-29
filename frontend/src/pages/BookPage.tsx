import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book, } from "../Types/indexBook";
import { BookType } from "../Types/indexEnum";
import ReservationForm from "../components/ReservationForm";
import { getBookById } from "../services/api";

const BookPage: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setBook(response);

    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const typeToString: Record<BookType, string> = {
    [BookType.NormalBook]: "Normal Book",
    [BookType.Audiobook]: "Audiobook",
  };

  const bookTypeString = typeToString[book.type as BookType];

  return (
    <div className="container my-3 col-md-8 d-flex flex-column align-items-center">
      <h1>{book.name}</h1>
      <p>{bookTypeString}</p>
      <img
        src={book.pictureUrl}
        alt={book.name}
        className="my-3"
        style={{
          maxHeight: "300px",
          maxWidth: "300px",
          borderRadius: "10px",
          border: "solid black 3px",
        }}
      />
      <ReservationForm book={book} />
    </div>
  );
};

export default BookPage;