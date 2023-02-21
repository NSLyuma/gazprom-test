// init chart
const myChart = echarts.init(document.getElementById('main'));

// get periods and legends
// we need only unique values, so I use Set
const periods = new Set(data.map((item) => item.period));
const legends = new Set(data.map((item) => item.name));

// init colors
const colors = ['#0078D2', '#56B9F2', '#00724C', '#22C38E'];

// get values for every unique name
const values = {};
data.forEach((item) =>
  values.hasOwnProperty(item.name)
    ? values[item.name].push(item.value)
    : (values[item.name] = [item.value]),
);

// create series array
const chartSeries = Array.from(legends)
  .sort()
  .map((item, i) => ({
    name: item,
    type: 'bar',
    stack: item.includes('Вне') ? 'out' : 'in',
    data: values[item],
    color: colors[i],
  }));

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
    show: true,
  },
  xAxis: {
    data: Array.from(periods),
  },
  yAxis: {},
  series: chartSeries,
};

myChart.setOption(option);
