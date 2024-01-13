using System;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public UsersController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration; 
            _env = env;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select Id, State, FirstName, LastName, FullName, Birthday as Birthday, PhoneNumber, Email, isTeacher, isManager, TimeCreated as TimeCreated from Users";
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

        [HttpGet("forAddCourseDetails")]

        public JsonResult Get(string isTeacher)
        {
            string query = @"
                    select Id, State, FirstName, LastName, FullName, Birthday as Birthday, PhoneNumber, Email, isTeacher, isManager, TimeCreated as TimeCreated from Users 
                    where isTeacher = N'" + isTeacher + @"'";
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
        public JsonResult Post(Users user)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                string isExistEmailQuery = @"
                    select Id from Users where Email = '" + user.Email + @"'";

                //string query = @"
                //        update Users set Birthday = '2024-1-1' where id = 1";
                string query = @"
                    insert into Users (State, isManager, FirstName, LastName, FullName, TimeCreated, Birthday, Email, PhoneNumber, isTeacher) 
                    values (1,'" + user.isManager + @"',N'" + user.FirstName + @"',N'" + user.LastName + @"',N'" + user.FullName
                        + @"', getdate(),'" + user.Birthday + @"','" + user.Email + @"','" + user.PhoneNumber + @"','" + user.isTeacher + @"') ";

                myCon.Open();

                using (SqlCommand myCommandExistMail = new SqlCommand(isExistEmailQuery, myCon))
                {
                    long count = 0;
                    if (myCommandExistMail.ExecuteScalar() != null)
                    {
                        count = (long)myCommandExistMail.ExecuteScalar();
                    }                    

                    if (count > 0)
                    {
                        return new JsonResult("Email already exists");
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
        public JsonResult Put(Users user)
        {
            //string query = @"
            //        update Users set Birthday = '2024-1-1' where id = 1";
            string query = @"
                    update Users
                    set Birthday = '" + user.Birthday +@"'
                    where id = " + user.Id ;
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
        public JsonResult Delete(Users user)
        {
            //string query = @"
            //        update Users set Birthday = '2024-1-1' where id = 1";
            string query = @"
                    delete from Users
                    where id = " + user.Id ;
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

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult("File \"" + fileName + "\" Created");
            } catch(Exception){
                return new JsonResult("File not Created");
            }
        }
    }
}
