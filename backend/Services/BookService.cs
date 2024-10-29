using BookReservation.Data;
using BookReservation.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookReservation.Services
{
    public class BookService
    {
        private readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetBookAsync()
        {
            try
            {
                return await _context.Books.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting books", ex);
            }
        }

        public async Task<IEnumerable<Book>> SearchBooksAsync(string? name, int? year, BookType? type)
        {
            // Build the query
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(b => b.Name.Contains(name));
            }

            if (year.HasValue)
            {
                query = query.Where(b => b.Year == year.Value);
            }

            if (type.HasValue)
            {
                query = query.Where(b => (b.Type & type.Value) == type.Value); // Bitwise check for type
            }

            return await query.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(Guid id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    throw new Exception("Book not found");
                }
                return book;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting book", ex);
            }
        }
    }
}
