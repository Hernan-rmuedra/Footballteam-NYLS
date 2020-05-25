var app = new Vue({
    el: '#app',
    data: {
        message: "hola mundo",
        select: "all",
        check: ["R", "D", "ID"],
        main: [],
        republicanNumber: 0,
        democratNumber: 0,
        indNumber: 0,
        totalNumber: 0,
        republicanVotesPts: 0,
        democratVotesPts: 0,
        independentVotesPts: 0,
        totalVotesPoints: 0,
        numerberOfMissedVotes: 0,
        numerberOfMissedVotesPts: 0,
        getLeastVotes: [],
        getMosttVotes: [],
        getLoyalVotesLeast: [],
        getloyalVotesMost: []

    },
    computed: {
        filterUsers() {
            return this.main.filter(value => {
                if (this.check.includes(value.party) && (value.state == this.select || this.select == "all")) {
                    return value
                }
            })
        },
        filterStates() {
            var repeatedStates = [];
            for (i = 0; i < this.main.length; i++) {
                if (!repeatedStates.includes(app.main[i].state)) {
                    repeatedStates.push(app.main[i].state);
                };
            };
            return repeatedStates;
        }
    },
    methods: {
        numberOfPartyRepresent() {

            var getNumberR = 0;
            var getNumberD = 0;
            var getNumberID = 0;

            for (i = 0; i < this.main.length; i++) {
                if (this.main[i].party == 'R') {
                    this.republicanNumber++;
                    getNumberR += this.main[i].votes_with_party_pct;
                }
                if (this.main[i].party == 'D') {
                    this.democratNumber++;
                    getNumberD += this.main[i].votes_with_party_pct;
                }
                if (this.main[i].party == 'ID') {
                    this.indNumber++;
                    getNumberID += this.main[i].votes_with_party_pct;
                }

            }
            this.totalNumber = this.main.length
            this.republicanVotesPts = parseInt(getNumberR / this.republicanNumber);
            this.democratVotesPts = parseInt(getNumberD / this.democratNumber);
            if (getNumberID > 1) {
                this.independentVotesPts = parseInt(getNumberID / this.indNumber);
            }
            if (getNumberID > 1) {
                this.totalVotesPoints = (this.republicanVotesPts + this.democratVotesPts + this.independentVotesPts) / 3;
            } else {
                this.totalVotesPoints = (this.republicanVotesPts + this.democratVotesPts + this.independentVotesPts) / 2;
            }
        },
        leastEngagedVotes() {

            var leastEngaged = this.main.sort(function(a, b) {
                if (a.missed_votes_pct > b.missed_votes_pct) {
                    return 1;
                } else if (a.missed_votes_pct < b.missed_votes_pct) {
                    return -1;
                } else {
                    return 0;
                }
            });

            var pts = this.main.length * 0.1;
            this.getLeastVotes = leastEngaged.slice(length - pts);

        },
        mostEngagedVotes() {
            var mostEngaged = this.main.sort(function(a, b) {
                if (a.missed_votes_pct > b.missed_votes_pct) {
                    return 1;
                } else if (a.missed_votes_pct < b.missed_votes_pct) {
                    return -1;
                } else {
                    return 0;
                }
            });
            var pts = this.main.length * 0.1;
            this.getMosttVotes = mostEngaged.slice(0, pts);
        },
        leastLoyalVotes() {
            var leastLoyal = this.main.sort(function(a, b) {
                if (a.votes_with_party_pct > b.votes_with_party_pct) {
                    return 1;
                } else if (a.votes_with_party_pct < b.votes_with_party_pct) {
                    return -1;
                } else {
                    return 0;
                }
            });

            var pts = this.main.length * 0.1;
            this.getLoyalVotesLeast = leastLoyal.slice(length - pts);
        },
        mostLoyalVotes() {
            var mostLoyal = this.main.sort(function(a, b) {
                if (a.votes_with_party_pct > b.votes_with_party_pct) {
                    return 1;
                } else if (a.votes_with_party_pct < b.votes_with_party_pct) {
                    return -1;
                } else {
                    return 0;
                }
            });

            var pts = this.main.length * 0.1;
            this.getloyalVotesMost = mostLoyal.slice(0, pts);
        }

    }
});


var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
if (document.title.includes('house')) {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json"
}

myHeaders = new Headers({
    "X-API-Key": "it9BvaUjj7DZt62BnS8bbLRjtoWyeGPRk1PLwn6q",
})
var misClaves = {
    headers: myHeaders,
};
fetch(url, misClaves)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(json) {
        app.main = json.results[0].members
        app.numberOfPartyRepresent();
        app.leastEngagedVotes();
        app.mostEngagedVotes();
        app.leastLoyalVotes();
        app.mostLoyalVotes();

    })





// const urlhouse = 'https://api.propublica.org/congress/v1/113/house/members.json';
// myHeaders = new Headers({
//     "X-API-Key": "it9BvaUjj7DZt62BnS8bbLRjtoWyeGPRk1PLwn6q",
// }) var misClaves = {
//     headers: myHeaders,
// };
// fetch(urlhouse, misClaves)
//     .then(function(resp) {
//         return resp.json()
//     })
//     .then(function(json) {
//         app.main = json.results[0].members
//     })















// function newMember() {
//     document.getElementById("table-body").innerHTML = "";
//     var dataMembers = data.results[0].members;
//     var senateBoxes = Array.from(document.querySelectorAll("input[name=filCheck]:checked")).map(elt => elt.value);
//     var senateSelect = document.getElementById("select-state").value;
//     var filaNueva = 0;
//     for (i = 0; i < dataMembers.length; i++) {
//         if (senateBoxes.includes(dataMembers[i].party) && ((senateSelect === dataMembers[i].state) || (senateSelect === "ALL"))) {
//             var newFila = document.getElementById("table-body").insertRow(filaNueva);
//             filaNueva++;

//             var newCeld1 = newFila.insertCell(0);
//             var newCeld2 = newFila.insertCell(1);
//             var newCeld3 = newFila.insertCell(2);
//             var newCeld4 = newFila.insertCell(3);
//             var newCeld5 = newFila.insertCell(4);


//             newCeld1.innerHTML = (dataMembers[i].first_name + ' ' + (dataMembers[i].middle_name || "") + ' ' + dataMembers[i].last_name).link(dataMembers[i].url);
//             newCeld2.innerHTML = dataMembers[i].party;
//             newCeld3.innerHTML = dataMembers[i].state;
//             newCeld4.innerHTML = dataMembers[i].seniority;
//             newCeld5.innerHTML = dataMembers[i].votes_with_party_pct;
//         }
//     }
// }
// newMember();