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
    public class ShtepiaConfigurations : IEntityTypeConfiguration<Shtepia>
    {
        public void Configure(EntityTypeBuilder<Shtepia> builder)
        {
            builder.HasKey(c => c.ShtepiaID);
            builder.Property(e => e.Emri).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Adresa).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Price).IsRequired();
            builder.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            builder.Property(e => e.Status).IsRequired().HasMaxLength(100);
            builder.Property(e => e.size).IsRequired();
            builder.Property(e => e.nrFloors).IsRequired();
            builder.Property(e => e.kaGarazhd).IsRequired();
            builder.Property(e => e.kaPool).IsRequired();
        }
    }
}
