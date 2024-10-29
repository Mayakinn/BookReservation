using Microsoft.AspNetCore.Mvc;
using BookReservation.Data;
using BookReservation.Models;
using BookReservation.DTOs;
using BookReservation.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace BookReservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ReservationService _ReservationService;

        public ReservationsController(ReservationService ReservationService)
        {
            _ReservationService = ReservationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            try{
            var reservation = await _ReservationService.GetReservationsAsync();
            return Ok(reservation);
            }catch(Exception ex){
                return BadRequest(new { message = "Error getting Reservations", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> CreateReservation([FromBody] ReservationDto reservationDto)
        {
            Console.WriteLine("Received request to create reservation");
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var reservation = new Reservation
                {
                    BookId = reservationDto.BookId,
                    BookType = reservationDto.BookType,
                    QuickPickUpChecked = reservationDto.QuickPickUpChecked,
                    ReservationDate = reservationDto.ReservationDate,
                    ReservationEndDate = reservationDto.ReservationEndDate
                };
                var createdReservation = await _ReservationService.CreateReservationAsync(reservation);
                return CreatedAtAction(nameof(GetReservations), new { id = createdReservation.Id }, createdReservation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating Reservation", details = ex.Message });
            }
        }
    }
}
