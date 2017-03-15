'use strict';
import Rx from 'rxjs/Rx';

const pipeArray = [
  'evERytHinG',
  2,
  'Is',
  [6, 2, 9],
  '  A',
  { id: 41 },
  'sTReam'
];

// Pipe effect
Rx.Observable
  .zip(Rx.Observable.interval(500), 
       Rx.Observable.from(pipeArray))
  .flatMap(e => e)
  // .do(x => console.log(x))
  .filter(e => typeof e === 'string')
  .map(e => e.trim().toLowerCase())
  .subscribe((word) => {
    console.log(word);
});
