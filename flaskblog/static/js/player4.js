// USEFUL FUNCTIONS
// USEFUL FUNCTIONS
function mean(numbers) {
    var total = 0,
        i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}


  // Here is how you can merge and sort data and labels together. first sort them then assign newArrayData to data property and newArrayLabel to labels property of your config object.
  //
  // arrayLabel = ["Total", "301 Redirect", "Broken Pages (4xx Errors)", "Uncategorised HTTP Response Codes", "5xx Errors", "Unauthorised Pages", "Non-301 Redirects"]
  //
  // arrayData = [16, 1, 14, 0, 0, 0, 1];

function mySort(arrayData,arrayLabel) {
  arrayOfObj = arrayLabel.map(function(d, i) {
    return {
      label: d,
      data: arrayData[i] || 0
    };
  });

  sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
    return b.data>a.data;
  });

  newArrayLabel = [];
  newArrayData = [];
  sortedArrayOfObj.forEach(function(d){
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
    console.log(newArrayLabel);
    console.log(newArrayData);

  });
  return [newArrayLabel,newArrayData];
}




//document.write(name);
var mean_line_gp = []
var mean_line_g = []
var mean_line_pts=[]
var mean_line_a=[]
var mean_line_PPG=[]
var mean_line_shg=[]
var mean_line_pims=[]
var mean_line_pimspg=[]
var mean_line_gpg=[]
var mean_line_apg=[]
var mean_line_pointspg=[]



var team = attributes;
var names = []
var goals = []
var assists = []
var pointpg = []
var gpg = []
var apg = []
var PIMS = []
var PIMS_pergame = []
var PTS = []
var gp = []
var ppg=[]
var shg=[]






for (x in team.Name) {

    mean_line_gp.push(team.GP[String(x)])
    mean_line_g.push(team.G[String(x)])
    mean_line_pts.push(team.PTS[String(x)])
    mean_line_a.push(team.A[String(x)])

    mean_line_shg.push(team.SHG[String(x)])
    mean_line_gpg.push(team['G/Game'][String(x)])
    mean_line_apg.push(team['A/Game'][String(x)])
    mean_line_PPG.push(team.PPG[String(x)])

    mean_line_pims.push(team.PIMS[String(x)])
    mean_line_pimspg.push(team['PIMS/Game'][String(x)])
    mean_line_pointspg.push(team['PTS/Game'][String(x)])

    names.push(team.Name[String(x)])
    goals.push(team.G[String(x)])
    PTS.push(team.PTS[String(x)])
    assists.push(team.A[String(x)])
    pointpg.push(team['PTS/Game'][String(x)])
    PIMS.push(team.PIMS[String(x)])
    PIMS_pergame.push(team['PIMS/Game'][String(x)])
    gp.push(team.GP[String(x)])
    apg.push(team['A/Game'][String(x)])
    gpg.push(team['G/Game'][String(x)])
    ppg.push(team.PPG[String(x)])
    shg.push(team.SHG[String(x)])
}
m_gp = mean(mean_line_gp)
m_a=mean(mean_line_a)
m_g=mean(mean_line_g)
m_pts=mean(mean_line_pts)
m_pimspg=mean(mean_line_pimspg)
m_gpg = mean(mean_line_gpg)
m_apg=mean(mean_line_apg)
m_pointspg=mean(mean_line_pointspg)
m_shg=mean(mean_line_shg)
m_PPG=mean(mean_line_PPG)

m_pims = mean(mean_line_pims)
mean_line_pimspg=mean(mean_line_pimspg)
mean_line_PPG=mean(mean_line_PPG)
mean_line_shg=mean(mean_line_shg)


mean_line_gp = []
mean_line_g = []
mean_line_pts = []
mean_line_apg = []
mean_line_gpg = []
mean_line_pointspg = []
mean_line_PPG=[]
mean_line_a=[]
mean_line_pims=[]
mean_line_pimspg=[]
mean_line_shg=[]


var colors = []
for (var i = 0; i < names.length; i++) {


    mean_line_gp.push(m_gp)
    mean_line_g.push(m_g)
    mean_line_a.push(m_a)
    mean_line_pts.push(m_pts)
    mean_line_PPG.push(m_PPG)
    mean_line_pims.push(m_pims)
    mean_line_pimspg.push(m_pimspg)
    mean_line_shg.push(m_shg)
    mean_line_pointspg.push(m_pointspg)
    mean_line_apg.push(m_apg)
    mean_line_gpg.push(m_gpg)



  }


