import './styles.css';
import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById('loading-overlay');

if (loadingOverlay) {
    loadingService.status$.subscribe((isLoading) => {
        isLoading
            ? loadingOverlay.classList.add('open')
            : loadingOverlay.classList.remove('open');
    });
    loadingService.showLoading();
    setTimeout(() => loadingService.hideLoading(), 1500);
}
