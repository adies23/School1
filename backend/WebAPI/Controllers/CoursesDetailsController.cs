using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CoursesDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select Id, State, Name, convert(varchar, TimeCreated, 29) as TimeCreated
                    from CoursesDetails
                    where state = 1";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(CoursesDetails CoursesDetail)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                string isExistQuery = @"
                    select id
                    from CoursesDetails
                    where State = 1
	                    and (StartDate = " + CoursesDetail.StartDate + @" or refCourseId = " + CoursesDetail.refCourseId + @" or refTeacherId = " + CoursesDetail.refTeacherId + @")";
                
                string query = @"
                        insert into CoursesDetails (Name, State, TimeCreated, StartDate, refCourseId, refTeacherId)
                        values (N'" + CoursesDetail.Name + @"', 1, getdate(), " + CoursesDetail.StartDate + @", " + CoursesDetail.refCourseId + @", " + CoursesDetail.refTeacherId + @")";

                myCon.Open();

                using (SqlCommand myCommandExistName = new SqlCommand(isExistQuery, myCon))
                {
                    //check why when i try to inert row i got error
                    long count = 0;
                    if (myCommandExistName.ExecuteScalar() != null)
                    {
                        count = (long)myCommandExistName.ExecuteScalar();
                    }

                    if (count > 0)
                    {
                        return new JsonResult("Name already exists");
                    }
                    else
                    {
                        using (SqlCommand myCommand = new SqlCommand(query, myCon))
                        {
                            myReader = myCommand.ExecuteReader();
                            table.Load(myReader);

                            myReader.Close();
                            myCon.Close();
                        }
                    }
                }
            }
            return new JsonResult("Added Successfuly");
        }
    }
}
