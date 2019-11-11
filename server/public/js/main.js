$(document).ready(function () {
  var finalValues = {
    water: 0,
    food: 0,
    medicine: 0,
    sanitation: 0
  };
  var finalData;
  $('input[type=range]').change(function (evt) {
    finalValues[$(evt.target).data('type')] = evt.target.value;
    console.log(finalValues);
  })

  $('#createSms').on('click', function () {
    console.log(finalValues);
    var coords = getCoords();
    finalData = {
      "longitude": coords.longitude,
      "latitude": coords.latitude,
      "things": [{
        "name": "food",
        "quantity": finalValues.food
      }, {
        "name": "medicine",
        "quantity": finalValues.medicine
      }, {
        "name": "sanitation",
        "quantity": finalValues.sanitation
      }, {
        "name": "water",
        "quantity": finalValues.water
      }]
    }
    var message = getMessage();
    $('#m_text').val(message);
    
    $('#smsModal').modal('show');
  });

  $('#send_button').on('click', function() {
    $.ajax({
      type: "POST",
      url: 'http://think42.net/api/v1/requirement',
      contentType: 'application/json',
      data: JSON.stringify(finalData),
      success: success,
      error: onError,
      dataType: 'json'
    });
    $('#smsModal').modal('hide');
  })

  function getMessage() {
    // return "ID" + makeid(16) + '/' +
    // finalData.longitude + '/' +
    // finalData.latitude + '/' +
    // finalData.things.map(function(el) { return el.name[0].toUpperCase() + el.quantity;}).toString() + '/' +
    // new Date();

    return finalData.things.map(function(el) { return el.name[0].toUpperCase() + el.quantity;}).toString();
  }

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  function success(data) {
    console.log(data);
    $('#messageSent').modal('show');
  };

  function onError() {
    alert('oops try again one more time');
  };

  function sendSms() {
    // V1
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // }


    // V2
    $.ajax({
      type: "POST",
      url: 'http://think42.net/api/v1/requirement',
      contentType: 'application/json',
      data: JSON.stringify(finalData),
      success: success,
      dataType: 'json'
    });
  }

  function getCoords() {
    return {
      latitude: getRandomInt(22537727, 22828254)/1000000,
      longitude: getRandomInt(113770933, 114413487)/1000000
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords);
    var data = {
      "longitude": position.coords.longitude,
      "latitude": position.coords.latitude,
      "things": [{
        "name": "food",
        "quantity": finalValues.food
      }, {
        "name": "medicine",
        "quantity": finalValues.medicine
      }, {
        "name": "sanitation",
        "quantity": finalValues.sanitation
      }, {
        "name": "water",
        "quantity": finalValues.water
      }]
    }
    $.ajax({
      type: "POST",
      url: 'http://think42.net/api/v1/requirement',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: success,
      dataType: 'json'
    });
  }

});