function set_my_dataset(my_label,my_data,my_mean_line){



set=[

{

label: 'average',
data: my_mean_line,
borderColor: 'black',
borderWidth: 1,
backgroundColor: 'black',
fill: false,
pointRadius: 0,
borderDash: [15,10],
type:'line',
},
{
label: my_label,
backgroundColor: colors,
borderColor: 'black',
data: my_data,
type: 'bar',
}
]
return set
}

function set_my_options(my_label,names){
  for (var i = 0; i < names.length; i++) {
  if (names[i] == name) {
      colors[i] = '#ff0000'

  } else {
      colors[i] = '#798FDA'
  }
}
var myOptions={


    legend: {
        display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
        display: true,

        fontSize: 16,
        text: team['Team'][1],
        fontColor: 'black'

    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: my_label,/////////////////////
                fontColor: 'black'
            },
            ticks: {
                fontColor: 'black'

            }
        }],
        xAxes: [{
            ticks: {
                fontColor: 'black'
            }
        }]
    }}
    return myOptions
}
Chart.defaults.global.defaultFontFamily = 'Sintony'
var ctx = document.getElementById('mixedChart_gp').getContext('2d');
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});

sortgp=mySort(gp,names)
console.log(sortgp);
var mixedChart_gp = new Chart(ctx, {
    type: 'bar',
    data: {datasets:set_my_dataset("GP++++",sortgp[1],mean_line_gp),labels: sortgp[0]},
    options: set_my_options('GP',sortgp[0])

});

sortg=mySort(goals,names)
var ctx = document.getElementById('mixedChart_g').getContext('2d');
var mixedChart_g = new Chart(ctx, {
    type: 'bar',
    data: {datasets:set_my_dataset('G',sortg[1],mean_line_g),labels: sortg[0]},
    options: set_my_options('G',sortg[0])
});

var ctx = document.getElementById('mixedChart_pts').getContext('2d'); //////
var mixedChart_pts = new Chart(ctx, {

    type: 'bar',
    data: {datasets:set_my_dataset("Points",PTS,mean_line_pts), labels: names,},
    options: set_my_options('Points',names)
});
sorta=mySort(assists,names)
var ctx = document.getElementById('mixedChart_a').getContext('2d'); //////
var mixedChart_a = new Chart(ctx, {

    type: 'bar',
    data: {
    datasets: set_my_dataset('Assists',sorta[1],mean_line_a),labels: sorta[0],},
    options: set_my_options('Assists',sorta[0])

});
sortpims=mySort(PIMS,names)
var ctx = document.getElementById('mixedChart_pims').getContext('2d'); //////
var mixedChart_pims = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets:set_my_dataset('PIMS',sortpims[1],mean_line_pims),labels: sortpims[0],},
        options: set_my_options('Pims',sortpims[0])
});

sortppg=mySort(pointpg,names)
var ctx = document.getElementById('mixedChart_pointspg').getContext('2d'); //////
var mixedChart_pointspg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets:set_my_dataset('points/Game',sortppg[1],mean_line_pointspg),labels: sortppg[0]},
        options: set_my_options('Points/Game',sortppg[0])
});
sortapg=mySort(apg,names)
var ctx = document.getElementById('mixedChart_apg').getContext('2d'); //////
var mixedChart_apg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets: set_my_dataset("A/Game",sortapg[1],mean_line_apg),
        labels: sortapg[0],
    },
    options: set_my_options('A/Game',sortapg[0])


});
sortgpg=mySort(gpg,names)
var ctx = document.getElementById('mixedChart_gpg').getContext('2d'); //////
var mixedChart_gpg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets: set_my_dataset('G/game',sortgpg[1],mean_line_gpg),
        labels: sortgpg[0],
    },
    options: set_my_options('G/Game--',sortgpg[0])


});

sortpow=mySort(ppg,names)
var ctx = document.getElementById('mixedChart_ppg').getContext('2d'); //////
var mixedChart_ppg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets: set_my_dataset('PPG',sortpow[1],mean_line_PPG),
        labels: sortpow[0],
    },
    options: set_my_options('PPG',sortpow[0])


});

sortshg=mySort(shg,names)
var ctx = document.getElementById('mixedChart_shg').getContext('2d'); //////
var mixedChart_shg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets: set_my_dataset('SHG',sortshg[1],mean_line_shg),
        labels: sortshg[0],
    },
    options: set_my_options('SHG',sortshg[0])


});

sortpimspg=mySort(PIMS_pergame,names)
var ctx = document.getElementById('mixedChart_pimspg').getContext('2d'); //////
var mixedChart_pimsspg = new Chart(ctx, {

    type: 'bar',
    data: {
        datasets: set_my_dataset('PIMS/Game',sortpimspg[1],mean_line_pimspg),
        labels: sortpimspg[0],
    },
    options: set_my_options('PIMS/Game',sortpimspg[0])
});
