
//const database = require('../database/Db_Await');
const database = require('../database/Db_Promise');

class DbLayer{
    // public vars
    #instance ;
    // constructor
    constructor(){
        // initialize instance.
        this.#instance = new database();
    }
     // get instance
    getInstance(){
        return this.#instance ;
    }



    // fetch all items from database.
    fetchItems = async (TableName) =>{
        try {
            const sql = `SELECT * FROM  ${TableName}`;
            const post = null;
            return await this.getInstance().query(sql,post);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch single Item.
    fetchItem =async(TableName,sqlExtra)=>{
        try {
            // what if i dont wanna fetch by id ?
            const sql = `SELECT * FROM  ${TableName} WHERE ${sqlExtra}`;
            
            const post = null;
            return await this.getInstance().query(sql,post);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    // insert item.
    insertItem = async (table, post)=>{

        try {
            // create sql
            const sql = `INSERT INTO ${table} SET ?`;
            // return result promise.
            return this.getInstance().query(sql,post);
            
        } catch (error) {
            console.error(error.message);
        }

        //close connection.
        this.getInstance().close();
    }

    // update Item
    updateItem = async(table,post, whereplus) =>{
        try {
            //create sql 
            const sql = `UPDATE ${table} SET ? WHERE ${whereplus}`;
            return await this.getInstance().query(sql,post);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    //delete Item
    deleteItem = async(table,whereplus)=>{
        try {
            const sql = `DELETE FROM ${table} WHERE ${whereplus}`;
            return await this.getInstance().query(sql,null);
            
        } catch (error) {
            console.error(error.message);
        }

    }


}

// expost access Layer class.
module.exports = DbLayer ;