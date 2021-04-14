const API_KEY = "1MFqbabMc8WiKqJira7sl6M5b6P2";
const uniqueId = [];
document.getElementById("upcoming").addEventListener("click", UpcomingIplMatch)

function UpcomingIplMatch() {
    fetch(`https://cricapi.com/api/matches?apikey=${API_KEY}`)
        .then(res => res.json())
        .then(res => {
            output = ""
            for (let i = 0; i < res.matches.length; i++) {
                if (res.matches[i].matchStarted === false) {
                    let temp = res.matches[i]["unique_id"].toString();
                    if (res.matches[i].type === "" && temp.match("12540")) {
                        let team1 = res.matches[i]["team-1"]
                        let team2 = res.matches[i]["team-2"];
                        let time = new Date(res.matches[i].dateTimeGMT.toString())
                        let newTime = time.toLocaleString();
                        //console.log(res.matches[i])
                        document.querySelector("#UpcomingMatch-list").innerHTML = output +=
                            `<div class="card p-4 m-2 " style="width: 18rem">
                            <img class="card-img-top" src="https://i.pinimg.com/originals/a2/20/30/a220301dbfa84edd4ffc6ce9bb528841.png" alt="Card image cap">
                            <div class="card-body">
                              <h5 class="card-title">${team1} vs ${team2}</h5>
                              <p class="card-text">${newTime}</p>
                            </div>
                          </div>`

                    }
                }
            }

        }).catch(err => {
            alert('something went wrong')
        })

}


//fucntion for ipl match only
function matchDetail() {
    return fetch(`https://cricapi.com/api/matches?apikey=${API_KEY}`)
        .then(res => res.json())
        .then(res => {

            for (let i of res.matches) {
                let temp = i.unique_id.toString();
                if (i.matchStarted === true && temp.match("12540")) {
                    uniqueId.push(i.unique_id);
                    // console.log(i.unique_id)
                }
            }

        }).catch(err => {
            alert(err + "wait for next Ipl Match")
        })
}


function getScore(id) {
    //console.log(id)
    if (id.length == 1) {   //condionts for last match 
        fetch(`https://cricapi.com/api/cricketScore?unique_id=${id[0]}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                let temp = res.score.split(" ")
                let sco = temp.filter((e) => e.match(/[0-9]/))

                //for which team won 
                let arr = [];
                for (let i of sco) {
                    let temp = i.split("/")
                    arr.push(...temp)
                }
                let winner;
                if (Number(arr[0]) < Number(arr[2])) {
                    winner = `${res["team-2"]} Won the Match By ${Number(arr[2]) - Number(arr[0])} run`
                } else {
                    winner = `${res["team-1"]} Won the Match By ${Number(arr[0]) - Number(arr[2])} run`
                }

                //logo for team 1
                let teamLogo = logo(res["team-1"], res["team-2"])  // calling fucntion for team logo
                //console.log(teamLogo[0]);
                document.getElementById("team-1").innerHTML = res["team-1"]
                document.getElementById("team-2").innerHTML = res["team-2"]
                document.getElementById("score-1").innerHTML = `(${sco[0]})`
                document.getElementById("score-2").innerHTML = `(${sco[1]})`
                document.getElementById("winner").innerHTML = winner;
                document.getElementById("team1-logo").setAttribute("src", teamLogo[0])
                document.getElementById("team2-logo").setAttribute("src", teamLogo[1])
            })
    } //last match condition ends here


    //for today live matches 
    else if (id.length == 2) {
        fetch(`https://cricapi.com/api/cricketScore?unique_id=${id[1]}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                let temp = res.score.split(" ")
                let sco = temp.filter((e) => e.match(/[0-9]/))
                // console.log(sco); 

                if (sco.length == 2) { //if second team is playing
                    let teamLogo = logo(res["team-1"], res["team-2"])  // calling fucntion for team logo
                    document.getElementById("team-1").innerHTML = res["team-1"]
                    document.getElementById("team-2").innerHTML = res["team-2"]
                    document.getElementById("score-1").innerHTML = `<span>(${sco[0]})</span>`
                    document.getElementById("score-2").innerHTML = `(${sco[1]})`

                    document.getElementById("winner").innerHTML = `
         <div class="p-2 border border-dark d-inline rounded"><i>live</i><img class="live" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Ski_trail_rating_symbol_red_circle.png" width=15px></div>
         `;
                    document.getElementById("team1-logo").setAttribute("src", teamLogo[0])
                    document.getElementById("team2-logo").setAttribute("src", teamLogo[1])
                } else { //if team first is playing
                    let temp = res.score.split("v");
                    let teamLogo = logo(res["team-1"], res["team-2"])  // calling fucntion for team logo
                    document.getElementById("team-1").innerHTML = temp[0]
                    document.getElementById("team-2").innerHTML = temp[1]
                    document.getElementById("winner").innerHTML = `
         <div class="p-2 border border-dark d-inline rounded"><i>live</i><img class="live" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Ski_trail_rating_symbol_red_circle.png" width=15px></div>
         `;
                    //logo for team 1
                    document.getElementById("team1-logo").setAttribute("src", teamLogo[0])
                    document.getElementById("team2-logo").setAttribute("src", teamLogo[1])   //logo ended
                }//first team  laying ended
            })
    }
    else {
        document.getElementById("view").innerHTML = "Wait to start Match"
    }
}




// team log area 
function logo(team1, team2) {
    let t1 = team1.toLowerCase();
    let t2 = team2.toLowerCase();

    let team1_logo = null;
    if (t1.match("rajasthan")) {
        team1_logo = 'logo/rajsathan.png'
    } else if (t1.match("delhi")) {
        team1_logo = 'logo/delhi.png'
    } else if (t1.match("mumbai")) {
        team1_logo = 'logo/mi.png'
    } else if (t1.match("chennai")) {
        team1_logo = 'logo/csk.png'
    } else if (t1.match("punjab")) {
        team1_logo = 'logo/punjab.png'
    } else if (t1.match("kolkata")) {
        team1_logo = `logo/kkr.png`
    } else if (t1.match("hyderabad")) {
        team1_logo = "logo/hyderabad.png"
    } else if (t1.match("bangalore")) {
        team1_logo = "logo/bangalore.png"
    }


    let team2_logo = null;
    if (t2.match("rajasthan")) {
        team2_logo = 'logo/rajsathan.png'
    } else if (t2.match("delhi")) {
        team2_logo = 'logo/delhi.png'
    } else if (t2.match("mumbai")) {
        team2_logo = 'logo/mi.png'
    } else if (t2.match("chennai")) {
        team2_logo = 'logo/csk.png'
    } else if (t2.match("punjab")) {
        team2_logo = 'logo/punjab.png'
    } else if (t2.match("kolkata")) {
        team2_logo = `logo/kkr.png`
    } else if (t2.match("hyderabad")) {
        team2_logo = "logo/hyderabad.png"
    } else if (t2.match("bangalore")) {
        team2_logo = "logo/bangalore.png"
    }

    return [team1_logo, team2_logo]

}


async function display() {
    await matchDetail();  //wait for fetch data 
    //console.log(uniqu
    setInterval(() => {
        getScore(uniqueId);
    }, 1000);

}



display();


// end ipl script 





