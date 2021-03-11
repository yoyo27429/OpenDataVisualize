function openJSON(){
  d3.json("../cw1v3(withRegion).jsonld", function (data){
    // console.log(data);
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
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 20, right: 20, bottom: 20, left: 250 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    const axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
    const render = university =>{
      const xMale = d => d.male;
      const xFemale = d => d.female;

      const xScale = d3.scaleLinear()
        // .domain([0, d3.max(university, d => d.male > d.female ? d.male : d.female)])
        .domain([0, d3.max(university, xMale)])
        .range(0, innerWidth);
      const yScale1 = d3.scaleBand()
        .domain(university.map(d => d.name))
        .range([0, innerHeight]);
      const yScale2 = d3.scaleBand()
        .domain(['male', 'female'])
        .range([0, yScale1.bandwidth()]);
      console.log(xScale.domain());
      svg.selectAll('rect')
        .data(university)
        .enter()
        .append('rect')
        // .attr('x', d => xScale(d.male))
        // .attr('y', d => yScale2('male'))
        .attr('width', d => xScale(xMale(d)))
        .attr('height', yScale1.bandwidth());

    }

    let selection = university.filter(university => university.region == "LOND");
    render(selection);
    console.log(width);
    console.log(height);

  });
}
