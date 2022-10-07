var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
//global variable for searched tweets
var IDs = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);

  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {

 // sends user ID informations
  res.send({tweetinfo: tweetinfo});

});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  
  //Sends all tweet information
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){

  //sends searchedIDs information
  res.send({IDs: IDs});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  
  // create tweet object from recieved data
  var tweet = req.body;
  // create currentT that records the current date and time
  var currentT = new Date();
  
  // pushes recieved text created at and tweet id into tweetinfo
  tweetinfo.push({
    text: tweet.text,
    created_at: currentT.toString(),
    id: parseInt(tweet.id),
    
  })

  //response if successfully created
  res.send('Successfully created');

});

//Posts searched tweets
app.post('/searchinfo/id', function(req, res) {
  
  // creates tweetid from requested information
  var tweetid = req.body;

  //bool found that shows whether the specified id is within tweetinfo
  var found = false;

  //contains the id of the found tweet
  var ind = 0;
  //searches throughout the tweetinfo global array for the specified tweetid
  tweetinfo.forEach(function(tweetinfo, index){
    //if the tweetid is within tweetinfo, then record index and set found to true
    if(!found && tweetinfo.id == tweetid.id){
      ind = index;
      found = true;
    }
  });

  //if the tweetid is found push the found object from tweetid into IDs array to record searched
  if(found){

    //push found tweetinfo into IDs array
    IDs.push(

     tweetinfo[ind]

    )

  //if successful, send success message
  res.send("Successfull search");

  }

});

//Update
app.put('/tweets/:nm', function(req, res) {
  
  //creates user object from requested object
  var user = req.body;

  // if user.name is found within tweet info set to true
  var found = false;

  // if any user name is equal to the requeseted name change the screen_name and turn found true.
  tweetinfo.forEach(function(tweetinfo,index){

    if(!found && tweetinfo.user.name == user.name){
      tweetinfo.user.screen_name = user.newName;
      found = true;
    }
   
  });

  // send success message
  res.send('Successfully updated');

});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //create tweetid object from requested information
  var tweetid = req.body;

  // bool to determine if tweetid is is in tweetinfo
  var found = false;

  // index to determine found id location
  var ind = 0;

    //for each element in tweetinfo if the tweet id is located in tweetinfo set ind to index location and found to true
    tweetinfo.forEach(function(tweetinfo, index){
      if(!found && tweetinfo.id == parseInt(tweetid.id)){
        ind = index;
        found = true;
      }
    });

  // if the id was found remove object in tweetinfo at specified index
  if(found){
  tweetinfo.splice(ind, 1);
  }

  //send success message  
  res.send('Successfully deleted');

});

//listens for port
app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});