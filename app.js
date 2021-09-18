const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res) {
  const query = req.body.cityName
  const apid = "71c2363c764a4a8bc5c72b644d7bb205"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apid + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
   response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
     const weather = weatherData.weather[0].description
     const icon = weatherData.weather[0].icon
    const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
   res.write("<p>The weather is currently " + weather + "</p>")
    res.write("<h1>Teamperature at " + query + " is " + temp + " degree Celcius</h1>");
    res.write("<img src=" + imgURL +">")
    res.send()
   })
  })
})

app.listen(3000,function(req,res) {
  console.log("Server is running at port 3000");
});
