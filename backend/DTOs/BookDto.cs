using BookReservation.Models;

namespace BookReservation.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Year { get; set; }= String.Empty;
        public string PictureUrl { get; set; }= String.Empty;

        public BookType Type { get; set; }

    }
}
