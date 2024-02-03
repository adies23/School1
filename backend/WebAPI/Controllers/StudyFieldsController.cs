using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudyFieldsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudyFieldsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select Id, State, Name, TimeCreated
                    from StudyField
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
        public JsonResult Post(StudyFields StudyField)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                string isExistNameQuery = @"
                    select Id from StudyField where Name = '" + StudyField.Name + @"'";

                string query = @"
                        insert into StudyField (Name, state, TimeCreated)
                        values (N'" + StudyField.Name + @"',1 ,getdate() ) ";

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
        public JsonResult Put(StudyFields StudyField)
        {
            string query = @"
                    update StudyField
                    set Name = '" + StudyField.Name + @"'
                    where id = " + StudyField.Id;
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
        public JsonResult Delete(StudyFields StudyField)
        {
            //string query = @"
            //        update Users set Birthday = '2024-1-1' where id = 1";
            string query = @"
                    delete from StudyField
                    where id = " + StudyField.Id;
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
