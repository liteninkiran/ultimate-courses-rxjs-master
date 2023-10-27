import { BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilKeyChanged, scan } from 'rxjs/operators';

export class ObservableStore {
    private _store: BehaviorSubject<IUser>;
    private _stateUpdate = new Subject();

    /*
     * Accumulate state over time using scan.
     * For this example we will just merge our current state
     * with updated state and emit the result, however
     * this could be any reducer / pattern you wish to follow.
     */
    constructor(initialState: IUser) {
        this._store = new BehaviorSubject(initialState);
        this._stateUpdate.pipe(
            scan((acc, curr: any) => ({ ...acc, ...curr }), initialState),
        ).subscribe(this._store);
    }

    /*
     * Select a slice of state based on key.
     */
    selectState(key: keyof IUser) {
        return this._store.pipe(
            distinctUntilKeyChanged(key),
            map(state => state[key]),
        );
    }

    /*
     * Update state with new object to merge.
     */
    updateState(newState: Partial<IUser>) {
        this._stateUpdate.next(newState);
    }

    /*
     * Subscribe to any store state changes.
     */
    stateChanges() {
        return this._store.asObservable();
    }
}

interface IUser {
    user: string;
    isAuthenticated: boolean;
}
