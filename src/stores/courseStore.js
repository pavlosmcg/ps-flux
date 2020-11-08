import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

// event emitter is from Node js, we're going to
// use it's already existing functionality
class CourseStore extends EventEmitter {
  // these first three methods wrap EventEmitter methods
  addChangeListener(callback) {
    // e.g. wrap EventEmitter's "on" method:
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  // all registered stores are notified of every action,
  // so we use a switch statement to check if it's our
  // thing and act accordingly
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    default:
    // nothing to see here
  }
});

export default store;
