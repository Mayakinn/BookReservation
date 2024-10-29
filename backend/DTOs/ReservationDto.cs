using BookReservation.Models;


namespace BookReservation.DTOs
{
    public class ReservationDto
    {
        public Guid BookId { get; set; }
        public BookType BookType { get; set; }
        public bool QuickPickUpChecked { get; set; }
        public DateTime ReservationDate { get; set; }
        public DateTime ReservationEndDate { get; set; }
    }
}
