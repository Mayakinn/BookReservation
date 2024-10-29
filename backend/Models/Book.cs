namespace BookReservation.Models
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty; 
        public int Year { get; set; }= int.MinValue;
        public string PictureUrl { get; set; }= String.Empty;
        public BookType Type { get; set; }
    }
}
