// init chart in existing element
const myChart = echarts.init(document.getElementById('main'));

// options for chart
const option = {
  title: {
    text: 'Проекты в программах и вне программ',
    subtext:
      'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => createTooltip(params),
  },
  legend: {
    data: Array.from(legends).sort(),
    top: 'bottom',
    icon: 'circle',
  },
  xAxis: {
    data: Array.from(periods),
  },
  yAxis: {
    type: 'value',
  },
  series: [...chartSeries, ...labels],
};

// add options in chart
myChart.setOption(option);
