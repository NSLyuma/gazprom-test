// init chart in existing element
const myChart = echarts.init(document.getElementById('main'));

// options for chart
const option = {
  title: {
    left: '30px',
    text: 'Проекты в программах и вне программ',
    textStyle: {
      fontSize: 16,
      fontWeight: 600,
      color: '#002033',
    },
    subtext:
      'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
    subtextStyle: {
      fontSize: 14,
      fontWeight: 400,
      color: '#00203399',
    },
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
