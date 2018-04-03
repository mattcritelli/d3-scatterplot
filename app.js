// Set SVG attributes as variables
const height = 800;
const width = 800;
const padding = 20;
const filteredData = regionData.filter(d => {
  return d.subscribersPer100 !== null && d.adultLiteracyRate !== null
})

// Set X and Y-axis scales
const yScale = d3.scaleLinear()
                 .domain(d3.extent(filteredData, d => d.subscribersPer100))
                 .range([height - padding, padding])

const xScale = d3.scaleLinear()
                 .domain(d3.extent(filteredData, d => d.adultLiteracyRate))
                 .range([padding, width - padding])

d3.select("svg")
    .attr("height", height)
    .attr("width", width)
