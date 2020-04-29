function mean(numbers) {
    var total = 0,
        i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length
}
//console.log(data[10].Name);

const stat_list = ['G', 'A', 'PTS', 'PIMS','GP','SHG','PPG','G/Game','A/Game','P/Game','PIMS/Game'];
var mean_vals=[];
const stat_list_match = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
const mean_list_match = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

const name_list = [];
var gpg=[];
var pimspg=[];
var apg=[];
var ptspg=[];
const g = [];
var ppg=[];
var gp=[];
const mean_stats = [];
const a = [];
const pts = [];
const pims = [];
var shg=[];
tg = 0;
const tg_list = [];
const mg_list = [];
const target_bar = [];
const tstats = [];
for (i in data) {
    name_list.push(data[i].Name)
    g.push(data[i].G)
    ppg.push(data[i].PPG)
    shg.push(data[i].SHG)
    gp.push(data[i].GP)
    a.push(data[i].A)
    pts.push(data[i].PTS)
    pims.push(data[i].PIMS)
    gpg.push(data[i]['G/Game'])
    ptspg.push(data[i]['P/Game'])
    apg.push(data[i]['A/Game'])
    pimspg.push(data[i]['PIMS/Game'])

}
console.log(mean(gp))
//console.log(name_list)
for (i in name_list) {

    if (name_list[i] == name) {
        for (s in stat_list) {
            if (data[i][stat_list[s]]<1 &&data[i][stat_list[s]]>0 ){
            tstats.push( (Math.round(data[i][stat_list[s]] * 100) / 100).toFixed(2))
            }
            else{tstats.push(data[i][stat_list[s]])}
        }
    }

}
mean_vals=[mean(g),mean(a),mean(pts),mean(pims),mean(gp),mean(shg),mean(ppg),mean(gpg),mean(apg),mean(ptspg),mean(pimspg)]
console.log(mean_vals)
console.log(tstats)
for (i in data) {
    for (s in stat_list) {
        if (tstats[s] == data[i][stat_list[s]]) {
            stat_list_match[s].push(data[i][stat_list[s]])
        }
        if (Math.round(mean_vals[s]) == data[i][stat_list[s]]) {
            mean_list_match[s].push(data[i][stat_list[s]])
        }
    }
}
console.log(stat_list_match)
console.log(mean_list_match)


///////////////
var chart_type = 'histogram';
var ledgend = 'acha';
var ledgent2 = 'average';
var op1 = .5;
var op2 = .5;
var op3 = .5;
var paper_bgcolor = 'rgba(100,0,0,0)';
var plot_bgcolor = 'rgba(0,100,0,0)';
var chart_bargap = .05;
var chart_color1 = 'blue';
var chart_color2 = 'red';
var chart_color3 = 'black';
var y_title = 'Count';
var chart_static = false;
var yticks = 10;
var xticks = 20;
var auto_size = true;

var width= 500;
var height= 400;
var font = {
    family: 'Sintony',
    size: 18,
    color: 'black'
}

var font1 = {
    family: "Sintony",
    size: 12,
    color: "black"
}

///////////////
function fill_layout(title, x_axis) {
    my_layout = {
        barmode: 'overlay',
        showlegend:false,
        paper_bgcolor: paper_bgcolor,
        plot_bgcolor: plot_bgcolor,
        autosize: auto_size,
        bargap: chart_bargap,
        //bargroupgap: 0.2,
        title: {
            text: title,
            font: font
        },
        xaxis: {
          tickfont:{
            family:"Sintony"
          },


            title: {
                text: x_axis,
                font: font1,

            },
            nticks: xticks
        },
        yaxis: {
          tickfont:{
            family:"Sintony"
          },
            title: {
                text: y_title,
                font: font1,
                fontColor:'blue'

            },

        }
    };
    return my_layout
}


var acha = {
    x: g,
    type: chart_type,
    mode: 'markers',
    font: font,
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[0],tstats[0]],
    y:[0,400],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,400],
    x: [mean_vals[0],mean_vals[0]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};

// var playername = {
//
//     x: stat_list_match[0],
//     type: chart_type,
//     name: name,
//     opacity: op2,
//     marker: {
//         color: chart_color2
//     }
// };
// var average = {
//
//     x: mean_list_match[0],
//     name: ledgent2,
//     opacity: op3,
//     type: chart_type,
//     marker: {
//         color: chart_color3
//     }
// };


var data = [acha, average, playername];
Plotly.newPlot('myDiv1', data, fill_layout('ACHA-Goals', 'Goals'), {
    staticPlot: chart_static
});


var acha = {
    x: a,
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[1],tstats[1]],
    y:[0,400],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,400],
    x: [mean_vals[1],mean_vals[1]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};

// var playername = {
//
//     x: stat_list_match[1],
//     type: chart_type,
//     name: name,
//     opacity: op2,
//     marker: {
//         color: chart_color2
//     }
// };
// var average = {
//
//     x: mean_list_match[1],
//     name: ledgent2,
//     opacity: op3,
//     type: chart_type,
//     marker: {
//         color: chart_color3
//     }
// };


var data = [acha, average, playername];
Plotly.newPlot('myDiv2', data, fill_layout('ACHA-Assists', 'Assists'), {
    staticPlot: chart_static
});

var acha = {
    x: pts,
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[2],tstats[2]],
    y:[0,300],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,300],
    x: [mean_vals[2],mean_vals[2]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};




