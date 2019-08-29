const parseDate = d3.timeParse("%Y-%d-%m");

d3.json("data.json")
    .then(gdp => {
        
        const margin = {left: 40, right: 20, bottom: 40, top: 20};
        const width = 800 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const data = gdp.data;
        data.forEach(d => {
            d[0] = parseDate(d[0])
        });
        
        // scaling the axis
        const xScale = d3.scaleTime()
                .domain(d3.extent(data, d => d[0]))
                .range([0, width])

        const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d[1]))
                .range([height, 0])

        // creating the bars
        const svg = d3.select('#viz').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const rect = svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                    .attr("width", (width / data.length) + 5)
                    .attr("height", d => height - yScale(d[1]) + margin.top)
                    .attr("x", (_, i) => i * (width / data.length))
                    .attr("y", d => yScale(d[1]))
                    .attr("fill", "#f25")


                    
});