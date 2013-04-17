Package.describe({
	summary: "Meteor SMD module loading pattern"
});

Package.on_use(function (api, where) {
	api.add_files("meteor-smd.js", ["client", "server"]);
});

Package.on_test(function (api) {
	api.use("meteor-smd", ["client", "server"]);
	api.use("tinytest", ["client", "server"]);

	api.add_files("tests.js", ["client", "server"]);
});