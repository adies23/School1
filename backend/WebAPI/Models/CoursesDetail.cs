using System.Numerics;
using System.Security.Cryptography.Xml;
using System.Xml.Linq;

namespace WebAPI.Models
{
    public class CoursesDetails
    {
        public BigInteger Id { get; set; }
        public int State { get; set; }
        public string? Name { get; set; }
        public string? TimeCreated { get; set; }
        public string? StartDate { get; set; }
        public BigInteger? refTeacherId { get; set; }
        public BigInteger? refCourseId { get; set; }

    }
}
