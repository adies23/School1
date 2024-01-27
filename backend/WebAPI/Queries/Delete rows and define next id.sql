
delete from Users where id > 3

--DBCC CHECKIDENT ('Users', RESEED, 3); -> Next ID will be 4 
DBCC CHECKIDENT ('Users', RESEED, 3);


delete from Courses where id > 5

--DBCC CHECKIDENT ('Courses', RESEED, 5); -> Next ID will be 6
DBCC CHECKIDENT ('Courses', RESEED, 5);


delete from CoursesDetails

--DBCC CHECKIDENT ('CoursesDetails', RESEED, 0); -> Next ID will be 1
DBCC CHECKIDENT ('CoursesDetails', RESEED, 0);