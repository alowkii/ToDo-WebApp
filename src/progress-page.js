export { displayProgress };
import * as d3 from 'd3';
import { getStorageItem} from './local-storage.js';

function displayProgress(){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";
    mainContent.classList.add('progress-page');
    mainContent.classList.remove('shows-task-list');

    let progressContainer = document.createElement("div");
    progressContainer.id = "progress-container";
    mainContent.appendChild(progressContainer);

    const graphData = prepareGraphData();
    drawGraph(graphData);
}

function prepareGraphData(numOfDataPoints = 30){
    let data = JSON.parse(getStorageItem('tasks'));
    let completionDateCountMap = new Map();
    let parseDate = d3.timeParse("%Y-%m-%d");

    // Populate completionDateCountMap with task completion counts
    data.forEach(task => {
        if (task.complete) {
            const date = task.completionDate;
            completionDateCountMap.set(date, (completionDateCountMap.get(date) || 0) + 1);
        }
    });

    // Convert the map into an array of objects and sort by date
    let graphData = Array.from(completionDateCountMap).map(([key, value]) => {
        return {date: key, count: value};
    });

    let today = new Date();
    //Add data for today if it is not in the data
    let todayString = d3.timeFormat("%Y-%m-%d")(today);
    if (!completionDateCountMap.has(todayString)) {
        graphData.push({date: todayString, count: 0});
    }

    graphData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    // Generate the complete date range based on task dates
    let dateRange = d3.timeDays(
        d3.min(data, d => parseDate(d.completionDate)), 
        d3.timeDay.offset(d3.max(graphData, d => parseDate(d.date)), 1)
    );

    // Fill missing dates with 0 count
    let fullData = dateRange.map(date => {
        const dateString = d3.timeFormat("%Y-%m-%d")(date);
        return {
            date: dateString,
            count: completionDateCountMap.get(dateString) || 0 // Set count to 0 if date is missing
        };
    });

    fullData = fullData.slice(-numOfDataPoints);
    return fullData;

}

function drawGraph(data) {
    let margin = { top: 50, right: 50, bottom: 50, left: 50 };
    let height = 400 - margin.top - margin.bottom;
    let width = 1000 - margin.left - margin.right;

    let svg = d3.select("#progress-container")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right);

    let parseDate = d3.timeParse("%Y-%m-%d");

    let x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return parseDate(d.date); }))
        .range([0, width]);

    const maxCount = d3.max(data, function(d) { return d.count; });
    let y = d3.scaleLinear()
        .domain([0, maxCount > 4 ? maxCount : 4])
        .nice()  // To make axis end on round numbers
        .range([height, 0]);

    let xAxis = d3.axisBottom(x).ticks(data.length)
                    .tickFormat(d3.timeFormat("%m/%d"))
                    .tickPadding(10);
    let yAxis = d3.axisLeft(y)
                    .ticks(maxCount > 4 ? maxCount : 4);

    let line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(d.count); })
        .curve(d3.curveLinear);

    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw x-axis
    chartGroup.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Draw y-axis
    chartGroup.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Draw line path
    chartGroup.append("path")
        .datum(data)
        .attr("d", line);


    var tooltip = d3.select("#progress-container")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute");

    // Draw data points
    chartGroup.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "data-point")
        .attr("cx", function(d) { return x(parseDate(d.date)); })
        .attr("cy", function(d) { return y(d.count); })
        .attr("r", 5)
        .on("mouseover", function(event, d) {
            d3.select(this)
            tooltip.style("opacity", .9)
                .style("left", d3.pointer(event)[0] + margin.left + margin.right + 120 + "px")
                .style("top", d3.pointer(event)[1] + margin.top + margin.bottom + 20 + "px");
            tooltip.html(`Date: ${d.date} <br> Count: ${d.count}`);
        })
        .on("mouseout", function(d) {
            tooltip.style("opacity", 0);
        });
}


displayProgress();