### ng-template
    Angular translates the *ngIf attribute into a <ng-template> element, wrapped around the host element, also used for input #templateReference
### ng-container
    when there's no single element to host the directive, also used for output with ngTemplateOutlet and *ngComponentOutlet
### ng-content
    is a placeholder for the external content where it tells Angular where to insert that content. It also support a `select` attribute for specifying element selector from projected content


## Decorators

Returns the value of the specified attribute from the host in a directive constructor.

    constructor(@Attribute('type') type ) {
        console.log(type); // text
    }

Queries anything directly visible in the template other than ng-content. `Directive`, `Component`, `TemplateRef`  or `Template Reference variable` can be selected. Elements can be read like `{read: ViewContainerRef | ElementRef }` or you get the `Default component instance`. Also newer version allows to resolve when to run the query by `static`. Read more here [ViewChild Description](https://angular.io/api/core/ViewChild#description)

    @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>
    ngAfterViewInit() {}

Queries anything from the current component's template, also the projected content through ng-content. Read more info here --> [ContentChildren Description](https://angular.io/api/core/ContentChildren#description)

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>
    ngAfterContentInit() {}

Declares a DOM event to listen for, and provides a handler method to run when that event occurs.

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
