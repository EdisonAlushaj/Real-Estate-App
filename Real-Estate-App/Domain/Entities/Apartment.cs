using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Apartment
    {
        public int ApartmentID { get; set; }
        public string Emri { get; set; }
        public string Adresa { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int floor { get; set; }
        public int nrDhomave { get; set; }
        public bool kaAnshensor { get; set; }
    }
}
