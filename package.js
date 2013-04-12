Package.describe({
	summary: "Meteor SMD module loading pattern"
});

Package.on_use(function (api, where) {
	api.add_files("meteor-smd.js", ["client", "server"]);
});