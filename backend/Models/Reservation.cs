namespace BookReservation.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public Guid BookId { get; set; }
        public BookType BookType { get; set; }
        public bool QuickPickUpChecked { get; set; }
        public DateTime ReservationDate { get; set; }
        public DateTime ReservationEndDate { get; set; }
        public decimal TotalPrice { get; set; }
        public Book Book { get; set; } = default!;
    }
}

