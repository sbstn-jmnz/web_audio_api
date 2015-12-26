   var Person = (function()) {
    function Person(first, last, age) {
    this.first = first;
    this.last = last;
    this.age = age;
    this.fullname = this.first + '  ' + this.last;
  }
    Person.prototype = {
    toString: fuction(){
      return 'Person: ' + this.fullname + ' is ' + this.age + ' years old.';
    }
  };
  return Person

};
