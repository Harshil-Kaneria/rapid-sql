
# Rapid Sql

This package is Developed for Fast And Easy Data Operation in Mysql And Provide Pre Build Some Function For Execute Database Operations Fast and Rapidly.


## Installation

```bash
  npm install rapid-sql
```
    
## Usage/Examples

```javascript

// Import Our Package (Thank You !)
const rapid = require('rapid-sql')


// Add This Lines In Your .env File
R_HOST=YOUR_DB_HOST
R_USER=YOUR_DB_USERNAME
R_PASSWORD=YOUR_DB_PASSWORD
R_DATABASE=YOUR_DB_NAME


// Our Function List

1.execute_query(query,data);
2.execute_query_R(query,data);

3.getData(row,table,where,group,order,data,exit);
4.getData_R(row,table,where,group,order,data,exit);

5.getJoinData(row,table,join,where,group,order,data,exit);
6.getJoinData_R(row,table,join,where,group,order,data,exit);

7.insertData(table,data,exit);
8.insertData_R(table,data,exit);

9.insertMultiData(table,column,data,exit);
10.insertMultiData_R(table,column,data,exit);

11.updateData(table,data,where,where_data,exit);
12.updateData_R(table,data,where,where_data,exit);

13.deleteData(table,where,data,exit);
14.deleteData_R(table,where,data,exit);

// Don't Worry And Don't confuse Let's See All Example One By One With Proper Explanaion

let data = ['IND'];
let result = await rapid.getData_R("ID,Name","city","CountryCode=?","","id ASC");


let data = ['IND'];
let result = await rapid.getJoinData_R("ci.ID,ci.Name,con.Name as CountryName","country as con","INNER JOIN city as ci ON ci.CountryCode = con.Code ","con.Code=?","","ci.id ASC",data);


let data = {
"name":"Developer Harshil Kaneria",
"type":2,
"date":"2020-05-10 10:10:10",
};
let result = await rapid.insertData_R("test_dev",data);


let column = ["name","type","date"];
let data = [
["Harshil Kaneria 1",1,"2021-05-11 11:11:10"],
["Harshil Kaneria 2",2,"2022-05-12 12:12:10"],
["Harshil Kaneria 3",3,"2023-05-13 13:13:10"]
]
let result = await rapid.insertMultiData_R("test_dev",column,data);


let data = {
"name":"Harshil Kaneria",
"type":1,
"date":"2021-09-26 11:14:32"
};
let where_data = [23];
let result = await rapid.updateData_R("test_dev",data,"id=?",where_data);


let data = [24];
let result = await rapid.deleteData_R("test_dev","id=?",data);


let data = ['IND'];
let query = ` select * from country where Code=? `;
let result = await rapid.execute_query_R(query,data);

// If You Debug You Query Then Add 1 as last Parameter in function and function Will be return your Query
let result = await rapid.execute_query_R(query,data,1);
// in result you will be see Query

// If You Want Autogenerate API Response Then User _R Function you also directlty return in your response and if you want database result then user normal function without _R
let data = ['IND'];
let query = ` select * from country where Code=? `;
let result = await rapid.execute_query_R(query,data); // Auto Generate API Response
let result_other = await rapid.execute_query(query,data); // Database Responser



```

  
## Features

- Best and Advanced Pre Built Function
- Easy Database Connection
- Easy to Debug
- Minimal Write Code Syntax
- Automatic API Response
- Easy To Use
- Using Prepared Statement For Prevent SQL Injection
- And Many More
## License

[MIT](https://github.com/Harshil-Kaneria/rapid-sql/blob/main/LICENSE)

  