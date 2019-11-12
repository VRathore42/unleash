$(document).ready(function() {
  var finalValues = {
    water: 0,
    food: 0,
    medicine: 0,
    sanitation: 0
  };
  var finalData;
  var textMessage = ''
  var errorCount = 0;

  $('#send_button').on('click', function() {
    textMessage = $('#m_text').val().trim();

    finalData = validateAndGetStructuredData(textMessage);
    console.log(finalData);
    // sendData();
  })

  function validateAndGetStructuredData() {
    // FOR DATA
    //w f m s
    var partsMessage = getParts();
    partsMessage.forEach(function(item) {
      var pVal = getPartValue(item);
      if(pVal != NaN) {
        if(item.substring(0, 1).toUpperCase() == 'W') {
          finalValues.water = pVal;
        } else if(item.substring(0, 1).toUpperCase() == 'F') {
          finalValues.food = pVal;
        } else if(item.substring(0, 1).toUpperCase() == 'S') {
          finalValues.sanitation = pVal;
        } else if(item.substring(0, 1).toUpperCase() == 'M') {
          finalValues.medicine = pVal;
        }
      }
    })

    // For coordinates
    var coords = getCoords();
    return {
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

  function validateSingleChars(myChar, message) {
    
  }

  function getPartValue(item) {
    try {
      return parseInt(item.substring(1));
    } catch(error) {
      console.log(error);
    }
  }

  function getParts() {
    var p1 = textMessage.trim().split(',');
    var p2 = p1.map(function(el) {
      return el.trim();
    })
    return p2;
  }

  function sendData() {
    $.ajax({
      type: "POST",
      url: 'http://think42.net/api/v1/requirement',
      contentType: 'application/json',
      data: JSON.stringify(finalData),
      success: success,
      error: onError,
      dataType: 'json'
    });
  }

  function success(data) {
    console.log(data);
    $('#messageSent').modal('show');
  };

  function onError() {
    alert('oops try again one more time');
  };
})