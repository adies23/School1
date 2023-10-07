using System.Numerics;

namespace WebAPI.Models
{
    public class Users
    {
        public BigInteger Id { get; set; }
        public int State { get; set; }
        public string? isManager { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? TimeCreated { get; set; }
        public string? Birthday { get; set; }
        public string? isTeacher { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

    }
}
