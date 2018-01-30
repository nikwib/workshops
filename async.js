// log the `rnd` result in the console using all three async techniques.
const randomNumber = () => {
  return Math.random();
};

// 1. Make it wait for 1 sec. with `setTimeout` and log it on main function
const timeoutRandomNumber = (cb) => {
  setTimeout(function () {
    cb(randomNumber());
  }, 1000);
};

// 2. Now wrap the timeout version to work with promises
const promiseRandomNumber = () => {
  return new Promise (function (resolve, reject) {    
    timeoutRandomNumber((data) => {resolve(data);});   
  });
};

// 3. Finally, code a final version with async await.
const asyncRandomNumber = async () => {
  return await promiseRandomNumber();  // Return a promise
};

const rangedRandomNumber = (base, min, max) => {
  return Math.floor((base*(max-min))+min);
};

const main = async () => {
  const rnd = randomNumber()
  console.log('Syncronoius: ',rangedRandomNumber(rnd, 14, 42));
  function cb (rnd) {console.log('Result from CB: ',rangedRandomNumber(rnd, 14, 42));}
  // Callback
  timeoutRandomNumber(cb);
  // Promise
  promiseRandomNumber()
    .then(function(resolvedResult) {console.log('Promise: ',rangedRandomNumber(resolvedResult, 14, 42))});
  // Async Await
  try {
    const rndNum = await asyncRandomNumber();
    console.log('async await:', rangedRandomNumber(rndNum, 14, 42));
  } catch (e) {
    console.log('Wrong', e);
  }
};

main();