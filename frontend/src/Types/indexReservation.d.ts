export interface Reservation {
    id?: number;
    bookId: string;
    bookType: BookType;
    quickPickUpChecked: boolean;
    reservationDate: string;
    reservationEndDate: string;
    totalPrice?: number;
  }