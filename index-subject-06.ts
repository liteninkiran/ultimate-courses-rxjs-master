import './styles.css';
import { ReplaySubject } from 'rxjs';

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete'),
};

/*
 * ReplaySubject's accept an optional argument, the number
 * of previously emitted values you wish to 'replay' 
 * on subscription. These values will be emitted in sequence
 * beginning with the most recent, to any late subscribers.
 * 
 * By default, if no arguments are supplied all values are replayed.
 */
const subject = new ReplaySubject();

subject.next('Hello');
/*
 * Receieves the value 'Hello' on subscription.
 */
const subscription = subject.subscribe(observer);

/*
 * Emit 'World' to all subscribers, just the observer above
 * right now.
 */
subject.next('World');

/*
 * Late subscribers receieve the number of values replayed,
 * when available. For instance, the ReplaySubject will emit
 * 'Hello' and 'World' to this subscriber.
 */
const secondSubscription = subject.subscribe(observer);

subject.next('Goodbye!');
subject.next('World!');

/*
 * 'Hello' 'World' 'Goodbye' 'World'
 */
const thirdSubscription = subject.subscribe(observer);
