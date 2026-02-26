module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({
    watch: {
      options: { livereload: true },
      express: {
        files: ["app.js", "src/**/*", "public/*"],
        tasks: ["express:dev"],
        options: { livereload: 1338, spawn: false },
      },
    },
    express: {
      options: {
        port: 3000,
      },
      dev: {
        options: {
          script: "app.js",
        },
      },
    },
  });

  grunt.registerTask("server", ["express:dev", "watch"]);
};
