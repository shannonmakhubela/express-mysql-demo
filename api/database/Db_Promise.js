
// require mysql.
const mysql = require('mysql');

// create db class.

class database_Promise{

    // Attributes.
    #connection ;

    // Dafault Contructor.
    constructor(){

        // create db connection.
        this.#connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'streamdb'
        });

        // check connection.
        this.#connection.connect((err) =>{
            if(err){console.log(err.message)}
            else{
              //  console.log( `connected  id: ${this.#connection.threadId}`);
            }
        });
        
    }
    // create query function.
    query = async(sql , post ) =>{
        // create promise.
        return await new Promise( (resolve, reject) =>{
            this.getConnection().query(sql,post,(err,result) =>{
                if(err){ 
                    reject(err) ;
                    this.getConnection().close;
                }else{
                    resolve(result);
                    //close connection
                    this.getConnection().close;
                }
            });
        });
        
    }
    // get connection function.
    getConnection(){
        return this.#connection ;
    }

}

// export Database.
module.exports = database_Promise ;