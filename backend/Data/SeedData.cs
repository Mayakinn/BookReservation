using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookReservation.Models;
using System;
using System.Linq;

namespace BookReservation.Data
{
     public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

            if (context.Books.Any() || context.Books.Any())
            {
                return; 
            }
            context.Books.AddRange(
                new Book
                {
                    Id = Guid.NewGuid(),
                    Name = "Book1",
                    Year = 1999,
                    PictureUrl = "https://thumb.knygos-static.lt/ewD5o33JRc9pBscbmFruDfLTEHw=/fit-in/0x800/https://libri-media.knygos-static.lt/2a1dc82e-ed1e-4350-91a7-5127a2241b82/1",
                    Type = BookType.Audiobook | BookType.NormalBook

                },
                new Book
                {
                    Id=Guid.NewGuid(),
                    Name = "Book2",
                    Year = 3000,
                    PictureUrl = "https://thumb.knygos-static.lt/ib8JQdtC65qPMf-MIgWoj22ztMw=/fit-in/0x800/images/books/744081/1462885400_vmpaltoriusesely72max.jpg",
                    Type = BookType.NormalBook
                }
            );
            context.SaveChanges();
        }
    }
}