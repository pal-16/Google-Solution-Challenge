const express = require('express');
const dfff = require('dialogflow-fulfillment');
const request = require('request');
const axios = require('axios')
const app = express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
const cors = require("cors");
var convert = require('xml-js');
app.use(cors());
app.get('/', (_, res)=>{
 res.send("connected");
});



app.post('/map/:crop/:location', (req, res) => {

    const crop = req.params.crop;
    const location = req.params.location;
    //const location = "borivali";
    const searchstr = `${crop}+store+in+${location}`
    const url = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=" + searchstr + "&key=AIzaSyBG0jpJ-VBkYhhKsvjBZ2_dWDLbFkNSQ7M"
    console.log(url);
    axios.get(url)
        .then(function (response) {
            console.log(response);
        var result = convert.xml2json(response['data'], {compact: true, spaces: 4});
        var jsonRes=JSON.parse(result);
        console.log(jsonRes["PlaceSearchResponse"]["result"]);
        var len_response = jsonRes["PlaceSearchResponse"]["result"].length;
        console.log(len_response)
        var finalCoordinates=[];
        var i;
        if (len_response>10)
        len_response=10;
        for(i=0;i<len_response;i++){
            var lat;
            var lng;
            lat= jsonRes["PlaceSearchResponse"]["result"][i]["geometry"]["location"]["lat"]["_text"];
            lng= jsonRes["PlaceSearchResponse"]["result"][i]["geometry"]["location"]["lng"]["_text"];
         
            finalCoordinates.push({"lat":lat, "lng":lng});
        }
        console.log(finalCoordinates);     
        res.status(200).json(finalCoordinates);
        })
       .catch(error => {
           res.status(500).json(error);
        })
});


app.post('/', express.json(), (req,res)=>{
   
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });  

   async function askParameters(agent){

        var allValues = agent.context.get("awaiting_parameters").parameters
        console.log(allValues);
        //send request by getting parameters from dialogflow  and get the answer
      try{
          console.log("hello");
       const res = await axios
        .post('http://127.0.0.1:5000/crop_predictor', {
            
               "N":allValues['nitrogen'], 
                "P":allValues['phosphorous'],
                "K":allValues['potassium'],
                "temperature":allValues['temperature'],
                "humidity": allValues['humidity'], 
                "ph":allValues['ph'],
                "rainfall": allValues['rainfall']
             /*  "N":85, 
                "P":58,
                "K":41,
                "temperature":21.77046169,
                "humidity": 80.31964408, 
                "ph":7.038096361,
                "rainfall":226.6555374*/
            
        })
        
            console.log("============");
            console.log(res);
            var cropName = res["data"];
           // var cropName="rice";
            var location = allValues['location']; 
            agent.add("We have found that "+cropName+" crop is good. \n  You can find the nearest crop centers near you on this link \n https://kisan-mitra-client.surge.sh/locate?crop="+cropName+"&location="+location);
        
    }catch(error){
            console.error(error);
    }
}
      
    var intentMap = new Map();
    intentMap.set('askParameters', askParameters)
    agent.handleRequest(intentMap);
   
});

app.listen(process.env.PORT || 8000, ()=>console.log("Server is live at port 8000"));