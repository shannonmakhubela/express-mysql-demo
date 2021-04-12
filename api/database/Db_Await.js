
// require mysql.
const mysql = require('mysql-await');

// create db class.
class database_Await{

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

        //check connection.
        this.#connection.on('error',(err) =>{
            console.error(err.code);
        });
    }
    // create query function.
    query = async(sql , post ) =>{

        try
        {
            // run & return  query.
           return await this.getConnection().awaitQuery(sql, post);

        } catch (error) {
            // log error.
            console.error( error.message);
            this.getConnection().end();
        }
        
    }
    // get connection function.
    getConnection(){
        return this.#connection ;
    }

}

// export Database.
module.exports = database_Await ;