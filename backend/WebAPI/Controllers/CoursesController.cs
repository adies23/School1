using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CoursesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select Id, State, Name, TimeCreated
                    from Courses
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
        public JsonResult Post(Courses Course)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                string isExistNameQuery = @"
                    select Id from Courses where Name = '" + Course.Name + @"'";

                string query = @"
                        insert into Courses (Name, state, TimeCreated)
                        values (N'" + Course.Name + @"',1 ,getdate() ) ";

                myCon.Open();

                using (SqlCommand myCommandExistName = new SqlCommand(isExistNameQuery, myCon))
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

        [HttpPut]
        public JsonResult Put(Courses Course)
        {
            string query = @"
                    update Courses
                    set Name = '" + Course.Name + @"'
                    where id = " + Course.Id;
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

            return new JsonResult("Update Successfuly");
        }

        [HttpDelete]
        public JsonResult Delete(Courses Course)
        {
            //string query = @"
            //        update Users set Birthday = '2024-1-1' where id = 1";
            string query = @"
                    delete from Courses
                    where id = " + Course.Id;
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

            return new JsonResult("Delete Successfuly");
        }
    }
}
