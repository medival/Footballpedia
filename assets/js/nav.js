document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange =  function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav")
                .forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a")
                .forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page === "") page = "uefa";
    loadPage(page);

    function loadPage(page){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                let content = document.querySelector("#body-content");

                switch (page) {
                    case "premier":
                     getTeams(2021);
                     break;

                    case "uefa":
                     getTeams(2001);
                     break;
                    
                    case "favorite":
                    //  getFavoriteTeams();
                     break;

                    default:
                     getTeams(2001);
                     break;
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p> Page you are looking for is missing </p>";
                } else {
                    content.innerHTML = "<p> Ops! Check your WiFi</p>";
                    M.toast({
                        html: `Damn! API is limited`
                    })
                }
            }
        };
        xhttp.open("GET", "pages/home.html", true);
        xhttp.send();
    }

    cacheCompetition(2001);
    cacheCompetition(2021);
})
