using BookReservation.Data;
using BookReservation.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookReservation.DTOs;

namespace BookReservation.Services
{
    public class ReservationService
    {
        private readonly ApplicationDbContext _context;

        public ReservationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetReservationsAsync()
        {
            try
            {
                return await _context.Reservations.Include(r => r.Book).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting reservations", ex);
            }
        }

        public async Task<Reservation> CreateReservationAsync(Reservation reservation)
        {
            try
            {
                reservation.TotalPrice = CalculateTotalPrice(reservation);
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                return reservation;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating reservation", ex);
            }
        }

        public decimal CalculateTotalPrice(Reservation reservation)
        {
            try
            {
                var book = _context.Books.Find(reservation.BookId);
                if (book == null)
                {
                    throw new Exception("Book not found");
                }

                decimal bookPrice;
                switch (reservation.BookType)
                {
                    case BookType.NormalBook:
                        bookPrice = 2;
                        break;
                    case BookType.Audiobook:
                        bookPrice = 3;
                        break;
                    default:
                        throw new Exception("Invalid book type");
                }

                var totalDays = (reservation.ReservationEndDate - reservation.ReservationDate).Days;

                if (totalDays <= 0)
                {
                    throw new Exception("Check-out date must be after check-in date");
                }

                var totalPrice = bookPrice * totalDays;
                if (reservation.QuickPickUpChecked)
                {
                    totalPrice += 5;
                }

                if (totalDays > 10)
                {
                    totalPrice *= 0.8m; 
                }
                else if (totalDays > 3)
                {
                    totalPrice *= 0.9m; 
                }

                return totalPrice + 3; 
            }
            catch (Exception ex)
            {
                throw new Exception("Error calculating total price", ex);
            }
        }
    }
}
