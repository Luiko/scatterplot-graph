import './index.html';
import './index.css';
import * as d3 from 'd3';
import dataset from './dataset.json';

const getTime = (t) => {
  switch (typeof t) {
    case 'string':
      return new Date(`27 Jan 1993, 00:${t}`);
    case 'number':
      const date = new Date('27 Jan 1993, 00:00:00');
      date.setSeconds(t);
      return date;
    default:
      return null;
  }
}

const bestTime = dataset[0]['Seconds'];
let mayorTime = dataset[dataset.length - 1]['Seconds'];
mayorTime = getTime(mayorTime - bestTime);

const yScale = d3.scaleLinear().domain([1, 35]).range([15, 385]);

const xScale = d3.scaleTime().domain([mayorTime, getTime('00:00')]).range([15, 785]);

const verticalAxis = d3.axisRight(yScale);
const horizontalAxis = d3.axisBottom(xScale);


const svg = d3.select('svg');

svg
  .append('g')
  .attr('transform', 'translate(15, -5)')
  .call(verticalAxis)
;

horizontalAxis.tickFormat(d3.timeFormat('%M:%S'));

svg
  .append('g')
  .attr('transform', `translate(0, 380)`)
  .call(horizontalAxis)
;

svg
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
    .style('fill', 'yellow')
    .attr('r', 5)
    .attr('cx', (d) => xScale(getTime(d['Seconds'] - bestTime)))
    .attr('cy', (d, i) => yScale(i) + 5)
;
