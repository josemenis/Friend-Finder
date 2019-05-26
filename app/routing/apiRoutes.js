// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
//    app in the file is only an argument, it is defined in app.js
module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    // This is what happens when the server recieves a get request, is on stanby listening
    app.get("/api/testfriends", function (req, res) {
        // this route will view all the friends
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------
    // This is what happens when the server recieves a post request
    app.post("/api/testfriends", function (req, res) {
        // req.body is available since we're using the body parsing middleware
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);
        // req.body will become new friend data
        let userData = req.body;
        // scores from user data assigned to userScores
        let userScores = userData.scores;
        // will be used to calculate the difference between each user
        let totalDifference = 0;
        // loop over friends data
        // for each iteration grab a current friend
        // save current friend in aa variable
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;
            // then loop over current friend scores
            for (var s = 0; s < friends[i].scores[s]; s++) {
                totalDifference = Math.abs(parseInt(userScores[s]) - parseInt(friends[i].scores[s]));
                
                // compare current index to index, js method for absolute diff.
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
};
