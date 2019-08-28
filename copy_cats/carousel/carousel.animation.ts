import { animation, animate } from '@angular/animations';

export const transAnimation = animation([
    animate('{{ time }}')
], { params: { time: '0.5s ease' } });
