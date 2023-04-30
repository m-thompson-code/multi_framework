import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appSticky]',
	standalone: true,
})
export class StickyDirective implements OnInit {
	@Input() appSticky: 'top' | 'bottom' = 'top';

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit(): void {
		const element = this.elementRef.nativeElement;

		this.renderer.setStyle(element, 'position', 'fixed');
		this.renderer.setStyle(element, this.appSticky, '0');
		this.renderer.setStyle(element, 'z-index', '1000');
		this.renderer.setStyle(element, 'background', '#7e7e7e');
		this.renderer.setStyle(element, 'height', '50px');
		this.renderer.setStyle(element, 'font-size', '18px');
		this.renderer.setStyle(element, 'width', '100%');
		this.renderer.setStyle(element, 'padding-top', '10px');
		this.renderer.setStyle(element, 'text-align', 'center');
		this.renderer.setStyle(element, 'color', 'white');
	}
}
