
class itemPost{
    // constructor.
    constructor(){}

    UserPost = (name,surname,email,password,gender,race,dob)=>{

        //create post object.
        let postUser = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            gender: gender,
            race: race,
            dob: dob,
            n_followers: 0,
            n_following: 0,
            active: 1
        };

        //return post.
        return postUser ;
    }

    updatePost = (name,surname,email,password,gender,race,dob)=>{

        //create post object.
        let update = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            gender: gender,
            race: race,
            dob: dob
        };

}

// Export User post class.
module.exports = itemPost;