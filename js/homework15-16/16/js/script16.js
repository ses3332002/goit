'use strict';

function Human() {
  this.name = 'John';
  this.age = '25';
  this.sex = 'man';
  this.height = '175';
  this.weight = '75';
};

function Worker() {
  this.workPlace = 'plant';
  this.salary = 1000;
  this.doWork = function () {
    alert(this.name + ': I am doing my job on ' + this.workPlace)
  };
};

function Student() {
  this.studyPlace = 'institute';
  this.stipend = 100;
  this.watchTVShows = function () {
    alert(this.name + ': I am watching TV when not studying in the ' + this.studyPlace)
  };
};

Worker.prototype = new Human();
Student.prototype = new Human();

var worker1 = new Worker();
worker1.workPlace = 'factory';
worker1.doWork();
console.log(worker1);

var worker2 = new Worker();
worker2.name = 'Nick';
worker2.doWork();
console.log(worker2);

var student1 = new Student();
student1.name = 'Stephen';
student1.watchTVShows();
console.log(student1);

var student2 = new Student();
student2.studyPlace = 'high school';
student2.watchTVShows();
console.log(student2);
