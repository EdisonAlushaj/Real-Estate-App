using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Configurations
{
    public class ApartmentsConfigurations : IEntityTypeConfiguration<Apartment>
    {
        public void Configure(EntityTypeBuilder<Apartment> builder)
        {
            builder.HasKey(c => c.ApartmentID);
            builder.Property(e => e.Emri).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Adresa).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Price).IsRequired();
            builder.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            builder.Property(e => e.Status).IsRequired().HasMaxLength(100);
            builder.Property(e => e.floor).IsRequired();
            builder.Property(e => e.nrDhomave).IsRequired();
            builder.Property(e => e.kaAnshensor).IsRequired();
        }
    }
}
