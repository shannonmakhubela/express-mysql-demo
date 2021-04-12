// @Shannon Makhubela

//const database = require('../database/Db_Await');
const database = require('../database/Db_Promise');

class helper{

    #instance ;
    constructor(){
        // init.
        this.#instance = new database();
    }

    // create response helper 
    response = (res,statusCode,message,status,result) =>{
        res.status(statusCode).json({
            message: message,
            status : status,
            result : result
        });
    }
    
    isEmpty = (results) =>{
        if(Object.keys(results).length <= 0) return true;
        return false;
    } 

    // check if user exists helper.
    userExist = async(tablename,email)=>{

        if (tablename == null || email == null) {
            return null
        }

        try {
            // create sql 
            const sql =  `SELECT ${tablename}.id FROM ${tablename} WHERE ${tablename}.email = '${email}' `;
            const post = null ;
            const user =  await this.getInstance().query(sql , post);
            if (!this.isEmpty(user)) {
                return true ;
            }
            
        } catch (error) {
            console.log(error.message);
        }
        return false ;
    }

    // login
    userLogin = async(tablename, email, password) =>{
        try{
            const sql =`SELECT ${tablename}.id FROM ${tablename} WHERE ${tablename}.email = '${email}' and ${tablename}.password ='${password}' `; //
            return  await this.getInstance().query(sql , post);

        }catch(err){
            console.error(err.message);
        }
    }


    // get instance
    getInstance(){ return this.#instance ;}
}

// export class
module.exports = helper ;