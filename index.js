const connection = require('./db.js');
const jsonmanager = require('jsonbash');

let error_flag = true;

// Execute Query
let execute_query = async function(query="",data=[]){
    try{
        let query_result = await connection.promise().execute(query,data).then(([rows])=> { error_flag=false; return rows;}).catch((err)=> { error_flag=true;console.log(err);return [];});
        return query_result;
    }catch(err){
        error_flag=true;
        console.log(err);
        return [];
    }
}

// Call Function And Add Automatically Json Response
let execute_query_R = async function(query="",data=[]){
    let result = await execute_query(query,data);
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    return await jsonmanager.jsonbash(true,"Success",result);
}

// Generate Select Query Dynamically
let getData = async function(row=null,table=null,where=null,group=null,order=null,data=[],exit=0){
    let query = 'SELECT';
    if(row!=null && row!=""){
        query += ` ${row} `;
    }
    if(table!=null && table!=""){
        query += ` FROM ${table} `; 
    }
    if(where!=null && where!=""){
        query += ` WHERE ${where} `;
    }
    if(group!=null && group!=""){
        query += ` GROUP BY ${group} `;
    }
    if(order!=null && order!=""){
        query += ` ORDER BY ${order} `;
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data);
    return result;
}

// Call Function And Add Automatically Json Response
let getData_R = async function(row=null,table=null,where=null,group=null,order=null,data=[],exit=0){
    let result = await getData(row,table,where,group,order,data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    return await jsonmanager.jsonbash(true,"Data Fetch Sucessfully",result);
}

// Generate Select Query Dynamically
let getJoinData = async function(row=null,table=null,join=null,where=null,group=null,order=null,data=[],exit=0){
    let query = 'SELECT';
    if(row!=null && row!=""){
        query += ` ${row} `;
    }
    if(table!=null && table!=""){
        query += ` FROM ${table} `; 
    }
    if(join!=null && join!=""){
        query += ` ${join} `; 
    }
    if(where!=null && where!=""){
        query += ` WHERE ${where} `;
    }
    if(group!=null && group!=""){
        query += ` GROUP BY ${group} `;
    }
    if(order!=null && order!=""){
        query += ` ORDER BY ${order} `;
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data);
    return result;
}

// Call Function And Add Automatically Json Response
let getJoinData_R = async function(row=null,table=null,join=null,where=null,group=null,order=null,data=[],exit=0){
    let result = await getJoinData(row,table,join,where,group,order,data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    return await jsonmanager.jsonbash(true,"Data Fetch Sucessfully",result);
}

// Generate Select Query Dynamically
let insertData = async function(table=null,data=null,exit=0){
    let query = 'INSERT INTO';
    let data_array = [];
    if(table!=null && table!=""){
        query += ` ${table} `; 
    }
    if(typeof data === 'object' && data !== null){
        let column = '';
        let value = '';
        for (const key in data) {
            column += key+',';
            value += '?,';
            data_array.push(data[key]);
        }
        column = column.substring(0, column.length - 1);
        value = value.substring(0, value.length - 1);
        query += ` (${column}) VALUES (${value}) `;
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data_array);
    if(result.affectedRows<1){
        return false;
    }
    return result;
}

// Call Function And Add Automatically Json Response
let insertData_R = async function(table=null,data=null,exit=0){
    let result = await insertData(table,data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    if(result.affectedRows<1){
        return await jsonmanager.jsonbash(false,"Something is Wrong Data is Not Saved",[]);
    }
    return await jsonmanager.jsonbash(true,"Data Inserted Sucessfully",result);
}

// Generate Select Query Dynamically
let insertMultiData = async function(table=null,column_data=null,data_data=null,exit=0){
    let query = 'INSERT INTO';
    let data_array = [];
    let column = '';
    if(table!=null && table!=""){
        query += ` ${table} `; 
    }
    if(column_data !== null && Array.isArray(column_data)){
        column_data.forEach(function (item, index) {
            column += item+',';
        });
        column = column.substring(0, column.length - 1);
        query += ` (${column}) VALUES `;
    }
    if(data_data !== null && Array.isArray(data_data)){
        let data = '';
        data_data.forEach(function (item, index) {
            data += '(';
            item.forEach(function (item_record, index_record) {
                data += '?,';
                data_array.push(item_record);
            });
            data = data.substring(0, data.length - 1);
            data += ')';
            data += ',';
        });
        data = data.substring(0, data.length - 1);
        query += ` ${data} `;
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data_array);
    if(result.affectedRows<1){
        return false;
    }
    return result;
}

// Call Function And Add Automatically Json Response
let insertMultiData_R = async function(table=null,column_data=null,data_data=null,exit=0){
    let result = await insertMultiData(table,column_data,data_data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    if(result.affectedRows<1){
        return await jsonmanager.jsonbash(false,"Something is Wrong Data is Not Saved",[]);
    }
    return await jsonmanager.jsonbash(true,"Data Inserted Sucessfully",result);
}

// Generate Update Query Dynamically
let updateData = async function(table=null,data=null,where=null,where_data=null,exit=0){
    let query = 'UPDATE ';
    let data_array = [];
    if(table!=null && table!=""){
        query += ` ${table} `; 
    }
    if(typeof data === 'object' && data !== null){
        let column = '';
        for (const key in data) {
            column += key+'=?,';
            data_array.push(data[key]);
        }
        column = column.substring(0, column.length - 1);
        query += ` SET ${column} `;
    }
    if(where!=null && where!=""){
        query += ` WHERE ${where} `;
        if(where_data!=null && Array.isArray(where_data) ){
            data_array = data_array.concat(where_data);
        }
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data_array);
    if(result.affectedRows<1){
        return false;
    }
    return result;
}

// Call Function And Add Automatically Json Response
let updateData_R = async function(table=null,data=null,where=null,where_data=null,exit=0){
    let result = await updateData(table,data,where,where_data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    if(result.affectedRows<1){
        return await jsonmanager.jsonbash(false,"Something is Wrong Data is Not Updated",[]);
    }
    return await jsonmanager.jsonbash(true,"Data Update Sucessfully",result);
}

// Generate Delete Query Dynamically
let deleteData = async function(table=null,where=null,data=[],exit=0){
    let query = 'DELETE FROM';
    if(table!=null && table!=""){
        query += ` ${table} `; 
    }
    if(where!=null && where!=""){
        query += ` WHERE ${where} `;
    }
    if(exit!=0){
        return query;
    }
    let result = await execute_query(query,data);
    return result;
}

// Call Function And Add Automatically Json Response
let deleteData_R = async function(table=null,where=null,data=[],exit=0){
    let result = await deleteData(table,where,data,exit);
    if(exit!=0){
        return result;
    }
    if(error_flag){
        return await jsonmanager.jsonbash(false,"Something is Wrong",result);
    }
    if(result.affectedRows<1){
        return await jsonmanager.jsonbash(false,"Something is Wrong Data is Not Deleted",[]);
    }
    return await jsonmanager.jsonbash(true,"Data Deleted Sucessfully",result);
}


module.exports = {
    execute_query,execute_query_R,
    getData , getData_R,
    getJoinData , getJoinData_R,
    insertData , insertData_R,
    insertMultiData , insertMultiData_R,
    updateData , updateData_R,
    deleteData , deleteData_R
}