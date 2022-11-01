function dataPlanet(url='https://swapi.dev/api/planets/') {
    fetch(url)
        .then(response => response.json())
        .then(results => initialize(results))
        .then(x => x.forEach(noteToTable))
}

dataPlanet()
function initialize(response) {
    console.log(response)
    document.querySelector('table#main-table tbody').innerText = '';
    let previousButton=document.getElementById('previous-button')
    let nextButton=document.getElementById('next-button')
    if (response['next']) {
        nextButton.onclick = () => dataPlanet(response['next'])
        nextButton.disabled = false;
    }
    else {
        nextButton.disabled = true;
    }
    if (response['previous']) {
        previousButton.onclick = () => dataPlanet(response['previous'])
        previousButton.disabled = false;
    }
    else {
        previousButton.disabled = true;
    }
    return response.results.map(planetMapped)
}
function planetMapped(obj) {
    return {
        name: obj.name,
        diameter: mapDiameter(parseInt(obj.diameter)),
        climate: obj.climate,
        terrain: obj.terrain,
        surface_water: surfaceWaterPercentage(obj.surface_water),
        population: mapPopulation(obj.population),
        residents: mapResidents(obj.residents)
    }
}


function mapPopulation(population) {
    if (population === "unknown") {
        return population
    }
    else {
        return `${parseInt(population).toLocaleString('en-US')} people`;
    }

}

function surfaceWaterPercentage(surface_water) {
    if (surface_water === 'unknown') {
        return surface_water
    }
    else {
        return `${surface_water}%`
    }

}
function mapResidents(residents) {
    return {
        amount: residents.length,
        elements: residents
    };
}
function mapDiameter(diameter) {
    return `${diameter.toLocaleString('en-US')} km`;
}

function noteToTable(planet) {
    let tr = document.createElement('tr');
    const headers = ['name','diameter','climate','terrain','surface_water','population','residents']
    for (let header of headers) {
        let td = document.createElement('td');
        if (header === 'residents') {
            let residents=planet[header];
            if (residents.amount > 1) {
                let button =document.createElement('button');
                button.dataset.toggle = "modal";
                button.dataset.target = ".bd-example-modal-xl";
                button.innerText = `${residents.amount} resident(s).`;
                button.classList.add('btn');
                button.classList.add('btn-secondary');
                button.onclick = function() {buttonModal(residents.elements,planet.name)};
                td.appendChild(button);
            }else {
                td.innerText = 'No known residents';
            }
        }
        else {
            td.innerText = planet[header];
        }
        tr.appendChild(td);
    }
    let td = document.createElement('td');
    tr.appendChild(td);
    document.querySelector('table#main-table tbody').appendChild(tr);
}

function notetoModal(resident) {
    let tr = document.createElement('tr');
    const headers = ['name','height','mass','hair_color','skin_color','eye_color','birth_year','gender']
    for (let header of headers) {
        let td=document.createElement('td')
        td.innerText = resident[header]
        tr.appendChild(td)
    }
    document.querySelector('table#modal-table tbody').appendChild(tr)
}

async function buttonModal(residents, planetName) {
    let modalHeader = document.getElementById('exampleModalLabel');
    modalHeader.innerText = planetName;
    document.querySelector('table#modal-table tbody').innerText = ''
    let array = [];
    for (let resident of residents) {
        await fetchResident(resident,array);
    }
    array.forEach(notetoModal);
}


async function fetchResident(resident_url,array) {
    return fetch(resident_url)
            .then(response => response.json())
            .then(resident => array.push(resident));
}