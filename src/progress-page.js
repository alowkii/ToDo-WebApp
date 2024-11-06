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

function prepareGraphData(){
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

    console.log(fullData);
    console.log(graphData);
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

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.count; })])
        .nice()  // To make axis end on round numbers
        .range([height, 0]);

    let xAxis = d3.axisBottom(x).ticks(data.length)
                    .tickFormat(d3.timeFormat("%m/%d"))
                    .tickPadding(10);
    let yAxis = d3.axisLeft(y)
                    .ticks(d3.max(data, function(d) { return d.count; }));

    let line = d3.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return y(d.count); })
        .curve(d3.curveLinear);

    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw line path
    chartGroup.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

    // var tooltip = d3.select("#progress-container")
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0)
    //     .style("position", "absolute");

    // // Draw data points
    // chartGroup.selectAll("circle")
    //     .data(data)
    //     .enter().append("circle")
    //     .attr("cx", function(d) { return x(parseDate(d.date)); })
    //     .attr("cy", function(d) { return y(d.count); })
    //     .attr("r", 1)
    //     .on("mouseover", function(d) {
    //         d3.select(this)
    //             .attr("r", 5)
    //             .attr("fill", "black");
    //         tooltip.style("opacity", .9)
    //             .style("left", 100 + "px")
    //             .style("top", 100 + "px");
    //         tooltip.html(`Tasks completed on ${d.date}: ${d.count}`);
    //     })
    //     .on("mouseout", function(d) {
    //         d3.select(this)
    //             .attr("r", 1);
    //         tooltip.style("opacity", 0);
    //     });

    // Draw x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Draw y-axis
    chartGroup.append("g")
        .call(yAxis);
}


displayProgress();