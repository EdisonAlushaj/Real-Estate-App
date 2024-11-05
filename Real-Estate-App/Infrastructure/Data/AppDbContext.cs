using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Prona> Pronas { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Shtepia> Shtepiat { get; set; }
        public DbSet<Toka> Tokat { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Important: Call the base method to apply Identity configurations
            base.OnModelCreating(modelBuilder);

            // Custom table mappings
            modelBuilder.Entity<Prona>().ToTable("Pronas");
            modelBuilder.Entity<Apartment>().ToTable("Apartments");
            modelBuilder.Entity<Toka>().ToTable("Tokat");
            modelBuilder.Entity<Shtepia>().ToTable("Shtepiat");

            // Configure inheritance strategy if required
            modelBuilder.Entity<Apartment>().HasBaseType<Prona>();
            modelBuilder.Entity<Toka>().HasBaseType<Prona>();
            modelBuilder.Entity<Shtepia>().HasBaseType<Prona>();
        }
    }
}
