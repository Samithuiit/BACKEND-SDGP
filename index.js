const express=require('express')
const app= express();


// test api
app.get("/",(req,res) => {
    res.send("hello world");
});
 
// testapi2
app.get("/api/numbers",(req,res) => {
    res.send(1,2,3,4);
});

const port = process.env.PORT||3000;

app.listen(port , ()=>console.log("listning"+port))