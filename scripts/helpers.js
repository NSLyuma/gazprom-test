// function for get array with total from 2 arrays
const getTotal = (array1, array2) => array1.map((num, i) => num + array2[i]);

// function for get percent from total value and it's part
const getPercents = (total, part) => Math.round((part * 100) / total);

// get current year for tooltip
const currentYear = new Date().getFullYear();

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
const totalCommon = getTotal(totalIn, totalOut);

// create labels
const labels = [
  {
    type: 'bar',
    tooltip: {
      show: false,
    },
    stack: 'in',
    label: {
      color: '#002033',
      fontSize: 14,
      fontWeight: 600,
      position: 'top',
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
      color: '#002033',
      fontSize: 14,
      fontWeight: 600,
      position: 'top',
      show: true,
      formatter: (params) => totalOut[params.dataIndex],
    },
    data: Array(periods.size).fill(0),
  },
];

// function for creating tooltip
const createTooltip = (params) => {
  const currentIndex = Array.from(periods).indexOf(params[0].axisValue);

  const currentInIT = values['В программе ИТ'][currentIndex];
  const currentInCP = values['В программе ЦП'][currentIndex];
  const currentOutIT = values['Вне программ ИТ'][currentIndex];
  const currentOutCP = values['Вне программ ЦП'][currentIndex];

  const currentTotalIn = totalIn[currentIndex];
  const currentTotalOut = totalOut[currentIndex];

  const currentPercentIn = getPercents(
    totalCommon[currentIndex],
    totalIn[currentIndex],
  );
  const currentPercentOut = getPercents(
    totalCommon[currentIndex],
    totalOut[currentIndex],
  );

  return `<div class="tooltip">
            <p>${params[0].axisValue} ${currentYear}</p>
            <p class="tooltip_subtitle">В программе
              <span>${currentPercentIn}% | ${currentTotalIn} шт.</span>
            </p>
            <div class="tooltip_label">
              <div class="tooltip_circle tooltip_circle_in-it"></div>
              <span class="tooltip_project">
              Проекты ИТ
                <span class="tooltip_values">${currentInIT} шт.</span>
              </span>
            </div>
            <div class="tooltip_label">
              <div class="tooltip_circle tooltip_circle_in-cp"></div>
              <span class="tooltip_project">
              Проекты ЦП
                <span class="tooltip_values">${currentInCP} шт.</span>
              </span>
            </div>
            <p class="tooltip_subtitle">Вне программ
              <span>${currentPercentOut}% | ${currentTotalOut} шт.</span>
            </p>
            <div class="tooltip_label">
              <div class="tooltip_circle tooltip_circle_out-it"></div>
              <span class="tooltip_project">
              Проекты ИТ
                <span class="tooltip_values">${currentOutIT} шт.</span>
              </span>
            </div>
            <div class="tooltip_label">
              <div class="tooltip_circle tooltip_circle_out-cp"></div>
              <span class="tooltip_project">
              Проекты ЦП
                <span class="tooltip_values">${currentOutCP} шт.</span>
              </span>
            </div>
          </div>`;
};
