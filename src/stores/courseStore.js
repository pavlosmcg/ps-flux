import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

// event emitter is from Node js, we're going to
// use it's already existing functionality
class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    // wrap EventEmitter's "on" method:
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    // wrap EventEmitter's "remove" method
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    // wrap "emit" method
    this.emit(CHANGE_EVENT);
  }
}

export default new CourseStore();
