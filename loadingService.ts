import { Observable, BehaviorSubject } from 'rxjs';

const loading$ = new BehaviorSubject<boolean>(true);

export const loadingService: ILoadingService = {
    showLoading: () => loading$.next(true),
    hideLoading: () => loading$.next(false),
    status$: loading$.asObservable(),
}

interface ILoadingService {
    showLoading: Function,
    hideLoading: Function,
    status$: Observable<boolean>,
}
