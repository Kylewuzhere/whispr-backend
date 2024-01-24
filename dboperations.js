require('dotenv').config;
const sql = require('mssql/msnodesqlv8');
const sqlConfig = require('./dbconfig.js');

const getUserAccount = async (account) => {
  await sql.connect(sqlConfig);
  console.log('connected');

  const result = await sql.query(
    `SELECT *
    FROM [WhisprSocial].[dbo].[users] 
    WHERE [google_id]=${account.sub}`
  );

  return result.recordset;
};

const getUserId = async (account) => {
  await sql.connect(sqlConfig);
  console.log('connected');

  const result = await sql.query(
    `SELECT [id] 
      FROM [WhisprSocial].[dbo].[users] 
      WHERE [google_id]=${account.sub}`
  );

  return result.recordset[0].id;
};

const insertAccount = async ({ name, picture, sub }) => {
  await sql.connect(sqlConfig);
  console.log('connected');

  const result = await sql.query(
    `INSERT INTO [WhisprSocial].[dbo].[users] ([username],[img],[google_id]) VALUES ('${name}','${picture}','${sub}');`
  );

  return result.recordset;
};

// const getEmployees = async () => {
//   try {
//     await sql.connect(sqlConfig);
//     console.log('connected');
//     const result = await sql.query(`SELECT TOP (1000) [EmployeeId],
//     [Name],
//     [Age],
//     [Position],
//     [CompanyId]
//     FROM [CompanyEmployee].[dbo].[Employees]`);
//     return result.recordset;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getCompanies = async () => {
//   try {
//     await sql.connect(sqlConfig);
//     console.log('connected');
//     const result = await sql.query(`SELECT TOP (1000) [CompanyId],
//     [Name],
//     [Address],
//     [Country]
//     FROM [CompanyEmployee].[dbo].[Companies]`);

//     loadSql
//     return result.recordset;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = { getUserAccount, getUserId, insertAccount };
