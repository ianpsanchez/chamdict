// import master from './master';
// var connection = require("../config/connection.js");

$(document).ready(function () {
    $("form").submit(function () {
        event.preventDefault();
        console.log(" --> Whats up! <-- ");

        let allLower = $('#searchWord_id').val();
        let sWord = allLower.toLowerCase();
        console.log(sWord);

        if (!sWord) {
            document.getElementById("searchReturnP").innerHTML = 'Enter a word.';
        } else {
            $.ajax({
                url: "https://chamorrodictionary.herokuapp.com/all",
                method: "GET",
                data: { grino: sWord }
            }).then(function (response) {
                console.log(response);
                // console.log(response.Runtime);
                if (response[0]) {

                    let chamWords = '';

                    for (let i = 0; i < response.length; i++) {

                        if (i = response.length - 1) {
                            chamWords += response[i].pele;
                        }
                        else {
                            chamWords += response[i].pele + ', ';
                        }

                    }

                    document.getElementById("searchReturnP").innerHTML = "English: " + sWord + "</br>Chamorro: " + chamWords;
                } else {
                    document.getElementById("searchReturnP").innerHTML = "No match found...";
                }

            });
        }



        // search(sWord, master);
        // console.log("Chamorro word for " + sWord + " is " + theDef);


    });
});

function search(nameKey, myArray) {

    document.getElementById("searchReturnP").innerHTML = '';

    if (!nameKey) {
        var blank = 'Please enter a search word';
        return document.getElementById("searchReturnP").innerHTML = blank;
    }

    var found = 0;

    for (var i = 0; i < myArray.length; i++) {
        // if (myArray[i].grino === nameKey) {
        if (myArray[i].grino.match(nameKey)) {
            found = 1;
            // return myArray[i].pelle;
            var node = document.createElement('div');
            var textnode = "";
            textnode = document.createTextNode(myArray[i].pelle + ': ' + myArray[i].grino);
            node.appendChild(textnode);
            // node2.appendChild(textnode);
            document.getElementById("searchReturnP").appendChild(node);
            // document.getElementById("searchReturnP").appendChild(node2);
        }

    }

    if (!found) {
        document.getElementById("searchReturnP").innerHTML = 'No match found...';
    }
}

// else {
//     document.getElementById("searchReturnP").innerHTML = "Sorry, no match...";
// }