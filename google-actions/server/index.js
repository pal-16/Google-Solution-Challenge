const express = require('express');
const dfff = require('dialogflow-fulfillment');
const request = require('request');
const axios = require('axios')
const app = express();
var convert = require('xml-js');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', (_, res)=>{
 res.send("connected");
});

app.post('/', express.json(), (req,res)=>{
   
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });  

    function askParameters(agent){

            console.log(agent.context);
            var allValues = agent.context.get("awaiting_parameters").parameters

            //send request by getting parameters from dialgoflow  and get the answer
            axios
            .post('https://2ce38ca33df3.ngrok.io/crop_predictor', {
                
                    "N":85, 
                    "P":58,
                    "K":41,
                    "temperature":21.77046169,
                    "humidity": 80.31964408, 
                    "ph":7.038096361,
                    "rainfall":226.6555374
                
            })
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            })

        //send crop name and get location as the answer
                var result;
                axios.get("https://maps.googleapis.com/maps/api/place/textsearch/xml?query=bajra+shop+in+borivali&key=AIzaSyBG0jpJ-VBkYhhKsvjBZ2_dWDLbFkNSQ7M")
                .then(function(response) {
                    result = convert.xml2json(response['data'], {compact: true, spaces: 4});
                console.log(result)
                res.render('location.ejs',{content:result}) 
                })
                .catch(error => {
                    console.error(error)
                })    
                                                    
            console.log(allValues);
            agent.add(`Details saved.`);      
    }

    var intentMap = new Map();
    intentMap.set('askParameters', askParameters)
 
    agent.handleRequest(intentMap);

});

app.listen(8000, ()=>console.log("Server is live at port 8000"));