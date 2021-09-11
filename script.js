window.onload = function() {
	getCountry('Vietnam');
}
document.getElementById('input').addEventListener("keypress", function(event){
	if(event.key === 'Enter'){
		getCountry(document.getElementById('input').value);
	}
});

function search(){
	getCountry(document.getElementById('input').value);
}

function getCountry(name){
	// Formatting country name
	name.toLowerCase();
	var n = name[0]; n = n.toUpperCase();
	var countryName = n + name.substring(1, name.length);
	for(let j=0; j<countryName.length-1; j++){
		if(countryName[j] == ' ') {
			p = countryName.substring(0, j+1);
			r = countryName.substring(j+2, countryName.length);
			q = countryName[j+1]; q = q.toUpperCase();
			countryName = p + q + r;
		}
	}
	countryName.replace(" ", "%20");
	var tmp = countryName; tmp = tmp.toLowerCase();
	if(tmp == 'us') countryName = 'US';
	// End formatting
	fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + countryName)
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		getData(data, countryName);
	});
}

function getData(d, ctrn){
	var key = Object.keys(d);
	var content = '';
	if(ctrn == 'Global'){
		content += '<div class="card"><div class="info">'+ctrn.toUpperCase()+'</div>';
		content += '<div class="stats" id="stats"><div class="category blue flex-col"><span>Population</span><span>'+d.All.population+'</span></div>';
		content += '<div class="category red flex-col"><span>Cases</span><span>'+d.All.confirmed+'</span></div>';
		content += '<div class="category black flex-col"><span>Deaths</span><span>'+d.All.deaths+'</span></div>';
		content += '</div></div>';
	}
	else if(key[0] == 'All') {
		content += '<div class="card"><img src="https://www.worldatlas.com/r/w425/img/flag/' + d.All.abbreviation.toLowerCase() + '-flag.jpg" height=139px>';
		content += '<div class="info">'+d.All.country.toUpperCase()+' - '+d.All.location+'</div>';
		content += '<div class="stats" id="stats"><div class="category blue flex-col"><span>Population</span><span>'+d.All.population+'</span></div>';
		content += '<div class="category red flex-col"><span>Cases</span><span>'+d.All.confirmed+'</span></div>';
		content += '<div class="category black flex-col"><span>Deaths</span><span>'+d.All.deaths+'</span></div>';
		content += '<div class="category blue flex-col"><span>Area (km<sup>2</sup>)</span><span>'+d.All.sq_km_area+'</span></div>';
		content += '<div class="category green flex-col"><span>Life expectancy</span><span>'+d.All.life_expectancy+'</span></div>';
		content += '<div class="category blue flex-col"><span>ISO</span><span>'+d.All.iso+'</span></div>';
		content += '</div></div>';
	}
	else {
		// for(let i=0; i<5; i++){
		// 	content += '<div class="card"><img src="https://www.worldatlas.com/r/w425/img/flag/' + d[key[i]].All.abbreviation.toLowerCase() + '-flag.jpg" height=139px>';
		// 	content += '<div class="info">'+d[key[i]].All.country.toUpperCase()+' - '+d[key[i]].All.location+'</div>';
		// 	content += '<div class="stats"><div class="category popu flex-col"><span>Population</span><span>'+d[key[i]].All.population+'</span></div>';
		// 	content += '<div class="category conf flex-col"><span>Cases</span><span>'+d[key[i]].All.confirmed+'</span></div>';
		// 	content += '<div class="category dea flex-col"><span>Deaths</span><span>'+d[key[i]].All.deaths+'</span></div>';
		// 	content += '<div class="category lex flex-col"><span>Life expectancy</span><span>'+d[key[i]].All.life_expectancy+'</span></div>';
		// 	content += '<div class="category area flex-col"><span>Area (km<sup>2</sup>)</span><span>'+d[key[i]].All.sq_km_area+'</span></div>';
		// 	content += '<div class="category iso flex-col"><span>ISO</span><span>'+d[key[i]].All.iso+'</span></div>';
		// 	content += '</div></div>';
		// }
		content += '<div class="card"><div class="info">No country name found or not the same as given in the API. Please try again or take a few minutes to glance over the API docs below.</div></div>';
	}
	document.getElementById('content').innerHTML = content;
}





// UI-UX functions
let processScroll = () => {
	let docElem = document.documentElement, 
		docBody = document.body,
		scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
		scrollPercent = scrollTop / 62 * 100;
		opacityVal = scrollPercent / 100;
		if(opacityVal < 1) opacityVal = 0;
		else if(opacityVal >= 1) opacityVal = 1;
	
	document.getElementById('logo').style.setProperty("--scrollAmount", opacityVal);	
}

document.addEventListener('scroll', processScroll);

var mn = 0;
function showMenu(){
	if(mn == 0){
		document.getElementById('menu').style.display = 'block';
		mn = 1;
	}
	else if(mn == 1){
		document.getElementById('menu').style.display = 'none';
		mn = 0;
	}
}

var theme = 0;
function changeTheme(){
	if(theme == 0){
		document.getElementById('searchbar').style.background = '#383838';
		document.getElementById('logo').style.color = '#fff';
		document.getElementById('content').style.background = '#282828';
		document.getElementById('stats').style.background = '#efefef';
		document.getElementById('theme').innerHTML = '<i class="fas fa-sun"></i>';
		theme = 1;
	}
	else if(theme == 1){
		document.getElementById('searchbar').style.background = '#fff';
		document.getElementById('logo').style.color = '#000';
		document.getElementById('content').style.background = '#fdfdfd';
		document.getElementById('stats').style.background = '#f9f9f9';
		document.getElementById('theme').innerHTML = '<i class="fas fa-moon"></i>';
		theme = 0;
	}
}
