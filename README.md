# COMP6214 Open data innovation coursework 1
--uni3.owl is the schema I create by Protégé
--cw1v3.rdf is my RDF file of cleaned csv

To open visualisation web site
1. Install Node.js from https://nodejs.org/en/
2. Open Terminal and navigate to folder "web"
	MacOS: right-click the folder in finder and use the Service menu to open a Terminal window at that folder.
	Windows: Navigate to the directory in a terminal / command line.
3. Run the following command to set up server locally.
	3-1: npm install -g http-server bower
	(Note: on OS X and Linux, you will need to add ‘sudo’ to the beginning of that command)
	3-2: bower install jQuery d3 underscore
	3-3: http-server
4. Open your browser and navigate to localhost:8080
	