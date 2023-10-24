import { Observable, Subject } from 'rxjs';

const loading$ = new Subject<boolean>();

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
