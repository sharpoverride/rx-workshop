'use strict';

class DataSource {
  constructor() {
    let counter = 0;
    this.tID = setInterval(() => this.emit(counter++), 500);
  }

  emit(n) {
    const limit = 10;
    if (this.ondata) {
      this.ondata(n);
    }

    if (n === limit) {
      if (this.oncomplete) {
        this.oncomplete();
      }
      this.destroy();
    }
  }

  destroy() {
    clearInterval(this.tID);
  }
}

function coldObservable(observer) {
  let dataSource = new DataSource();
  dataSource.ondata = (e) => observer.next(e);
  dataSource.onerror = (err) => observer.error(err);
  dataSource.oncomplete = () => observer.complete();

  return () => {
    dataSource.destroy();
  }
}

const subscription = coldObservable({
  next(val) { console.log(val) },
  error(err) { console.log(err) },
  complete() { console.log('completed') }
});
