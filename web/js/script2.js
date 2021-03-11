function openJSON(){
  d3.json("../cw1v3(withRegion).jsonld", function (data){
    console.log(data);
    var jsonData = data["@graph"];
    let university = [];
    for(let i = 0; i < jsonData.length; i++){
      university.push({
        name : jsonData[i]["owl:sameAs"],
        region : jsonData[i]["university:region"],
        male : +jsonData[i]["university:hasMale"],
        female : +jsonData[i]["university:hasFemale"],
        otherGender : +jsonData[i]["university:hasOtherGender"],
        under20 : +jsonData[i]["university:hasUnder20"],
        between2124 : +jsonData[i]["university:has2124"],
        between2529 : +jsonData[i]["university:has2529"],
        over30 : +jsonData[i]["university:hasOver30"],
        unknownAge : +jsonData[i]["university:hasUnknownAge"]
      });
    }
    console.log(university);
    console.log(university.filter(university => university.region == "LOND"));

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 20, right: 20, bottom: 20, left: 250 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    const axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
    const render = university =>{
      console.log(university[0].name);
      var xScale0 = d3.scaleBand()
        .range([0, innerWidth])
        .padding(.2);
      var xScale1 = d3.scaleBand();
      var yScale = d3.scaleLinear()
        .range([innerHeight, 0]);

      var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
      var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

      xScale0.domain(university.map(d => d.name));
      xScale1.domain(['male', 'female'])
        .range([0, xScale0.bandwidth()]);
      yScale.domain([0, d3.max(university, d => d.male > d.female ? d.male : d.female)]);
      var name = svg.selectAll(".name")
        .data(university)
        .enter()
        .append("g")
        .attr("class", "name")
        .attr("transform", d => `translate(${xScale0(d.name)},0)`);

        /* Add field1 bars */
        name.selectAll(".bar.male")
          .data(d => [d])
          .enter()
          .append("rect")
          .attr("class", "bar male")
        .style("fill","blue")
          .attr("x", d => xScale1('male'))
          .attr("y", d => yScale(d.male))
          .attr("width", xScale1.bandwidth())
          .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.male)
          });

        /* Add field2 bars */
        name.selectAll(".bar.female")
          .data(d => [d])
          .enter()
          .append("rect")
          .attr("class", "bar female")
        .style("fill","red")
          .attr("x", d => xScale1('female'))
          .attr("y", d => yScale(d.female))
          .attr("width", xScale1.bandwidth())
          .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.female)
          });

          // Add the X Axis
          svg.append("g")
               .attr("class", "x axis")
               .attr("transform", `translate(0,${innerHeight})`)
               .call(xAxis);
          // Add the Y Axis
          svg.append("g")
               .attr("class", "y axis")
               .call(yAxis);

    }

    let selection = university.filter(university => university.region == "LOND");
    render(selection);
    console.log(width);
    console.log(height);

  });
}
