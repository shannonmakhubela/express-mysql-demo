/***************************************
 * @ Shannon Makhuela
 ***************************************/

const helperclass = require('../class/helper');
const DataAccessLayer = require('../class/database_access_layer');
const postUser = require('../post/itemPost');


class account_controller{
        
    // Global variables.
    #dl = null ;
    #helper = null;
    #userPost = null;

    //content spacific
    #tablename = 'account';
    #userid;
    #whereplus;

    // contructor.
    constructor(){
        // create db instances
        this.#dl = new DataAccessLayer();
        this.#helper = new helperclass();
        this.#userPost = new postUser();
    }

    // create account.
    account_Register = async(req,res,next) =>{

            try {
                // check if account exist.
                const check = await this.getDl().fetchItem(this.getTable(),`${this.getTable()}.email = '${req.body.email}'`);
                if(this.getHelper().isEmpty(check) ===true){
                        //create post
                        const post = this.getUserpost().UserPost(req.body.name,req.body.surname,req.body.email,req.body.password,req.body.gender,req.body.race,req.body.dob);
                        // create account since account does not exist.
                        const result = await this.getDl().insertItem(this.getTable(),post);
                        if (result.affectedRows > 0) {
                                this.getHelper().response(res,200,'account  created.',true,result);
                        }else{
                                this.getHelper().response(res,201,'failed to account create.',false,result);
                        }
                }else{
                   this.getHelper().response(res,201,'account already created.',false,check);
                }
                    
            } catch (error) {
                    console.error(error);
            }

    }
    // update account.
    update_account = async(req,res,next) =>{

        // get id.
        this.setId(req.params.accountid);
        // set whereplus.
        this.setWhereplus(`${this.getTable()}.id = '${this.getId()}' AND ${this.getTable()}.active = '${1}'`);
        // create post.
        const post = this.getUserpost().updatePost(req.body.name,req.body.surname,req.body.email,req.body.password,
                req.body.gender,req.body.race,req.body.dob);
        try {
            
             const result = await this.getDl().updateItem(this.getTable(),post,this.getWhereplus());
                if (result.affectedRows > 0) {
                        this.getHelper().response(res,200,'account updated.',true,result);
                }else{
                        this.getHelper().response(res,201,'failed to update.',false,result);
                }
                
        } catch (error) {
                console.error(error);
        }

    }
    // delete account.
    delete_account = async(req, res, next) =>{
         // set id.
         this.setId(req.params.accountid);
         // deleting an account ?
         // first delete in all where referenced.
         const content = new contentC();
        
         try {
                 //delete account
                const result = await this.getDl().deleteItem(this.getTable(),`${this.getTable()}.id='${this.getId()}' AND ${this.getTable()}.active = '${1}'`);//
                if (result.affectedRows > 0) {
                        this.getHelper().response(res,200,'account deleted.',true,result);
                }else{
                        this.getHelper().response(res,201,'failed to delete account.',false,result);
                }

                 
                 
         } catch (error) {
                 console.error(error);
         }
    }
    // fetch account by id.
    fetch_all_accounts = async(req, res, next) =>{

            try {
                const result = await this.getDl().fetchItems(`${this.getTable()} WHERE ${this.getTable()}.active = '${1}'`);
                if(this.getHelper().isEmpty(result) === false){
                        this.getHelper().response(res,200,'accounts fetched.',true,result);
                }else{
                        this.getHelper().response(res,200,'account fetch failed.',false,result);
                }
                 
            } catch (error) {
                    console.error(error);
            }
    }
    // fetch all accounts.
    fetch_account = async(req, res, next)=>{
            // set id.
            this.setId(req.params.accountid);
            // set whereplus.
            this.setWhereplus(`${this.getTable()}.id ='${this.getId()}' AND ${this.getTable()}.active = '${1}'`);
            try {

                const result = await this.getDl().fetchItem(this.getTable(),this.getWhereplus());
                if(this.getHelper().isEmpty(result) === false){
                        this.getHelper().response(res,200,'account fetched.',true,result);
                }else{
                        this.getHelper().response(res,200,'account fetch failed.',false,result);
                }
                 
            } catch (error) {
                    console.error(error);
            }
    }
    // account login.
    account_Login = async(req, res, next) => {
        const email = req.body.email ;
        const password = req.body.password ;
        this.setWhereplus(`email= '${email}' AND password = '${password}' AND ${this.getTable()}.active = '${1}'`);
        // check if user exist.
        try {
                const checkUser = await this.getHelper().userExist(this.getTable(),email);
                if (checkUser ===true) {
                        // login now.
                        const result = await this.getDl().fetchItem(this.getTable(),this.getWhereplus());
                        if(this.getHelper().isEmpty(result) === false){

                                 this.getHelper().response(res,200,'user logged in',true,result);
                        }else{
                                this.getHelper().response(res,201,'failed to log in',false,result);
                        }
                } else {
                        this.getHelper().response(res,201,'account does not exist',false,checkUser);
                }
                
        } catch (error) {
                console.error(error);
        }

    }
    // deactivate account.
    deactivate_account  = async(req, res, next) => {
            // set id.
            this.setId(req.params.accountid);
            // create post.
            let post = { active: 0};
            // where
             this.setWhereplus(`${this.getTable()}.id = '${this.getId()}'`);

            try {
                 const result = await this.getDl().updateItem(this.getTable(),post,this.getWhereplus());
                if (result.affectedRows > 0) {
                        this.getHelper().response(res,200,'account deactivated.',true,result);
                }else{
                        this.getHelper().response(res,201,'failed to deactivate.',false,result);
                }
                    
            } catch (error) {
                    console.error(error);
            }

    }
    // activate.
   activate_account  = async(req, res, next) => {
            // set id.
            this.setId(req.params.accountid);
            // create post.
            let post = { active: 1};
            // where
             this.setWhereplus(`${this.getTable()}.id = '${this.getId()}'`);
            try {
                 const result = await this.getDl().updateItem(this.getTable(),post,this.getWhereplus());
                if (result.affectedRows > 0) {
                        this.getHelper().response(res,200,'account activated.',true,result);
                }else{
                        this.getHelper().response(res,201,'failed to activate.',false,result);
                }
                    
            } catch (error) {
                    console.error(error);
            }

    }

    // fetch all deactivated accounts.
    inactive_accounts = async(res)=>{
         try {
                const result = await this.getDl().fetchItems(`${this.getTable()} WHERE ${this.getTable()}.active = '${0}'`);
                if(this.getHelper().isEmpty(result) === false){
                        this.getHelper().response(res,200,'accounts fetched.',true,result);
                }else{
                        this.getHelper().response(res,200,'account fetch failed.',false,result);
                }
                 
            } catch (error) {
                    console.error(error);
           }
    }

    // getter and setters
    getDl(){return this.#dl ;}
    getHelper(){ return this.#helper ;}
    getUserpost(){ return this.#userPost;}
    getTable(){ return this.#tablename;}
    setId(id){ this.#userid = id}
    getId(){ return this.#userid}
    setWhereplus(plus){ this.#whereplus = plus}
    getWhereplus(){return this.#whereplus}
}

// expoort class.
module.exports = account_controller ;



