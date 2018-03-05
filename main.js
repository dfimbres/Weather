var url = 'https://api.wunderground.com/api/740ed5d83e841d47/conditions/q/';
var e = 'https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json';
var emoji;
var gitURL = 'https://api.github.com/users/dfimbres/repos';

//Here only to make sure the site starts once up
$(document).ready(function() {
  //this function calls for the user coords and consoles them once got

  //gets emoji
  $.getJSON(e, function(e){
    emoji = json;
    console.log(emoji);
  });

  getLocation();
});

function main(temp, location, weather, wind){
  console.log('In main');
  console.log(temp);
  console.log(location);
  console.log(weather);
  $('#weather').html('<h1> Hello </h1>' + temp + '°' + '<h1> in </h1>' + location);

  if(temp >= 90){
    $('#emoji').html(emoji[100] + emoji.fire + emoji.fire);
  } else if(temp < 90 && temp > 70){
    $('#emoji').html(emoji.bikini + emoji.fish + emoji.surfer);
  }
}

//First
//gets user location
function getLocation(){
  $.getJSON(gitURL, function(data){
    console.log(data);
    
  });
  //function that calls for user location
  //pos variable for the data recieved
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      var lon = pos.coords.longitude;
      var lat = pos.coords.latitude;

      callApi(lon,lat);
    });
  } else {
    $('body').append('<h2>Browser not supported</h2>')
  }
};

//Second
//Calls api to recieve information
function callApi(longitude, latitude){
  //Maybe clean up api call
  $.getJSON(
    url + latitude +',' + longitude + '.json'
    , function(data){
     var temp = data.current_observation.temp_f;
     var location = data.current_observation.display_location.city;
     var weather = data.current_observation.icon;
     var wind = data.current_observation.wind_mph;
     var time = data.local_time_rfc822;
    console.log(data);
    console.log(wind);
    console.log(time);
    //Call main were the majority of the code goes
    main(temp, location, weather, wind);
  });
}