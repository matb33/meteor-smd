# Meteor SMD

This library is similar in some ways to [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) except it is highly simplified to work in a synchronous environment -- i.e. one whose JS files are concatenated together.

This allows a developer using the [Meteor](http://www.meteor.com/) framework to define modules and their dependencies without relying on a [specific folder structure](http://docs.meteor.com/#structuringyourapp).

## How to use

I suggest placing this file in a `lib/` folder at the root of your Meteor project. With this SMD pattern in place throughout your Meteor application, you should avoid using the `lib` folder anywhere else, as this will have the side-effect of loading those files before the meteor-smd.js file.

`define` is similar to the AMD version:

```
define(name, function_or_value)
```
or
```
define(name, array_of_dependencies, function)
```

Meanwhile, `using` is a way to "use" one of these defined modules (similar to `require`).

```
using(array_of_dependencies, function)
```

*Note that for `using`, the dependencies don't have to be in an array. They can be listed as function arguments.*

## Example usage

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
define("Collections", function (Collections) {
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