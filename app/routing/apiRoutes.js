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
        // Below code was copied from the video that demoed this assignment
        // need to understand each individual line of code to understand the logic
        // =================================================================
        let bestMatch = {
            name: "",
            photo: "",
            // this will track the difference between the answers to question values
            friendDifference: 1000
        };
        // req.body is available since we're using the body parsing middleware
        console.log(req.body);
        // The surveyData (req.body) and scores are stored in the variables
        let surveyData = req.body;
        let surveyScores = surveyData.scores;
        // will be used to calculate the difference between each user
        let totalDifference = 0;
        // nested for loop, loops over friends, then over scores
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;
            // then loop over current friend scores
            for (var s = 0; s < friends[i].scores[s]; s++) {
                totalDifference += Math.abs(parseInt(surveyScores[s]) - parseInt(friends[i].scores[s]));

                // compare current index to index, js method for absolute diff.
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        // this pushes the surveyData to the friends variable
        friends.push(surveyData);
        // not sure what this does
        res.json(bestMatch);
    });
};
   /*6. Determine the user's most compatible friend using the following as a guide:

   * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
   * =====================================================================================================================================================================
   * this is me trying to understand the logic for this 
  1. let surveyData = req.body; bc a variable is needed to store survey data
  2. let surveyScores = surveyData.scores; bc the scores need to be separately stored due to the diff. values.
     let totalDifference = 0 since it is an integer used in a equation.
  
  3. Step 6 says to use absolute value, so the method math.abs does that. It won't let an equation have a negative number.
  
  4. Attempt to understand how to logically get to the point to have to use a for loop.
        totalDifference = math.abs(parseInt(surveyScores) - parseInt(friends.'something')) 
        ==>>> to get the correct values to complete the equation, need to loop through friends and loop through scores within that 
   
        5. for (var i = 0; i < friends.length; i ++) {
                then console log(friends[i]) to see the results, not sure how to console log this
        6.now I'm after the scores, so I need to loop through the scores within the loop
            for (var s = 0; s <friends[i].scores[s]; s ++) {
                "NOW I CAN COMPLETE THE EQUATION TOTAL DIFFERENCE"
                 totalDifference = math.abs(parseInt(surveyScores[s]) - parseInt(friends[i].scores[s]));
        
                 7. Now that the equation is done, I can use it to find this below.
                 * The closest match will be the user with the least amount of difference.
                 --If totalDifference (which subtracts survey scores from friendsArray scores) is < or = to 'something'

                 8. What is the something that totalDifference needs to be < || === to? That scores of data in the friendsArray!
                 9. create a variable to hold friendsArray key: values
            }
        }
        
        
  
7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
   * The modal should display both the name and picture of the closest match.
   */