using Microsoft.AspNetCore.Mvc;
using BookReservation.Data;
using BookReservation.Models;
using BookReservation.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            try
            {
                var books = await _bookService.GetBookAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error getting books", details = ex.Message });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Book>>> SearchBooks(
            [FromQuery] string? name,
            [FromQuery] int? year,
            [FromQuery] BookType? type)
        {
            try
            {
                var books = await _bookService.SearchBooksAsync(name, year, type);
                if (books == null || !books.Any()) // Check if the result is null or empty
                {
                    return NotFound(new { message = "No books found matching the criteria." });
                }
                return Ok(books);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error searching for books", details = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
            try
            {
                var book = await _bookService.GetBookByIdAsync(id);
                if (book == null)
                {
                    return NotFound(new { message = $"Book with ID {id} not found." });
                }
                return Ok(book);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error getting book", details = ex.Message });
            }
        }
    }
}
