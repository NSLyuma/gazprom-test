const getTotal = (array1, array2) => array1.map((num, i) => num + array2[i]);

// get periods and legends
// we need only unique values, so I use Set
const periods = new Set(data.map((item) => item.period));
const legends = new Set(data.map((item) => item.name));

// create colors
const colors = ['#56B9F2', '#0078D2', '#22C38E', '#00724C'];

// get values for every unique name
const values = {};
data.forEach((item) =>
  values.hasOwnProperty(item.name)
    ? values[item.name].push(item.value)
    : (values[item.name] = [item.value]),
);

// create series
const chartSeries = Array.from(legends).map((item, i) => ({
  name: item,
  type: 'bar',
  stack: item.includes('Вне') ? 'out' : 'in',
  data: values[item],
  color: colors[i],
}));

// total values
const totalIn = getTotal(values['В программе ЦП'], values['В программе ИТ']);
const totalOut = getTotal(values['Вне программ ЦП'], values['Вне программ ИТ']);

// create labels
const labels = [
  {
    type: 'bar',
    tooltip: {
      show: false,
    },
    stack: 'in',
    label: {
      show: true,
      formatter: (params) => totalIn[params.dataIndex],
    },
    data: Array(periods.size).fill(0),
  },
  {
    type: 'bar',
    tooltip: {
      show: false,
    },
    stack: 'out',
    label: {
      show: true,
      formatter: (params) => totalOut[params.dataIndex],
    },
    data: Array(periods.size).fill(0),
  },
];
