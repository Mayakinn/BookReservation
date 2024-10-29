import React, { useEffect, useState } from "react";
import { Book } from "../Types/indexBook";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import { getBooks, searchBooks } from "../services/api";
import { bookTypeToString, BookType } from "../Types/indexEnum";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchYear, setSearchYear] = useState<string>("");
  const [searchType, setSearchType] = useState<BookType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getBooks();
      setBooks(allBooks);
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();

    if (searchName.trim()) queryParams.append("name", searchName);
    if (searchYear.trim()) queryParams.append("year", searchYear);
    if (searchType !== null) queryParams.append("type", searchType.toString());

    const booksData = await searchBooks(queryParams.toString());
    setBooks(booksData);
  };

  const handleReset = async () => {
    setSearchName("");
    setSearchYear("");
    setSearchType(null);
    const allBooks = await getBooks();
    setBooks(allBooks);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100 text-center py-1 bg-dark">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="bg-dark text-light rounded-pill px-2"
          style={{ borderColor: "white" }}
          placeholder="Search by name"
        />
        <input
          type="number"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="bg-dark text-light rounded-pill px-2 mx-2"
          style={{ borderColor: "white" }}
          placeholder="Search by year"
        />
        <select
          value={searchType !== null ? searchType : ""}
          onChange={(e) =>
            setSearchType(
              e.target.value ? (Number(e.target.value) as BookType) : null
            )
          }
          className="bg-dark text-light rounded-pill px-2"
        >
          <option value="">Select Type</option>
          {Object.values(BookType)
            .filter((value) => typeof value === "number")
            .map((value) => (
              <option key={value} value={value}>
                {bookTypeToString[value as BookType]}
              </option>
            ))}
        </select>
        <button onClick={handleSearch} className="btn btn-primary mx-2">
          Search
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
      <h1 className="py-2 container text-center">Book List</h1>
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => navigate(`/book/${book.id}`)} // Navigate to the ReservationForm or Book Details page
            />
          ))
        ) : (
          <div className="text-center py-3">
            <p>No books found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
