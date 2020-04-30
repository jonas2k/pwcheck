/// <binding BeforeBuild='currentCommit' />
module.exports = function (grunt) {

    var paths = {
        node_modules: "./node_modules/",
        webroot: "./wwwroot/"
    };
    paths.lib = paths.webroot + "lib/";

    grunt.initConfig({
        clean: {
            cleanLib: [paths.lib + "*"]
        },
        uglify: {
            main: {
                files: [
                    {
                        src: paths.webroot + "js/site.js",
                        dest: paths.webroot + "js/site.min.js"
                    }
                ]
            }
        },
        cssmin: {
            main: {
                files: [
                    {
                        src: paths.webroot + "css/site.css",
                        dest: paths.webroot + "css/site.min.css"
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: paths.node_modules + "bootstrap/dist",
                        src: ["css/*", "js/*"],
                        dest: paths.lib + "bootstrap",
                        filter: "isFile",
                        flatten: false
                    },
                    {
                        expand: true,
                        src: [paths.node_modules + "jquery/dist/jquery.min*", paths.node_modules + "jquery/dist/jquery.slim*", paths.node_modules + "jquery/dist/core.js"],
                        dest: paths.lib + "jquery",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src: [paths.node_modules + "jquery-validation/dist/*"],
                        dest: paths.lib + "jquery-validation",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src: [paths.node_modules + "jquery-validation-unobtrusive/dist/*"],
                        dest: paths.lib + "jquery-validation-unobtrusive",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: paths.node_modules + "how-secure-is-my-password/build",
                        src: ["hsimp*"],
                        dest: paths.lib + "hsimp",
                        flatten: true
                    }
                ]
            }
        },
        gitinfo: {}
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-gitinfo");

    grunt.registerTask("currentCommit", ["gitinfo", "writeCurrentCommitToFile"]);
    grunt.registerTask("writeCurrentCommitToFile",
        function () {
            grunt.task.requires('gitinfo');
            if (process.env.CI_COMMIT_REF_NAME) {
                branchName = process.env.CI_COMMIT_REF_NAME;
            } else {
                branchName = grunt.config("gitinfo.local.branch.current.name");
            }
            grunt.file.write("currentcommit.json", JSON.stringify({
                //"commit": grunt.config("gitinfo.local.branch.current.shortSHA"), "branch": grunt.config("gitinfo.local.branch.current.name")
                "commit": grunt.config("gitinfo.local.branch.current.shortSHA"), "branch": branchName
            }));
        });

    grunt.registerTask("default", ["clean", "uglify", "cssmin", "copy", "currentCommit"]);
};