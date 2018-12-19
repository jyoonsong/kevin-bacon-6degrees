var width = document.body.offsetWidth;
var edgeThickness = 54, vertexThickness = 10;
// global circle
var circos = new Circos({
    container: '#chart',
    width: width,
    height: width
});

document.getElementById("btn").onclick = function(e) {
    let img = document.createElement("img");
    img.setAttribute("src", svg2img());
    document.body.appendChild(img);
}

function svg2img(){
    var svg = document.querySelector('svg');
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml);
    var b64start = 'data:image/svg+xml;base64,';
    var image64 = b64start + svg64;
    return image64;
};

function colorVertex(d, layer) {
    if (d.isConnected != "true") {
        return '#3b5998' // dark blue
    } else {
        if (d.edge == layer)
            return "#ffe066" // yellow
        return '#abafbd' // dark gray
    }
}
function colorEdge(d) {
    if (d.isConnected != "true") {
        return '#8b9dc3' // light blue
    } else {
        return '#dddfe6' // light gray
    }
}
function tooltipVertex(id, layer) {
    return `Level ${layer}: Friend No.${id}`
}
function tooltipEdge(degree) {
    return `Degree No. ${degree}`
}

// draw stack graph
var drawCircos = function (error, setting, friends) { // parameters from d3 queue
    
    // colored bands
    setting = setting
  
    // data for lines
    lineData = friends
    // map filtered elements to array => data that will be printed
    .map(function (d) {
        return {
            block_id: "f",
            position: parseInt(d.id) + 0.5,
            value: parseInt(d.value) * 30
        }
    })
    textData = friends
    // map filtered elements to array => data that will be printed
    .map(function (d) {
        return {
            block_id: "f",
            position: parseInt(d.id) + 0.5,
            value: faker.name.firstName()
        }
    })
    // data for stacks
    vertex1 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 1
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex2 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 2
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex3 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 3
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex4 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 4
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex5 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 5
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex6 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 6
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })

    vertex7 = friends
    // return elements with given condition
    .filter(function (d) {
      return d.edge >= 6 && d.isConnected != "true"
    })
    // map filtered elements to array => data that will be printed
    .map(function (d) {
      d.block_id = "f"
      d.start = parseInt(d.id)
      d.end = parseInt(d.id) + 0.9
      return d
    })
  
    circos
        // layout(data, config)
        .layout(
            setting,
            {
                innerRadius: width / 2 - 50,
                outerRadius: width / 2 - 30,
                labels: {
                display: false
                },
                ticks: {display: true, labels: false, spacing: 10000}
            }
        )
        // stack('id', data, config)
        .stack('vertex1', vertex1, { // block_id, start(index), end(index+1)
            innerRadius: 0.3,
            outerRadius: 0.316,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 1)},
            tooltipContent: function (d) {return tooltipVertex(d.id, 1)}
        })
        .stack('edge1', vertex2, { // block_id, start(index), end(index+1)
            innerRadius: 0.317,
            outerRadius: 0.4,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(2)}
        })
        .stack('vertex2', vertex2, { // block_id, start(index), end(index+1)
            innerRadius: 0.4,
            outerRadius: 0.416,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 2)},
            tooltipContent: function (d) {return tooltipVertex(d.vertex1, 2)}
        })
        .stack('edge2', vertex3, { // block_id, start(index), end(index+1)
            innerRadius: 0.417,
            outerRadius: 0.5,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(3)}
        })
        .stack('vertex3', vertex3, { // block_id, start(index), end(index+1)
            innerRadius: 0.5,
            outerRadius: 0.516,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 3)},
            tooltipContent: function (d) {return tooltipVertex(d.vertex2, 3)}
        })
        .stack('edge3', vertex4, { // block_id, start(index), end(index+1)
            innerRadius: 0.517,
            outerRadius: 0.6,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(4)}
        })
        .stack('vertex4', vertex4, { // block_id, start(index), end(index+1)
            innerRadius: 0.6,
            outerRadius: 0.616,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 4)},
            tooltipContent: function (d) {return tooltipVertex(d.vertex2, 4)}
        })
        .stack('edge4', vertex5, { // block_id, start(index), end(index+1)
            innerRadius: 0.617,
            outerRadius: 0.7,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(5)}
        })
        .stack('vertex5', vertex5, { // block_id, start(index), end(index+1)
            innerRadius: 0.7,
            outerRadius: 0.716,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 5)},
            tooltipContent: function (d) {return tooltipVertex(d.vertex2, 5)}
        })
        .stack('edge5', vertex6, { // block_id, start(index), end(index+1)
            innerRadius: 0.717,
            outerRadius: 0.8,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(6)}
        })
        .stack('vertex6', vertex6, { // block_id, start(index), end(index+1)
            innerRadius: 0.8,
            outerRadius: 0.816,
            thickness: vertexThickness,
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorVertex(d, 6)},
            tooltipContent: function (d) {return tooltipVertex(d.vertex2, 6)}
        })
        .line('bg', lineData, { 
            innerRadius: 0.817,
            outerRadius: 0.9,
            backgrounds: [
              {
                opacity: 0.9,
                color: '#27385d' // very dark blue
              }
            ]
        })
        .stack('edge7', vertex7, { // block_id, start(index), end(index+1)
            innerRadius: 0.817,
            outerRadius: 0.9,
            thickness: edgeThickness, // TODO
            margin: 0.01 * length,
            direction: 'out',
            strokeWidth: 0,
            color: function (d) {return colorEdge(d)},
            tooltipContent: function (d) {return tooltipEdge(6)}
        })
        // block_id, position(index), value
        .line('line', lineData, { 
            innerRadius: 0.1,
            outerRadius: 0.29,
            maxGap: 1000000,
            min: 0,
            max: 360,
            color: '#737788', // very dark blue
            axes: [
              {
                spacing: 36,
                thickness: 1,
                color: '#f7f7f7' // very light gray
              }
            ],
            tooltipContent: null
        })
        .text('text', textData, { 
            innerRadius: 0.91,
            outerRadius: 1,
            style: {
                'font-size': 9,
                fill: '#abafbd', // dark gray
                opacity: 1,
            },
            events: {}
        })
        
        // render
        .render()
  }

  d3.queue()
  .defer(d3.json, './data/setting.json')
  .defer(d3.csv, './data/friends.csv')
  .await(drawCircos)