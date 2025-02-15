import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class HideAfterContext {
	public get $implicit() {
		return this.hideAfter;
	}
	public hideAfter = 0;
	public counter = 0;
	public hideAfterThen = 1000;
}

@Directive({
	selector: '[hideAfter]',
	standalone: true,
})
export class HideAfterDirective implements OnInit {
	@Input('hideAfter')
	set delay(value: number | null) {
		this._delay = (value ?? 0) * 1000;
		this.context.hideAfter = this.context.counter = this._delay / 1000;
	}
	private _delay = 0;

	@Input('hideAfterThen')
	placeholder: TemplateRef<HideAfterContext> | null = null;

	private context = new HideAfterContext();

	constructor(
		private viewContainerRef: ViewContainerRef,
		private template: TemplateRef<HideAfterContext>,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.viewContainerRef.createEmbeddedView(this.template, this.context);
		const intervalId = setInterval(() => {
			this.context.counter--;
			console.log(this.context.counter);
			this.cd.detectChanges();
		}, 1000);
		setTimeout(() => {
			this.viewContainerRef.clear();
			if (this.placeholder) {
				this.viewContainerRef.createEmbeddedView(this.placeholder, this.context);
			}
			clearInterval(intervalId);
		}, this._delay);
	}

	static ngTemplateContextGuard(dir: HideAfterDirective, ctx: unknown): ctx is HideAfterContext {
		return true;
	}
}
