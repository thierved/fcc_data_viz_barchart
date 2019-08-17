const parseDate = d3.timeParse("%Y-%m-%d");

d3.json("data.json")
    .then(gdp => {
        
        const margin = {left: 50, right: 30, bottom: 50, top: 20};
        const width = 500 + margin.left + margin.right;
        const height = 500 + margin.top + margin.bottom;

        const extedData = gdp.data;
        
        const xScale = d3.scaleTime()
                .domain(d3.extent(extedData, d => parseDate(d[0])))
                .range([0, width - margin.right])

        const yScale = d3.scaleLinear()
                .domain(d3.extent(extedData, d => d[1]))
                .range([height, 0]);
                
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select("#viz").append("svg")
                .attr("width", width + margin.right)
                .attr("height", height + margin.bottom);

        d3.select("svg")
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .call(yAxis)
        
        d3.select("svg")
            .append("g")
                .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
                .call(xAxis);

        svg.selectAll("rect")
                .data(extedData)
                .enter().append("rect")
                        .attr("width", "2")
                        .attr("height", d => yScale(d[1]))
                        .attr("x", (d, i) => xScale(parseDate(d[0]))  + 50)
                        .attr("y", d => height - yScale(d[1]) + margin.top)
    });