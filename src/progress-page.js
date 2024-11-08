export { displayProgress };
import * as d3 from 'd3';
import { getStorageItem} from './local-storage.js';

function displayProgress(){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";
    mainContent.classList.add('progress-page');
    mainContent.classList.remove('shows-task-list')
    mainContent.classList.remove('search-content');

    let quoteContainer = document.createElement("div");
    quoteContainer.id = "quote-container";
    mainContent.appendChild(quoteContainer);

    let quote = document.createElement("p");
    quote.id = "quote";
    quoteContainer.appendChild(quote);

    quote.innerHTML = "“Small daily improvements are the key to staggering long-term results.”  <span id='author'>- Robin Sharma</span>";

    let graphNoOfDataPointSelector = document.createElement("div");
    graphNoOfDataPointSelector.id = "graph-data-point-selector";
    mainContent.appendChild(graphNoOfDataPointSelector);

    let progressContainer = document.createElement("div");
    progressContainer.id = "progress-container";
    mainContent.appendChild(progressContainer);

    

    // Number of data points to display on the graph
    graphNoOfDataPointSelector.innerHTML = `
        <input type="radio" id="seven-days" name="data-points" value="7">
        <input type="radio" id="thirty-days" name="data-points" value="30" checked>
        <input type="radio" id="full-year" name="data-points" value="365">
    `;

    let sevenDaysButton = document.getElementById("seven-days");
    sevenDaysButton.addEventListener("click", () => updateGraph(7));
    let thirtyDaysButton = document.getElementById("thirty-days");
    thirtyDaysButton.addEventListener("click", () => updateGraph(30));
    let fullYearButton = document.getElementById("full-year");
    fullYearButton.addEventListener("click", () => updateGraph(365));

    const graphData = prepareGraphData();
    drawGraph(graphData);
}

function updateGraph(numOfDataPoints) {
    let svg = d3.select("#progress-container").select("svg");
    svg.remove();
    let graphData = prepareGraphData(numOfDataPoints);
    drawGraph(graphData);
}

function prepareGraphData(numOfDataPoints = 30) {
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
        return { date: key, count: value };
    });

    // Date exactly numOfDataPoints days ago
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - numOfDataPoints);
    let firstDateString = d3.timeFormat("%Y-%m-%d")(firstDate);
    if(!completionDateCountMap.has(firstDateString)) {
        graphData.push({ date: firstDateString, count: 0 });
    }

    // Add today's date if it's not in the data
    let today = new Date();
    let todayString = d3.timeFormat("%Y-%m-%d")(today);
    if (!completionDateCountMap.has(todayString)) {
        graphData.push({ date: todayString, count: 0 });
    }

    graphData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Generate the complete date range based on task dates
    let dateRange = d3.timeDays(
        d3.min(graphData, d => parseDate(d.date)), 
        d3.timeDay.offset(d3.max(graphData, d => parseDate(d.date)), 1)
    );

    // Fill missing dates with 0 count
    let fullData = dateRange.map(date => {
        const dateString = d3.timeFormat("%Y-%m-%d")(date);
        return {
            date: dateString,
            count: completionDateCountMap.get(dateString) || 0
        };
    });
    fullData = fullData.slice(-numOfDataPoints);

    // Aggregate monthly data if numOfDataPoints is 365
    if (numOfDataPoints === 365) {
        let monthlyData = [];
        let currentMonth = new Date(fullData[0].date).getMonth();
        let monthlyCount = 0;

        fullData.forEach((data, index) => {
            let date = new Date(data.date);
            if (date.getMonth() === currentMonth) {
                monthlyCount += data.count;
            } else {
                monthlyData.push({ date: d3.timeFormat("%Y-%m")(new Date(fullData[index - 1].date)), count: monthlyCount });
                currentMonth = date.getMonth();
                monthlyCount = data.count;
            }
        });
        // Push the last month's data
        monthlyData.push({ date: d3.timeFormat("%Y-%m")(new Date(fullData[fullData.length - 1].date)), count: monthlyCount });
        return monthlyData;
    }
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

    // Detect date format (daily or monthly)
    let isMonthly = data.length > 0 && data[0].date.length === 7; // e.g., "YYYY-MM" for monthly
    let parseDate = isMonthly ? d3.timeParse("%Y-%m") : d3.timeParse("%Y-%m-%d");

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => parseDate(d.date)))
        .range([0, width]);

    const maxCount = d3.max(data, d => d.count);
    let y = d3.scaleLinear()
        .domain([0, maxCount > 4 ? maxCount : 4])
        .nice()
        .range([height, 0]);

    let xAxis = d3.axisBottom(x)
        .ticks(isMonthly ? d3.timeMonth.every(1) : data.length)
        .tickFormat(isMonthly ? d3.timeFormat("%Y-%m") : d3.timeFormat("%m/%d"))
        .tickPadding(10);

    let yAxis = d3.axisLeft(y).ticks(4).tickPadding(10);

    let line = d3.line()
        .x(d => x(parseDate(d.date)))
        .y(d => y(d.count))
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
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Tooltip
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
        .attr("cx", d => x(parseDate(d.date)))
        .attr("cy", d => y(d.count))
        .attr("r", 5)
        .on("mouseover", function(event, d) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`Date: ${d.date} <br> Count: ${d.count}`)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition().duration(200).style("opacity", 0);
        });
}