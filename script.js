var createCandidate=function(name, partyColor) {
    var candidate={};
    candidate.name=name;
    candidate.partyColor=partyColor;
    candidate.electionResults=null;
    candidate.totalVotes=0;  

    //method to tally up votes
   
    candidate.voteTally = function(){
        this.totalVotes = 0;
        for (var i = 0; i < this.electionResults.length; i++) {
            this.totalVotes = this.totalVotes + this.electionResults[i];
        }
    }; 

    return candidate;
};

    var candidate1 = createCandidate ("John Doe", [132, 17, 11]);
    var candidate2 = createCandidate ("Jane Smith", [245, 141, 136]);

      
  
// create election results arrays

candidate1.electionResults = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];
candidate2.electionResults = [4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];


//recount fixes
//Florida
candidate1.electionResults[9]=(1);
candidate2.electionResults[9]=(28);

//California
candidate1.electionResults[4]=(17);
candidate2.electionResults[4]=(38);

//Texas
candidate1.electionResults[43]=(11);
candidate2.electionResults[43]=(27);

//assign winner of each state
setStateResults = function(state){
    theStates[state].winner = null;
    if (candidate1.electionResults[state] > candidate2.electionResults[state]){
        theStates[state].winner = candidate1;
    }
    else if (candidate2.electionResults[state] > candidate1.electionResults[state]){
        theStates[state].winner = candidate2;
    }

    //change color with mouseover
    var stateWinner=theStates[state].winner;
        if(stateWinner !== null){
            theStates[state].rgbColor = stateWinner.partyColor;
        }
        else {
            theStates[state].rgbColor = [11, 32, 57];
        }
//reminder that {} needed at each piece of the if else -- each of them is its own function
//fill in state results table
        var stateInfoTable = document.getElementById('stateResults');
        var header = stateInfoTable.children[0];
        var body = stateInfoTable.children[1];
        var stateName = header.children[0].children[0];
        var abbrev = header.children[0].children[1];
        var candidiate1Name = body.children[0].children[0];
        var candidate2Name = body.children[1].children[0];
        var candidate1Results = body.children[0].children[1];
        var candidate2Results = body.children[1].children[1];
        var winnersName = body.children[2].children[1];

        stateName.innerText = theStates[state].nameFull;
        abbrev.innerText = "("+theStates[state].nameAbbrev+")";
        candidiate1Name.innerText = candidate1.name;
        candidate2Name.innerText = candidate2.name;
        candidate1Results.innerText = candidate1.electionResults[state];
        candidate2Results.innerText = candidate2.electionResults[state];
        if (theStates[state].winner === null){
                winnersName.innerText = 'DRAW';
            } 
            else {
                winnersName.innerText = theStates[state].winner.name;
            }
     }


//display vote tallies and results
candidate1.voteTally();
candidate2.voteTally();
console.log(candidate1.totalVotes);
console.log(candidate2.totalVotes);

//dislay name and party color to make sure it works
console.log(candidate1.name, candidate1.partyColor);
console.log(candidate2.name, candidate2.partyColor);


var winner = "Too early to tell"
    if (candidate1.totalVotes > candidate2.totalVotes) {
        winner = candidate1.name;
    }
    else if (candidate1.totalVotes < candidate2.totalVotes) {
        winner = candidate2.name;
    }
    else if (candidate1.totalVotes = candidate2.totalVotes){
        winner = "Draw";
    }

console.log(winner + " has won this race.");

//populate table at top of the map
var countryResultsTable =document.getElementById('countryResults');
var row = countryResultsTable.children[0].children[0];

row.children[0].innerText = candidate1.name;
row.children[1].innerText = candidate1.totalVotes;
row.children[2].innerText = candidate2.name;
row.children[3].innerText = candidate2.totalVotes;
row.children[5].innerText = winner;

