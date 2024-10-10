export interface OnInit {
    ngOnInit(): void;
}

export interface OnChanges {
    ngOnChanges(changes: any): void;
}

export interface DoCheck {
    ngDoCheck(): void;
}

export interface OnDestroy {
    ngOnDestroy(): void;
}