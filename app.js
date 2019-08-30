const parseDate = d3.timeParse("%Y-%d-%m");

d3.json("data.json")
    .then(gdp => {

        const margin = {
            left: 60,
            right: 20,
            bottom: 40,
            top: 20
        };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

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
            .style("background", "rgba(221, 221, 221, 0.5)")

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        // Axis
        const xAxis = d3.axisBottom(xScale)
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d => d/1000 + "K")
        g.append("g")
            .attr("class", "y axis")
            .call(yAxis)



        const rect = g.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("width", (width / data.length))
            .attr("height", d => height - yScale(d[1]))
            .attr("x", (_, i) => i * (width / data.length))
            .attr("y", d => yScale(d[1]))
            .attr("fill", "#93A1A1")



    });