var data = [acha, average, playername];
Plotly.newPlot('myDiv', data, fill_layout('ACHA Points', 'Points'), {
    staticPlot: chart_static
});

var acha = {
    x: pims,

    type: chart_type,
    autobinx : false,
    xbins: {
        start: 0,
        size: 5,
        end: 100
    },
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[3],tstats[3]],
    y:[0,800],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,800],
    x: [mean_vals[3],mean_vals[3]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};


var data = [acha, average, playername];
Plotly.newPlot('myDiv3', data, fill_layout('ACHA PIMS', 'PIMS'), {
    staticPlot: chart_static
});

var acha = {
    x: a,
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[1],tstats[1]],
    y:[0,400],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,400],
    x: [mean_vals[1],mean_vals[1]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};
// var playername = {
//
//     x: stat_list_match[1],
//     type: chart_type,
//     name: name,
//     opacity: op2,
//     marker: {
//         color: chart_color2
//     }
// };
// var average = {
//
//     x: mean_list_match[1],
//     name: ledgent2,
//     opacity: op3,
//     type: chart_type,
//     marker: {
//         color: chart_color3
//     }
// };


var data = [acha, average, playername];
Plotly.newPlot('myDiv2', data, fill_layout('ACHA Assists', 'Assists'), {
    staticPlot: chart_static
});

var acha = {
    x: gp,
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[4],tstats[4]],
    y:[0,200],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,200],
    x: [mean_vals[4],mean_vals[4]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};

var data = [acha, average, playername];
Plotly.newPlot('myDiv4', data, fill_layout('ACHA GP', 'GP'), {
    staticPlot: chart_static
});


var acha = {
    x: shg,

    xbins: {
        start: -.5,
        size: 1,
        end: 8.5,
        autobinx : false,
    },
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[5],tstats[5]],
    y:[0,2000],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,2000],
    x: [mean_vals[5],mean_vals[5]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};




var data = [acha, average, playername];
Plotly.newPlot('myDiv5', data, fill_layout('ACHA SHG', 'SHG'), {
    staticPlot: chart_static
});

var acha = {
    x: ppg,

    xbins: {
        start: -.5,
        size: 1,
        end: 20.5,
        autobinx : false,
    },
    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};
var playername = {

    x: [tstats[6],tstats[6]],
    y:[0,1500],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,1500],
    x: [mean_vals[6],mean_vals[6]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};

// var playername = {
//
//     x: stat_list_match[6],
//
//     xbins: {
//         start: -.5,
//         size: 1,
//         end: 20.5,
//         autobinx : false,
//     },
//     type: chart_type,
//     name: name,
//     opacity: op2,
//     marker: {
//         color: chart_color2
//     }
// };
// var average = {
//
//     x: mean_list_match[6],
//     autobinx : false,
//     xbins: {
//         start: -.5,
//         size: 1,
//         end: 20.5,
//         autobinx : false,
//     },
//     name: ledgent2,
//     opacity: op3,
//     type: chart_type,
//     marker: {
//         color: chart_color3
//     }
// };


var data = [acha, average, playername];
Plotly.newPlot('myDiv6', data, fill_layout('ACHA PPG', 'PPG'), {
    staticPlot: chart_static
});

var acha = {
    x: gpg,

    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[7],tstats[7]],
    y:[0,300],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,300],
    x: [mean_vals[7],mean_vals[7]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};


var data = [acha, average, playername];
Plotly.newPlot('myDiv7', data, fill_layout('ACHA G/Game','G/Game'), {
    staticPlot: chart_static
});

var acha = {
    x: apg,

    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[8],tstats[8]],
    y:[0,300],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,300],
    x: [mean_vals[8],mean_vals[8]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};


var data = [acha, average, playername];
Plotly.newPlot('myDiv8', data, fill_layout('ACHA A/Game','A/Game'), {
    staticPlot: chart_static
});

var acha = {
    x: ptspg,

    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[9],tstats[9]],
    y:[0,200],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,200],
    x: [mean_vals[9],mean_vals[9]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};


var data = [acha, average, playername];
Plotly.newPlot('myDiv9', data, fill_layout('ACHA PTS/Game','PTS/Game'), {
    staticPlot: chart_static
});
var acha = {
    x: pimspg,

    type: chart_type,
    mode: 'markers',
    name: ledgend,
    opacity: op1,
    marker: {
        color: chart_color1
    }
};

var playername = {

    x: [tstats[10],tstats[10]],
    y:[0,250],
    mode:'lines',
    name: name,
    opacity: op2,
    line: {
        color: chart_color2,
        dash:'dot'
    }
};
var average = {
    y:[0,250],
    x: [mean_vals[10],mean_vals[10]],
    name: ledgent2,
    opacity: op3,
    mode:'lines',
    line: {
        color: chart_color3,
        dash:'dot'
    }
};


var data = [acha, average, playername];
Plotly.newPlot('myDiv10', data, fill_layout('ACHA PIMS/Game','PIMS/Game'), {
    staticPlot: chart_static
});

var values = tstats

var data = [{
type: 'table',
header: {
  values: stat_list,
  align: ["top", "center"],
  line: {width: 1, color: 'black'},
  fill: {color: 'black'},
  font: {family: "Arial", size: 12, color: "white"}
},
cells: {
  values: values,
  align: ["left", "center"],
  line: {color: "black", width: 1},
   fill: {color: ['white', 'white']},
  font: {family: "Arial", size: 11, color: ["black"]}
}
}]

Plotly.newPlot('myDiv11', data,{staticPlot: true},{
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  });
