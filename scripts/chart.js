// init chart
const myChart = echarts.init(document.getElementById('main'));

// options for chart
const option = {
  title: {
    text: 'Проекты в программах и вне программ',
    subtext:
      'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
  },
  tooltip: {},
  legend: {
    data: Array.from(legends).sort(),
    top: 'bottom',
    icon: 'circle',
  },
  xAxis: {
    data: Array.from(periods),
  },
  yAxis: {},
  series: [...chartSeries, ...labels],
};

myChart.setOption(option);
