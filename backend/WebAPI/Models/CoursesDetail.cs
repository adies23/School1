using System.Numerics;
using System.Security.Cryptography.Xml;
using System.Xml.Linq;

namespace WebAPI.Models
{
    public class CoursesDetail
    {
        public BigInteger Id { get; set; }
        public int State { get; set; }
        public string? Name { get; set; }
        public string? TimeCreated { get; set; }
        public string? StartDate { get; set; }
        public string? refTeacherId { get; set; }
        public string? refCourseId { get; set; }

    }
}
