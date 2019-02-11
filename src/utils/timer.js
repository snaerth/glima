/** Class representing timer */
class Timer {
  /**
   * Create start and end times variables
   */
  constructor() {
    this.t1 = null;
    this.t2 = null;
    this.diffrence = null;
  }

  /**
   * Start time value
   */
  start() {
    this.t1 = new Date();
  }

  /**
   * End time value
   */
  stop() {
    this.t2 = new Date();
  }

  /**
   * Calculates diffrence in milliseconds between start and end time
   */
  diff() {
    this.diffrence = Math.abs(this.t1.getTime() - this.t2.getTime());
    return this.diffrence;
  }
}

export default Timer;
