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

    console.log(university.filter(university => university.region == "LOND"));

    const svg = d3.select('svg');
    const circle = svg.append('circle');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 20, right: 20, bottom: 20, left: 250 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    const currentRegion = 'London'
    const condiction = 'Genger'
    const render = data =>{
      const xValue = d => d.male;
      const xValue2 = d => d.female;
      const yValue = d => d.name;

      console.log(d => xValue(d));
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);
      const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight]);

      const xScale2 = d3.scaleLinear()
        .domain([0, d3.max(data, xValue2)])
        .range([0, innerWidth]);
      const yScale2 = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight]);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();
      g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);

      g.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('class', 'male')
          .attr('y', d => yScale(yValue(d)))
          .attr('width', d => xScale(xValue(d)))
          .attr('height', yScale.bandwidth()/2);

      const g2 = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      g2.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('class', 'female')
          .attr('y', d => yScale2(yValue(d)))
          .attr('width', d => xScale2(xValue2(d)))
          .attr('height', yScale.bandwidth()/2)
          .attr('transform', `translate(0,${yScale.bandwidth()/2})`);
    }

    let selection = university.filter(university => university.region == "LOND");
    render(selection);
    console.log(width);
    console.log(height);

  });
}
