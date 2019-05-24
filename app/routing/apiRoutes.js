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

        // req.body will become new friend data
        // var for req.body
        console.log(req.body);
        // loop over friends array
        // for each iteration grab a current friend
        // save current friend in aa variable
        // then loop over current friend scores
        // compare current index to index, js method for absolute diff.
    });
};

// ========================================================================
// Below might be used for app.post but modified
// //  Create a `get` route called `/icecream/:name`. When the route is hit,
// // it should display the `icecream.handlebars` template.
// app.get(`/icecreams/:name`, function (req, res) {
//     // concise loop, cannot break out of loop goes from beginning to end
//     // variable
//     for (let icecream of icecreams) {
//         if (icecream.name === req.params.name) {
//             return res.render('icecream', icecream)
//         }
//     }
//     // res.render('icecream')
// });