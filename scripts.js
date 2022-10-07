
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
            var tbodyEl = $(document.getElementById("namebody"));

            tbodyEl.html('');

            //gets user information
            response.tweetinfo.forEach(function(tweet) {
              
              //appends html to user section located in namebody
              tbodyEl.append('\
                  <tr>\
                      <td class="id">' + tweet.user.id + '</td>\
                      <td><input type="text" class="screen_name" value="' + tweet.user.screen_name + '"></td>\
                      <td><input type="text" class="name" value="' + tweet.user.name + '"></td>\
                      </td>\
                  </tr>\
              ');
          });
      }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //get tweet info and display it

          $.ajax({
            url: '/tweetinfo',
            contentType: 'application/json',
            success: function(response){
            var tbodyel = $(document.getElementById("tweetbody"));

            tbodyel.html('');
            
            //get tweet information
            response.tweetinfo.forEach(function(tweet) {
              //appends tweet information at tweetinfo located at tweetbody html
              tbodyel.append('\
                  <tr>\
                      <td class="id">' + tweet.id + '</td>\
                      <td><input type="text" class="tweet_text" value="' + tweet.text + '"></td>\
                      <td><input type="text" class="created_at" value="' + tweet.created_at + '"></td>\
                      </td>\
                  </tr>\
              ');
          });
      }




        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //get a searched tweet(s) & display it

        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response){


            var tbodyel = $(document.getElementById("searchbody"));

            tbodyel.html('');
            // gets searched tweets info for display
            response.IDs.forEach(function(tweet) {
              //appends seached tweet info to searchbody html
              tbodyel.append('\
                  <tr>\
                      <td class="id">' + tweet.id + '</td>\
                      <td><input type="text" class="tweet_text" value="' + tweet.text + '"></td>\
                      <td><input type="text" class="created_at" value="' + tweet.created_at + '"></td>\
                      </td>\
                  </tr>\
              ');
          });
      }


        });



    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        //recieves new input
        var createInput = $('#create-input');
        
        //turns the createInput into a string
        var fixIn = JSON.stringify(createInput.val());

        //splits the input at ; and sets each part to element in result array
        var result = fixIn.split(';');
        result[0] = result[0].replaceAll('"', '');
        result[1] = result[1].replaceAll('"', '');

        //create a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          //sends the data as a string to create a tweet
          data: JSON.stringify({ id: result[0], text: result[1] }),
          success: function(response){
            console.log(response);
            createInput.val('');
            //clicks the get tweets button to display new tweet
            $('#get-tweets-button').click();
          }
        });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();

    // adds the input to userID
    var userID = $('#search-input');
    //pulls the value from userID to newID
    var newID = userID.val();

    //search a tweet and display it.
    $.ajax({
      url: '/searchinfo/id',
      method: 'POST',
      contentType: 'application/json',
      //sends the searched data as a string
      data: JSON.stringify({id: newID}),
      success: function(response){
        console.log(response);
        //clicks the get searched tweets button to display searched tweet
        $('#get-searched-tweets').click();
      }
      
    });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    //receives the input into updateInput  
    var updateInput = $('#update-input');
    //puts the value from updateInput into inputString
    var inputString = updateInput.val();

    //parses inputString
    const parsedStrings = inputString.split(';');

    //sets the two parts of parsedStrings to name and newName
    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //update a tweet
   $.ajax({
      url: '/tweets/:nm',
      method: 'PUT',
      contentType: 'application/json',
      //sends stringified data to server
      data: JSON.stringify({name: name, newName: newName}),
      success: function(response){
        console.log(response);
        //clicks button on update
        $('#get-button').click();

      }
      
    });



  });


  //DELETE
  $("#delete-form").on('submit', function(event) {
    //sets input to id
    var id = $('#delete-input');
    event.preventDefault();
    //puts the value from id into tweetid
    var tweetid = id.val();

    //sends the id to delete
    $.ajax({
      url: '/tweetinfo/:tweetid',
      method: 'DELETE',
      contentType: 'application/json',
      //sends the stringified tweetid to the server
      data: JSON.stringify({id: tweetid}),
      success: function(response){
        console.log(response);
        //clicks the get tweet button once deleted
        $('#get-tweets-button').click();
      }
      
    });
    
  });


});


                    
   