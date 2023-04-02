console.log("basic node application practice")

//The purpose of this is just for me to be able to go back
//and review how to set up a basic node server. :)

/*
 Dependencies:

 npm install dotenv
 npm install express
 npm install nodemon

*/

require("dotenv").config();
const server;
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`\n Server is running on port http://localhost:${PORT}\n`);
})