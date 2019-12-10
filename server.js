var express = require('express');  //Node.js web application framework
var app = express();  //server object

var PORT = process.env.PORT||8080;

app.use(express.json());
app.use(express.urlencoded());
//you can excess the file when you are not logged in. That's why files that should be in public folder, we only make public.
//the html files that I don't wanna show is in another folder.
app.use(express.static("public"));

var htmlRoute =require("./routes/htmlRoutes.js");
app.use(htmlRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

