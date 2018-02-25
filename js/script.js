// 1 because of dynamic typing, you can combine strings to be printed together
var string = "Hello";
string += " World"; // uncomment to test
string = string + " World";
console.log(string + "!");

//2 equality
// x is equal to y because they are both the same type, so it IS strict
var x = 4, y = 4;
if (x == y) {
  console.log("x=4 is equal to y=4");
}
if (x === y) {
  console.log("Strict: x=4 is equal to y=4");
} else {
  console.log("Strict: x=4 is NOT equal to y=4");
}

// a new variable x is created, but it's type is a string so x is NOT strict
x = "4";
if (x == y) {
  console.log("x='4' is equal to y=4");
}
if (x === y) {
  console.log("Strict: x='4' is equal to y=4");
} else {
  console.log("Strict: x='4' is NOT equal to y=4");
}

// 3) truthy vs falsy
// all false
if ( false || null || undefined || "" || 0 || NaN) {
  console.log("Will this ever execute?");
} else {
  console.log ("All false");
}
// all true
if (true && "hello" && 1 && -1 && "false") {
  console.log("All true");
} else {
  console.log("Something was false");
}

// 4) for loops
var sum = 0;
for (var i = 0; i < 10; i++) {
  console.log(i);
  sum = sum + i;
}
console.log("sum of 0 through 9 is: " + sum);
