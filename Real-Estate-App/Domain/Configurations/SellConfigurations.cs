﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Configurations
{
    public class SellConfigurations : IEntityTypeConfiguration<Sell>
    {
        public void Configure(EntityTypeBuilder<Sell> builder)
        {
            builder.HasKey(c => c.SellID);
            builder.Property(e => e.SaleDate).IsRequired().HasDefaultValueSql("GETDATE()");
            builder.Property(e => e.SalePrice).IsRequired();
            builder.Property(e => e.Commision).IsRequired();
            builder.Property(e => e.PaymentMethod).IsRequired().HasMaxLength(100);
            
            //builder.HasMany(c => c.Property)
            //    .WithMany()
            //    .HasForeignKey(c => c.PropertyID)
            //    .OnDelete(DeleteBehavior.NoAction);
        }
    }
}