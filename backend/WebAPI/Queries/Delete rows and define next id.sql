
delete from Users where id > 3

--DBCC CHECKIDENT ('Users', RESEED, 3); -> Next ID will be 4 
DBCC CHECKIDENT ('Users', RESEED, 3);