function openJSON(){
  d3.json("../cw1v3(withRegion).jsonld", function (data){
    console.log(data);
    var jsonData = data["@graph"];
    let university = [];
    // add every object to university array
    for(let i = 0; i < jsonData.length; i++){
      university.push({
        name : jsonData[i]["owl:sameAs"],
        region : jsonData[i]["university:region"],
        male : +jsonData[i]["university:hasMale"],
        female : +jsonData[i]["university:hasFemale"],
        under20 : +jsonData[i]["university:hasUnder20"],
        between2124 : +jsonData[i]["university:has2124"],
        between2529 : +jsonData[i]["university:has2529"],
        over30 : +jsonData[i]["university:hasOver30"]
      });
    }
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 20, right: 20, bottom: 20, left: 250 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.right - margin.left;
    var bartip = d3.select("body")
      .append("div")
      .attr('class', 'bartip');

// When user choose Gender as the category, then will call this function
    const renderGender = data =>{
      // remove the previous svg on the page
      svg.selectAll('*').remove();
      // Scale the number to screan, find the max number in male and female data
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.male > d.female ? d.male : d.female)])
        .range([0, innerWidth]);
      // Scale height to every university which will shows in this page.
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight]);
      // In every university, I divide to male and female bar
      const yScale2 = d3.scaleBand()
        .domain(['male', 'female'])
        .range([0, yScale.bandwidth()])
        .padding(.5);

      const axis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      // render axis and remove unnecessary tick and line
      axis.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();
      axis.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);
      // give every university a class:name and append to g-gruop shows the university
      const g = svg.selectAll('.name')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'name')
        .attr('transform', d => `translate(${margin.left}, ${margin.top + yScale(d.name)})`);

      // render male bar; give the class:bar male; set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.male').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar male')
          .attr('y', d => yScale2('male'))
          .attr('width', d => xScale(d.male))
          .attr('height', Math.floor(yScale.bandwidth()/2))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#187587");
              bartip.style("visibility", "visible").text('Male student: ' + d.male);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#22a5bf");
              bartip.style("visibility", "hidden");
          });

      // render female bar; give the class:bar female; set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.female').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar female')
          .attr('y', d => yScale2('female'))
          .attr('width', d => xScale(d.female))
          .attr('height', Math.floor(yScale.bandwidth()/2))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#9e3b2f");
              bartip.style("visibility", "visible").text('Female student: ' + d.female);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#ed5847");
              bartip.style("visibility", "hidden");
          });
    }

    // When user choose Gender as the category, then will call this function
    const renderAge = data =>{
      // remove the previous svg on the page
      svg.selectAll('*').remove();
      // Scale the number to screan, find the max number in male and female data
      const xScale = d3.scaleLinear()
        .domain([0, 18805])
        .range([0, innerWidth]);
      // Scale height to every university which will shows in this page.
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(.2);
      // In every university, I divide to every age group
      const yScale2 = d3.scaleBand()
        .domain(['Under20', 'between2124', 'between2529', 'over30'])
        .range([0, yScale.bandwidth()]);

      const axis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      // render axis and remove unnecessary tick and line
      axis.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();
      axis.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);

      // give every university a class:name and append to g-gruop shows the university
      const g = svg.selectAll('.name')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'name')
        .attr('transform', d => `translate(${margin.left}, ${margin.top + yScale(d.name)})`);

      // render under 20 yr student bar
      // give the class:bar under20
      // set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.under20').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar under20')
          .attr('y', d => yScale2('under20'))
          .attr('width', d => xScale(d.under20))
          .attr('height', Math.floor(yScale.bandwidth()/4))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#877436");
              bartip.style("visibility", "visible").text('under 20 yr students: ' + d.under20);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#ffdb66");
              bartip.style("visibility", "hidden");
          });

      // render between 21 to 24 yr student bar
      // give the class:bar between2124
      // set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.between2124').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar between2124')
          .attr('y', d => yScale2('between2124'))
          .attr('width', d => xScale(d.between2124))
          .attr('height', Math.floor(yScale.bandwidth()/4))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#415e35");
              bartip.style("visibility", "visible").text('Between 21-24 yr students: ' + d.between2124);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#9cc266");
              bartip.style("visibility", "hidden");
          });

      // render between 25 to 29 yr student bar
      // give the class:bar between2529
      // set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.between2529').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar between2529')
          .attr('y', d => yScale2('between2529'))
          .attr('width', d => xScale(d.between2529))
          .attr('height', Math.floor(yScale.bandwidth()/4))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#0f4036");
              bartip.style("visibility", "visible").text('Between 25-29 yr students: ' + d.between2529);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#499f72");
              bartip.style("visibility", "hidden");
          });
      // render over 30 yr student bar
      // give the class:bar over30
      // set up the mouseover/mousemove/mouseout function
      g.selectAll('.bar.over30').data(d => [d])
        .enter().append('rect')
          .attr('class', 'bar over30')
          .attr('y', d => yScale2('over30'))
          .attr('width', d => xScale(d.over30))
          .attr('height', Math.floor(yScale.bandwidth()/4))
          .on("mouseover", function(d) {
              d3.select(this).style("fill", "#062126");
              bartip.style("visibility", "visible").text('30 or over 30 yr student: ' + d.over30);
          })
          .on("mousemove", function() {
            return bartip.style("top", (event.pageY - 30) + "px")
              .style("left", event.pageX + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", "#0d4f5c");
              bartip.style("visibility", "hidden");
          });
    }
    // read the html select>option and defined the region
    const selectRegion = document.getElementById('region').value;

    //read the category is age or Genger
    // if is age, will call renderAge function
    // or will call renderGender function
    const form = document.getElementById('condiction');
    for(i = 0; i < 2; i++){
      // for getting input radio value, I use the code from the following web
      // https://pjchender.blogspot.com/2015/05/javascripthtml.html
      if(form.condiction[i].checked)
        var condiction = form.condiction[i].value;
    }
    // set up the selectRegionto filter to filt the university in this region
    const selection = university.filter(university => university.region == selectRegion);
    if(condiction == "age"){
      renderAge(selection);
    }
    else{
      renderGender(selection);
    }


  });
}
