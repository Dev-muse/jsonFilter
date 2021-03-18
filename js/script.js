
//select dom elements
const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");


// Search json file and filter it:

const searchStates = async searchText => {
    const response = await fetch("../data/states.json");
    const states = await response.json();

    //filter matches using regex
    let matches = states.filter(state=>{
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);

    });
   
    if(searchText.length == 0){
        matches = [];
    }

    // pass results to output function 
    output(matches);

};

let output = searchResult => {
    if(searchResult.length > 0){

        // loop through searchResult and create html array then join() to be a text
        const html = searchResult.map(match => `
        <div class="card card-body mb-4">
        <h4>${match.name}(${match.abbr}) <span class="text-info">${match.capital}</span></h4>
        <small> lat: ${match.lat} / long: ${match.long}</small>
        </div>
        `).join(""); 

        // insert html string into DOM 
        matchList.innerHTML = html;
    }
}

search.addEventListener("input",() => searchStates(search.value));