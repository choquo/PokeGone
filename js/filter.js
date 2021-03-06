/*
 * pokemon Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of pokemon from the web page.
 */

// Variables
var regex = /Pokemon/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon'), :contains('Pokémon), :contains('pokémon')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon), :contains('Pokémon), :contains('pokémon')").filter(":only-child").closest('div');
}

function filterVindictive() {
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon'), :contains('Pokémon), :contains('pokémon')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", pokemons: elements.length}, function(response) {
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
