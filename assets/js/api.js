let baseUrl = 'https://api.football-data.org/v2/';
const authToken = '0dd585b1af05408ab6ae1d12cdb63462';

// Fetch competition
const fetchApi = (baseUrl, competitionId) => {
    return fetch(`${baseUrl}competitions/${competitionId}/teams`, {
        headers: {
            'X-Auth-Token': authToken
        }
    });
}

// If respons OK
function status(response) {
    if(response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }   
}

// Parsing JSON to Array
function json(response) {
    return response.json();
}

// Catch error
function error(error) {
    console.log(`Error : ${error}`);
}

// Cache All Team
function cacheCompetition(id) {
    fetchApi(baseUrl, id)
    .then(status);
}


// Request Data
function getTeams(competitionId) {

    if('caches' in window) {
        caches.match(`${baseUrl}competitions/${competitionId}/teams`)
        .then((response) => {
            if(response) {
                response.json().then((data) => {
                    let teamsHTML = "";
                    changeLeague(data);

                    data.teams.forEach((team) => {
                        if (team.crestUrl !== null && team.crestUrl !== "") {
                            teamsHTML += inputCards(team);
                        } else {
                            console.log(`${team.name} dont have logo`);
                        }
                    });

                    document.getElementById("teams").innerHTML = teamsHTML;
                })
            }
        });
    }

    fetchApi(baseUrl, competitionId)
     .then(status)
     .then(json)
     .then((data) => {

        // console.log(data.teams);
        // Menyusun Card Artikel
        let teamsHTML = "";
        // changeLeague(data);

        data.teams.forEach(team => {
            if(team.crestUrl !== null && team.crestUrl !== "") {
                teamsHTML += inputCards(team);
            } else {
                console.assert(`${team.name} dont have a logo`);
            }
            // console.log(team);
        });
        
        document.getElementById("teams").innerHTML = teamsHTML;
     })
}

function getTeamById() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        console.log(idParam);
        // console.log(idParam);
        if ('caches' in window) {
            caches.match(`${baseUrl}teams/${idParam}`)
            .then((response) => {
                if(response) {
                    response.json()
                    .then((data) => {
                        
                        changeTeamData(data);

                        showClubMember(data);
                        resolve(data);
                    })
                }
            })
            .catch(error);
        }
        // console.log('Test');
        // https://api.football-data.org/v2/teams/851
        let endPoint = `${baseUrl}teams/${idParam}`;
        // console.log(endPoint);
        fetch(endPoint, {
            headers: {
                "X-Auth-Token": authToken
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            changeTeamData(data);

            showClubMember(data);
            resolve(data);
        })
        .catch(err => {
            return reject(err);
        })
    })
}

