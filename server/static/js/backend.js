// Making a google cloud vision request
//https://cloud.google.com/vision/docs/request

var importantNutri = ["208", "203", "205", "291", "269", "601"];
//var colors = ["#7e3838", "#7e6538", "#7c7e38", "#587e38", "#387e45"];
var pie;
var displayNutrients = function (nutrients) {
  var nutri = [];
  for (var i = 1; i < nutrients.length; i++) {
    if (i == nutrients.length - 1) {
      nutri.push({
        "label": nutrients[i].name.split(" ")[0].replace(",", ""),
        "value": nutrients[i].value * 0.001,        
      });
    }
    else {
      nutri.push({
        "label": nutrients[i].name.split(" ")[0].replace(",", ""),
        "value": nutrients[i].value * 1.0
        
      });
    }
  }
  var energy = nutrients[0].value;
  console.log(nutri);
  pie = new d3pie("pieChart", {
    header: {
    title: {
      text:    "Nutrients Breakup",
      color:    "white",
      fontSize: 22,
      font:     "verdana"
    },
    subtitle: {
      color:    "white",
      fontSize: 14,
      font:     "verdana"
    },
    location: "top-center",
    titleSubtitlePadding: 8
  },
  footer: {
    text: "Source: U.S. Dept of Agriculture National Agricultural Library",
    fontSize: 14,
    color: "white",
    font: "verdana",
    location: "bottom-center"

  },
  size: {
    canvasHeight: 500,
    canvasWidth: 700,
    pieInnerRadius: 0,
    pieOuterRadius: null
  },
    data: {
        "content": nutri
    },
    labels: {
        "outer": {
            "pieDistance": 32
        },
        "inner": {
            "format": "value"
        },
        "mainLabel": {
            "font": "verdana"
        },
        "percentage": {
            "color": "white",
            "font": "verdana",
            "decimalPlaces": 0
        },
        "value": {
            "color": "white",
            "font": "verdana"
        },
        "lines": {
            "enabled": true,
            "color": "white"
        },
        "truncation": {
            "enabled": true
        }
    },
    tooltips: {
    enabled: false,
    type: "placeholder", // caption|placeholder
    string: "",
    placeholderParser: null,
    styles: {
      fadeInSpeed: 250,
      backgroundColor: "white ",
      backgroundOpacity: 0.3,
      color: "#efefef",
      borderRadius: 2,
      font: "arial",
      fontSize: 10,
      padding: 4
    }
  },
    "effects": {
    load: {
      effect: "default", // none / default
      speed: 1000
    },
    pullOutSegmentOnClick: {
      effect: "bounce", // none / linear / bounce / elastic / back
      speed: 300,
      size: 10
    },
    highlightSegmentOnMouseover: true,
    highlightLuminosity: -0.2
  },
  misc: {
    colors: {
      background: null, // transparent
      segments: [
        "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a",
        "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
        "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a",
        "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
        "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e",
        "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
        "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c",
        "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
        "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b",
        "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
      ],
      segmentStroke: "#ffffff"
    },
    gradient: {
      enabled: false,
      percentage: 95,
      color: "#000000"
    },
    canvasPadding: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    pieCenterOffset: {
      x: 0,
      y: 0
    },
    cssPrefix: null
  },
  callbacks: {
    onload: null,
    onMouseoverSegment: null,
    onMouseoutSegment: null,
    onClickSegment: null
  }
  });
  document.getElementById('fitness-btn').style.display = 'initial';
}

var getNutrients = function (foodName) {
  console.log(foodName);
  document.getElementById('food').innerHTML = '<h3>Having ' + foodName + ' ?</h3>';
  var getIdURL = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + foodName + '&max=1&api_key=t9DRhoFgY5Ba57LKuA24o14zdfU2GYz0LPWIXiPx';
  var request = new XMLHttpRequest;
  request.onload = function() {
      var ndbid = JSON.parse(request.responseText).list.item[0].ndbno;
      console.log(ndbid);
      var getNutriURL = 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=' + ndbid + '&format=json&api_key=t9DRhoFgY5Ba57LKuA24o14zdfU2GYz0LPWIXiPx';
      var request_nutri = new XMLHttpRequest;
      request_nutri.onload = function() {
          var nutrients = JSON.parse(request_nutri.responseText).foods[0].food.nutrients;
          var filteredNutri = nutrients.filter(function (nutrient) {
            return importantNutri.includes(nutrient.nutrient_id);
          });
          displayNutrients(filteredNutri);
      };
      request_nutri.open("GET", getNutriURL, !0);
      request_nutri.send();
  };
  request.open("GET", getIdURL, !0);
  request.send();
};

function getBase64Image() {
    var dataURL = document.getElementsByClassName('imagePreview')[0].getElementsByTagName('img')[0].src;
    return dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");
}

var getNutritionInfo = function () {
  var image = getBase64Image();
  var postUrl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAasXsrncsy8NHzNjouf_9Mu-zJALDbKfI";
  var data = {
      requests: [
        {
         "image": {
          "content": image
         },
         "features": [
          {
           "maxResults": 1,
           "type": "LABEL_DETECTION"
          }
         ]
        }
      ]
  }
  var request = new XMLHttpRequest;
  request.onload = function() {
      getNutrients(JSON.parse(request.responseText).responses[0].labelAnnotations[0].description);
  };
  request.open("POST", postUrl, !0);
  request.send(JSON.stringify(data));
};
