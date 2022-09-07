import { sum } from './modules/sum';

const root = document.querySelector('#root');
root.textContent = sum(7, -1).toString(); 