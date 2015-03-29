# dfun
Optional parameters, default values and type-checking for your JavaScript method signatures

##Example
Lets creata a function that can accept 3 parameters one of which is optional.
```js
var foo = dfun(Number, [String, 'bar'], Number, function (a, b, c) {
  console.log(a + b + c);
});

foo(1, 'baz', 2); // outputs 1 baz 2
foo(1, 2);        // outputs 1 bar 2
```

License
========

The MIT License (MIT)
