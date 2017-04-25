var gulp = require('gulp');  
var jsonfile = require('jsonfile');

gulp.task('default', function(){
    // readFile load from current path which depends on gulpfile.js location
    jsonfile.readFile('./package.json', function(err, obj) {
        if (typeof obj !== "object") {
            console.log(err);
            return false;
        }
        else {
            console.log("\nAvailable scripts names:");
            for (var key in obj.scripts) {
              console.log(key);
            }
            console.log("\n\nnpm run ...");
            console.log("\nNOTE: some scripts require arguments, check readme file for more info\n");
        }
    });     
});

gulp.task('prod', ['compile-css-prod']);
