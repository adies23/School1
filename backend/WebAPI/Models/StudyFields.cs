using System.Numerics;

namespace WebAPI.Models
{
    public class StudyFields
    {
        public BigInteger Id { get; set; }
        public String? Name { get; set; }
        public string? TimeCreated { get; set; }
        public string? State { get; set; }
    }
}
