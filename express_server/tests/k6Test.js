import http from 'k6/http';
import {sleep, check} from 'k6';
import {Counter} from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '50s',
}
const productUrl = `http://localhost:3004/products`;
const featureUrl = `http://localhost:3004/products/${Math.floor(Math.random() * 1000 + 4)}`;
const styleUrl = `http://localhost:3004/products/${Math.floor(Math.random() * 1000 + 4)}/styles`;
const relateUrl = `http://localhost:3004/products/${Math.floor(Math.random() * 1000 + 4)}/related`;

const user_sessions = [1234,4321,1111,9999,99995,8888,8688,1834,1894,1392,3392]

const cartUrl = `http://localhost:3004/cart/${user_sessions[Math.floor(Math.random() * (user_sessions.length - 1))]}`;


export default function() {
  // const res1 = http.get(productUrl);
  // sleep(1);
  // check(res1, {
  //   'is status 200': r => r.status === 200,
  //   'transaction time < 200ms': r => r.timings.duration < 200,
  //   'transaction time < 500ms': r => r.timings.duration < 500,
  //   'transaction time < 1000ms': r => r.timings.duration < 1000,
  //   'transaction time < 5000ms': r => r.timings.duration < 5000,
  //   'transaction time < 10000ms': r => r.timings.duration < 10000,
  //   'transaction time < 20000ms': r => r.timings.duration < 20000,
  //   'transaction time < 50000ms': r => r.timings.duration < 50000,
  //   'transaction time < 100000ms': r => r.timings.duration < 100000,
  // })

  const res2 = http.get(featureUrl);
  sleep(1);
  check(res2, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 5000ms': r => r.timings.duration < 5000,
    'transaction time < 10000ms': r => r.timings.duration < 10000,
    'transaction time < 20000ms': r => r.timings.duration < 20000,
    'transaction time < 50000ms': r => r.timings.duration < 50000,
    'transaction time < 100000ms': r => r.timings.duration < 100000,
  })

  // const res3 = http.get(styleUrl);
  // sleep(1);
  // check(res3, {
  //   'is status 200': r => r.status === 200,
  //   'transaction time < 200ms': r => r.timings.duration < 200,
  //   'transaction time < 500ms': r => r.timings.duration < 500,
  //   'transaction time < 1000ms': r => r.timings.duration < 1000,
  //   'transaction time < 5000ms': r => r.timings.duration < 5000,
  //   'transaction time < 10000ms': r => r.timings.duration < 10000,
  //   'transaction time < 20000ms': r => r.timings.duration < 20000,
  //   'transaction time < 50000ms': r => r.timings.duration < 50000,
  //   'transaction time < 100000ms': r => r.timings.duration < 100000,
  // })

  // const res4 = http.get(relateUrl);
  // sleep(1);
  // check(res4, {
  //   'is status 200': r => r.status === 200,
  //   'transaction time < 200ms': r => r.timings.duration < 200,
  //   'transaction time < 500ms': r => r.timings.duration < 500,
  //   'transaction time < 1000ms': r => r.timings.duration < 1000,
  //   'transaction time < 5000ms': r => r.timings.duration < 5000,
  //   'transaction time < 10000ms': r => r.timings.duration < 10000,
  //   'transaction time < 20000ms': r => r.timings.duration < 20000,
  //   'transaction time < 50000ms': r => r.timings.duration < 50000,
  //   'transaction time < 100000ms': r => r.timings.duration < 100000,
  // })

  // const res5 = http.get(cartUrl);
  // sleep(1);
  // check(res5, {
  //   'is status 200': r => r.status === 200,
  //   'transaction time < 200ms': r => r.timings.duration < 200,
  //   'transaction time < 500ms': r => r.timings.duration < 500,
  //   'transaction time < 1000ms': r => r.timings.duration < 1000,
  //   'transaction time < 5000ms': r => r.timings.duration < 5000,
  //   'transaction time < 10000ms': r => r.timings.duration < 10000,
  //   'transaction time < 20000ms': r => r.timings.duration < 20000,
  //   'transaction time < 50000ms': r => r.timings.duration < 50000,
  //   'transaction time < 100000ms': r => r.timings.duration < 100000,
  // })

}