Tinytest.add("Meteor SMD", function (test) {
	var self = typeof window !== "undefined" ? window : global;
	self.__smd_tests_reset();

	var test1 = null;

	test.equal(typeof self.define, "function");
	test.equal(typeof self.using, "function");

	test.equal(self.__smd_tests_module_exists("TestLocation"), false);
	test.equal(self.__smd_tests_module_exists("TestYardSize"), false);
	test.equal(self.__smd_tests_module_exists("TestLaneway"), false);
	test.equal(self.__smd_tests_module_exists("TestPerson"), false);
	test.equal(self.__smd_tests_module_exists("TestHouse"), false);

	define("TestLocation", ["TestHouse", "TestYardSize"], function (TestHouse, TestYardSize) {
		test.equal(TestHouse.person.age, 33);
		test.equal(TestHouse.person.name, "Mathieu");
		test.equal(TestHouse.bedrooms, 4);
		test.equal(TestHouse.garages, 2);
		test.equal(TestYardSize, "small");

		return {
			address: "21 Fake Street",
			house: TestHouse,
			yard: TestYardSize
		};
	});

	using("TestLocation", "TestLaneway", function (TestLocation, TestLaneway) {
		test.equal(TestLocation.address, "21 Fake Street");
		test.equal(TestLocation.house.person.age, 33);
		test.equal(TestLocation.house.person.name, "Mathieu");
		test.equal(TestLocation.house.bedrooms, 4);
		test.equal(TestLocation.house.garages, 2);
		test.equal(TestLocation.yard, "small");
		test.equal(TestLaneway.width, "double");
		test.equal(TestLaneway.length, "medium");

		test1 = "test";

		return "ok";
	});

	test.equal(test1, null);

	define("TestPerson", function () {
		return {
			age: 33,
			name: "Mathieu"
		};
	});

	define("TestHouse", ["TestPerson"], function (TestPerson) {
		test.equal(TestPerson.age, 33);
		test.equal(TestPerson.name, "Mathieu");

		return {
			person: TestPerson,
			bedrooms: 4,
			garages: 2
		};
	});

	define("TestYardSize", "small");
	define("TestLaneway", {width: "double", length: "medium"});

	using(["TestPerson", "TestYardSize", "TestLaneway"], function (TestPerson, TestYardSize, TestLaneway) {
		test.equal(TestPerson.age, 33);
		test.equal(TestPerson.name, "Mathieu");
		test.equal(TestYardSize, "small");
		test.equal(TestLaneway.width, "double");
		test.equal(TestLaneway.length, "medium");
	});

	test.equal(self.__smd_tests_module_exists("TestLocation"), true);
	test.equal(self.__smd_tests_module_exists("TestYardSize"), true);
	test.equal(self.__smd_tests_module_exists("TestLaneway"), true);
	test.equal(self.__smd_tests_module_exists("TestPerson"), true);
	test.equal(self.__smd_tests_module_exists("TestHouse"), true);
});