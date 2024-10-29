import React from "react";
import { Book } from "../Types/indexBook";
import { BookType, bookTypeToString } from "../Types/indexEnum";

interface BookListItemProps {
  book: Book;
  onClick: () => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, onClick }) => {
  if (!book) {
    return <div>No book information available</div>;
  }

  console.log("Rendering BookListItem:", book);

  // Decode the book types using bitwise operations
  const getBookTypes = (type: number) => {
    const types: string[] = [];
    Object.values(BookType).forEach((value) => {
      if (typeof value === "number" && (type & value) === value) {
        types.push(bookTypeToString[value as BookType]);
      }
    });
    return types.join(", ");
  };

  return (
    <div
      onClick={onClick}
      className="d-flex align-items-center justify-content-between p-3 border-bottom"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={book.pictureUrl}
          alt={book.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "10px",
            marginRight: "15px",
            objectFit: "cover",
            border: "solid 1px",
          }}
        />
        <div>
          <h4 className="mb-1">{book.name}</h4>
          <p className="mb-0">Year: {book.year}</p>
          <p className="mb-0">Type: {getBookTypes(book.type)}</p>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;

