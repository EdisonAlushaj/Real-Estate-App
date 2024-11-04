using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Prona> Pronas { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Shtepia> Shtepiat { get; set; }
        public DbSet<Toka> Tokat { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Prona>().ToTable("Pronas");
            modelBuilder.Entity<Apartment>().ToTable("Apartments");
            modelBuilder.Entity<Toka>().ToTable("Tokat");
            modelBuilder.Entity<Shtepia>().ToTable("Shtepiat");

            // Configure TPT inheritance
            modelBuilder.Entity<Apartment>()
                .HasBaseType<Prona>();

            modelBuilder.Entity<Toka>()
                .HasBaseType<Prona>();

            modelBuilder.Entity<Shtepia>()
                .HasBaseType<Prona>();
        }
    }
}
