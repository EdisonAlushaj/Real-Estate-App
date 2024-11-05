using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Sell
    {
        public int SellID { get; set; }
        public DateTime SaleDate { get; set; }
        public double SalePrice { get; set; }
        public double Commision { get; set; }
        public string PaymentMethod { get; set; }


        public int PropertyID { get; set; }
        public Property Property { get; set; }
    }
}
