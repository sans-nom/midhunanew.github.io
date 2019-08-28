import {
    Component, ElementRef, AfterViewInit, TemplateRef, Directive,
    ContentChildren, ViewChild, ViewChildren, QueryList
} from '@angular/core';

import { useAnimation, style, trigger, transition, state } from '@angular/animations';
import { transAnimation } from './carousel.animation';

@Directive({ selector: '[appCarouselElement]' }) export class CarouselElementDirective { }
@Directive({ selector: '[appCarouselItem]' }) export class CarouselItemDirective {
    constructor(public tpl: TemplateRef<any>) {
        // Here you get TemplateRef
    }
}

@Component({
    selector: 'app-carousel',
    exportAs: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slideAnimation', [
            state('moveLeft', style({
                transform: '{{xCoord}}',
            }), { params: { xCoord: 'translateX(0px)' } }),
            state('moveRight', style({
                transform: '{{xCoord}}'
            }), { params: { xCoord: 'translateX(0px)' } }),
            transition('* => *', [useAnimation(transAnimation, {
                params: { time: '500ms ease-in' }
            })])
        ])
    ]
})
export class CarouselComponent implements AfterViewInit {
    @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
    @ViewChildren(CarouselElementDirective, { read: ElementRef }) private itemElements: QueryList<ElementRef>;


    @ViewChild('slide') private slide: ElementRef;
    slideDirection = 'moveLeft';
    currentSlide = 0;
    offset = 0;
    slideX1 = 'translateX(0px)';
    private parentWidth: number;
    private maxOffset: number;
    private childWidth: number;

    constructor() { }

    ngAfterViewInit() {
        const children = this.itemElements;
        this.parentWidth = this.slide.nativeElement.getBoundingClientRect().width;
        this.childWidth = children.first.nativeElement.getBoundingClientRect().width;
        this.maxOffset = this.parentWidth - (children.length * this.childWidth);
        if (this.maxOffset > 0) { this.maxOffset = 0; }
    }

    moveRight(e) {
        this.offset -= (this.childWidth * 3);
        if (this.offset < this.maxOffset) { this.offset = this.maxOffset; }
        this.slideDirection = this.slideDirection === 'moveRight' ? 'moveLeft' : 'moveRight';
        this.slideX1 = `translateX(${this.offset}px)`;
    }

    moveLeft(e) {
        this.offset += (this.childWidth * 3);
        if (this.offset > 0) { this.offset = 0; }
        this.slideDirection = this.slideDirection === 'moveRight' ? 'moveLeft' : 'moveRight';
        this.slideX1 = `translateX(${this.offset}px)`;
    }
}

