# Meteor SMD

This library is similar in some ways to [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) except it is highly simplified to work in a synchronous environment -- i.e. one whose JS files are concatenated together.

This allows a developer using the [Meteor](http://www.meteor.com/) framework to define modules and their dependencies without relying on a [specific folder structure](http://docs.meteor.com/#structuringyourapp).

## How to use

Place both `meteor-smd.js`, `package.js` and `tests.js` in your local smart packages: `packages/meteor-smd/`.

`define` is similar to the AMD version:

```
define(name, function_or_value)
```
or
```
define(name, array_of_dependencies, function)
```

Meanwhile, `using` is a way to "use" one of these defined modules (similar to `require` except that it uses a callback).

```
using(array_of_dependencies, function)
```

*Note that for `using`, the dependencies don't have to be in an array. They can be listed as function arguments.*

## Examples

### people.js
```
using("Collections", function (Collections) {
	Template.people.coolPeople = function () {
		return Collections.People.find({cool: true});
	};
});
```

### collections.js
```
define("Collections", function () {
	return {
		People: new Meteor.Collection("people")
	};
});
```

### prefs.js
```
define("Prefs", ["Env"], function (Env) {
	var Prefs = {};

	Prefs.twitterPublicKey = Env.isDevelopment ? "1234567" : "8901234";
	Prefs.twitterHandle = "matb33";

	return Prefs;
});
```

### env.js
```
define("Env", function () {
	var Env = {};

	Env.isDevelopment = (function () {
		if (Meteor.isClient) {
			return window.location.hostname.indexOf("localhost") !== -1;
		} else {
			if (process.env.ROOT_URL) {
				return process.env.ROOT_URL.indexOf("localhost") !== -1;
			} else {
				return process.env.NODE_ENV !== "production";
			}
		}
	})();

	Env.isProduction = !Env.isDevelopment;

	return Env;
});
```

On a personal note, I use this technique only in very specific use cases where load order is important and a local smart package isn't the right approach. For example, defining Template helpers to be re-used in various other templates:

```
define("GeneralHelpers", function () {
	return {
		createdAtFormatted: function () {
			return this.createdAt && new Date(this.createdAt).toUTCString();
		}
	};
});
```

```
Template.itemEditForm.something = function () {
	...
};

using("GeneralHelpers", function (GeneralHelpers) {
	Template.itemEditForm.createdAt = GeneralHelpers.createdAtFormatted;
});
```

## Running the tests

Once the Meteor SMD files are in your local `packages/meteor-smd/`, run the following from the root of your project (make sure Meteor isn't already running):

```
meteor test-packages meteor-smd
```

Then, open your browser to `http://localhost:3000` to see the test results.