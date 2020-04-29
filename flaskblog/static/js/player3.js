                // USEFUL FUNCTIONS
                function mean(numbers) {
                    var total = 0,
                        i;
                    for (i = 0; i < numbers.length; i += 1) {
                        total += numbers[i];
                    }
                    return total / numbers.length;
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

                console.log(team);




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



                    if (names[i] == name) {
                        colors[i] = '#ff0000'

                    } else {
                        colors[i] = '#798FDA'
                    }
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

function set_my_options(my_label){
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
                Chart.defaults.global.defaultFontFamily = 'Times New Roman'
                var ctx = document.getElementById('mixedChart_gp').getContext('2d');
                Chart.scaleService.updateScaleDefaults('linear', {
                    ticks: {
                        min: 0
                    }
                });


                var mixedChart_gp = new Chart(ctx, {
                    type: 'bar',
                    data: {datasets:set_my_dataset("GP++++",gp,mean_line_gp),labels: names},
                    options: set_my_options('GP')
                });


                var ctx = document.getElementById('mixedChart_g').getContext('2d');
                var mixedChart_g = new Chart(ctx, {
                    type: 'bar',
                    data: {datasets:set_my_dataset('G',goals,mean_line_g),labels: names},
                    options: set_my_options('G')
                });

                var ctx = document.getElementById('mixedChart_pts').getContext('2d'); //////
                var mixedChart_pts = new Chart(ctx, {

                    type: 'bar',
                    data: {datasets:set_my_dataset("Points",PTS,mean_line_pts), labels: names,},
                    options: set_my_options('Points')
                });

                var ctx = document.getElementById('mixedChart_a').getContext('2d'); //////
                var mixedChart_a = new Chart(ctx, {

                    type: 'bar',
                    data: {
                    datasets: set_my_dataset('Assists',assists,mean_line_a),labels: names,},
                    options: set_my_options('Assists')

                });

                var ctx = document.getElementById('mixedChart_pims').getContext('2d'); //////
                var mixedChart_pims = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets:set_my_dataset('PIMS',PIMS,mean_line_pims),labels: names,},
                        options: set_my_options('Pims')
                });


                var ctx = document.getElementById('mixedChart_pointspg').getContext('2d'); //////
                var mixedChart_pointspg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets:set_my_dataset('points/Game',pointpg,mean_line_pointspg),labels: names},
                        options: set_my_options('Points/Game')
                });

                var ctx = document.getElementById('mixedChart_apg').getContext('2d'); //////
                var mixedChart_apg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets: set_my_dataset("A/Game",apg,mean_line_apg),
                        labels: names,
                    },
                    options: set_my_options('A/Game')


                });

                var ctx = document.getElementById('mixedChart_gpg').getContext('2d'); //////
                var mixedChart_gpg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets: set_my_dataset('G/game',gpg,mean_line_gpg),
                        labels: names,
                    },
                    options: set_my_options('G/Game--')


                });


                var ctx = document.getElementById('mixedChart_ppg').getContext('2d'); //////
                var mixedChart_ppg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets: set_my_dataset('PPG',ppg,mean_line_PPG),
                        labels: names,
                    },
                    options: set_my_options('PPG')


                });


                var ctx = document.getElementById('mixedChart_shg').getContext('2d'); //////
                var mixedChart_shg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets: set_my_dataset('SHG',shg,mean_line_shg),
                        labels: names,
                    },
                    options: set_my_options('SHG')


                });


                var ctx = document.getElementById('mixedChart_pimspg').getContext('2d'); //////
                var mixedChart_pimsspg = new Chart(ctx, {

                    type: 'bar',
                    data: {
                        datasets: set_my_dataset('PIMS/Game',PIMS_pergame,mean_line_pimspg),
                        labels: names,
                    },
                    options: set_my_options('PIMS/Game')
                });
