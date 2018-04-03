// Set SVG attributes as variables
const height = 500;
const width = 500;
const padding = 35;
const scatterplot = d3.select("svg")

// Filter data to remove null values for subscribers & literacy rate
const filteredData = regionData.filter(d => {
  return d.subscribersPer100 !== null && d.adultLiteracyRate !== null
});

// Set X and Y-axis scales
const xScale = d3.scaleLinear()
                 .domain(d3.extent(filteredData, d => d.adultLiteracyRate))
                 .range([padding, width - padding]);

const yScale = d3.scaleLinear()
                 .domain(d3.extent(filteredData, d => d.subscribersPer100))
                 .range([height - padding, padding]);

// Add X & Y-Axis tick marks and format to remove overflow lines
const xAxis = d3.axisBottom(xScale)
                .tickSize(-height + padding * 2)
                .tickSizeOuter(0);

const yAxis = d3.axisLeft(yScale)
                .tickSize(-width + padding * 2)
                .tickSizeOuter(0);

// Append the X & Y-Axis as a grouped element on the SVG
scatterplot
  .append("g")
    .attr("transform", `translate(0,${height - padding})`)
    .call(xAxis);

scatterplot
  .append("g")
    .attr("transform", `translate(${padding},0)`)
    .call(yAxis);

// Set size of svg and create "circle" selection and join data
// For each item in enter selection, append circle to svg
scatterplot
    .attr("height", height)
    .attr("width", width)
  .selectAll("circle")
  .data(filteredData)
  .enter()
  .append("circle")
    .attr("cx", d => xScale(d.adultLiteracyRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("r", 5)

// Chart title
scatterplot
  .append("text")
    .text("Cellular Subscriptions vs Literacy Rate")
    .attr("x", width / 2)
    .attr("y", padding - 10)
    .style("text-anchor", "middle")
    .style("font-size", "1.2em")

// X-Axis Label
scatterplot
  .append("text")
    .text("Adult Literacy Rate (Over 15 yrs. old)")
    .attr("x", width / 2)
    .attr("y", height - padding)
    .attr("dy", "1.5em")
    .style("text-anchor", "middle")

// Y-Axis Label
scatterplot
  .append("text")
    .text("Cellular Subscribers per 100 People")
    .attr("x", -height / 2)
    .attr("y", padding)
    .attr("dy", "-1.5em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