function getSavedTeams(){
  getAll().then((teams) => {
        let teamsHTML = "";

        const titleLeague = document.querySelector('h2.league-name');
        const imgLeague = document.querySelector("img.league-img");
        const endDateLeague = document.querySelector('.end-date>p');

        const title = "Favorite Team";
        //   const imgSrc = ""
        
        titleLeague.innerText = title;
        imgLeague.setAttribute('src', imgSrc);
        endDateLeague.style.display = 'none';

        if(teams.length === 0) {
            document.getElementById("teams").innerHTML = '<h5 class="center"> You dont have a favorite soccer team </h5>';
        } else {
            teams.forEach((team) => {
                let src = team.crestUrl;
                let nation = team.area.name;

                teamsHTML += `
                    <div class="col s12 m4 l3 card-wrapper">
                        <div class="card">
                            <a href="./team.html?id=${team.id}&saved=true">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src"${src.replace(/^http:\/\//i, 'https://')}" class="responsive-img" alt="${team.shortName}" title="${team.shortName}"/>
                                </div>
                            </a>
                            <div class="card-content center-align">
                                <span class="card-title">${team.shortName}</span>
                            </div>
                            <div class="card-action">
                                <span class="col s6 left-align founded"> ${team.founded} </span>
                                <span class="col s6 right-align nation"> ${team.area.name}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("teams").innerHTML = teamsHTML;
        }
  })
}


function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = Number(urlParams.get("id"));

    getById(idParam)
    .then((team) => {
        console.log(team);
        changeTeamData(team);
        showClubMember(team);
    });
    return idParam;
}

function changeLeague(data) {
    const endDate = new Date(date.season.endDate).toDateString();
    const leagueName = data.competition.name;
    const leagueId = data.competition.id;
    const imgSrc = `/assets/images/${leagueId}.jpg`;

    const leagueTitle = document.querySelector('h2.league-name');
    const leagueImage = document.querySelector('img.league-img');
    const endDateLeague = docuent.querySelector('.end-date span');
    leagueTitle.innerText = leagueName;
    leagueImg.setAttribute("src", imgSrc);
    leagueImg.setAttribute("alt", leagueName);
    leagueImg.setAttribute("title", leagueName);
    endDateLeague.innerText = endDate;
}

function changeTeamData(data) {
    const teamLastUpdated = new Date(data.lastUpdated).toDateString();
    const teamNation = data.area.name;
    const teamName = data.name;
    const teamCrestSrc = data.crestUrl;
    const teamFounded = data.founded;
    const teamWebsite = data.website;
    const teamColor = data.clubColors;
    let teamVenue = data.venue;
    const teamFoundedDate = `${teamName} founded at ${teamFounded}`;
    
    const teamLastUpdateElement = document.querySelector('.last-updated span');
    const teamNationElement = document.querySelector('.last-updated span.new.badge');
    const teamNameElement = document.querySelector('h4.team-name');
    const teamLogoElement = document.querySelector('img.club-logo');
    const teamWebsiteElement = document.querySelector('#team-website');
    const teamColorElement = document.querySelector('#team-color');
    const teamVenueElement = document.querySelector('#team-venue');

    if (teamVenue === null) teamVenue = "-";

    // teamLastUpdateElement.innerText = teamLastUpdated;
    // teamNationElement.setAttribute('data-badge-caption', teamNation);
    // teamNameElement.innerHTML = teamFoundedDate;
    // teamLogoElement.setAttribute('src', teamCrestSrc);
    // teamLogoElement.setAttribute('alt', teamName);
    // teamLogoElement.setAttribute('title', teamName);
    // teamWebsiteElement.innerHTML = `<a href="${teamWebsite}" target="_blank">${teamWebsite}</a>`;
    // teamColorElement.innerText = teamColor;
    // teamVenueElement.innerText = teamVenue;
}

function showClubMember(data) {
    let squadHTML = `
        <div class="row">
            <div class="col s1"><b>#</b></div>
            <div class="col s3"><b>Name</b></div>
            <div class="col s3"><b>Position</b></div>
            <div class="col s3"><b>Nationality</b></div>
            <div class="col s2"><b>Role</b></div>
        </div>
    `;
    data.squad.forEach(player => {
        let number = "";
        let position = "";

        (player.number === null) ? (number = "-") : (number = player.number);
        (player.position === null) ? (position = "-") : (position = player.position);

        squadHTML += `
            <div class="row">
                <div class="col s1">${number}</div>
                <div class="col s3">${player.name}</div>
                <div class="col s3">${player.position}</div>
                <div class="col s3">${player.nationality}</div>
                <div class="col s2">${player.role}</div>
            </div>
        `;
    });

    document.getElementById("squadPlayer").innerHTML = squadHTML;
}

function inputCards(team) {
    let card;
    let src = team.crestUrl;
    let nation = team.area.name;

    card = `
        <div class="col s12 m6 l3 card-wrapper">
            <div class="club-wrapper">
                <div class="club-info">
                    <a href="./team.html?id=${team.id}">
                        <div class="club-image waves-effect waves-block waves-light">
                            <img src="${src.replace(/^http:\/\//i, 'https://')}" class="responsive-img" alt="${team.shortName}" title="${team.shortName}">
                        </div>
                    </a>
                    <div class="card-content center-align">
                        <h6>${team.shortName}</h6>
                    </div>
                    <div class="card-action">
                    </div>
                </div>
            </div>
        </div>
    `;

    return card;
}