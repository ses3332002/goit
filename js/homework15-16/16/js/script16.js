'use strict';

function Human(outName) {
  this.name = outName;
  this.age = '25';
  this.sex = 'man';
  this.height = '175';
  this.weight = '75';
};

function Worker(outName, outWorkPlace) {
  Human.call(this,outName);
  this.workPlace = outWorkPlace;
  this.salary = 1000;
  this.doWork = function () {
    alert(this.name + ': I am doing my job on ' + this.workPlace)
  };
};

function Student(outName, outStudyPlace) {
  Human.call(this,outName);
  this.studyPlace = outStudyPlace;
  this.stipend = 100;
  this.watchTVShows = function () {
    alert(this.name + ': I am watching TV when not studying in the ' + this.studyPlace)
  };
};

Worker.prototype = Object.create(Human.prototype);
Worker.prototype.constructor = Worker;
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

var worker1 = new Worker('John', 'factory');
worker1.doWork();
console.dir(worker1);

var worker2 = new Worker('Nick', 'plant');
worker2.doWork();
console.dir(worker2);

var student1 = new Student('Stephen', 'institute');
student1.watchTVShows();
console.dir(student1);

var student2 = new Student('Tom', 'high school');
student2.watchTVShows();
console.dir(student2);
