import { animate, query, style, transition, trigger } from '@angular/animations';

// export const routerAnimation = trigger('routerAnimation', [
// 	transition('* <=> *', [
// 		query(':enter', [animate('500ms ease-out', style({ left: '100%' }))]),
// 		query(':enter, :leave', [
// 			style({
// 				opacity: 0,
// 				transform: 'translateY(60px)',
// 				transition: 'opacity 0.5s ease-out',
// 			}),
// 		]),
// 	]),
// ]);

export const routerAnimation = trigger('routerAnimation', [
	transition('* <=> *', [
		query(':enter, :leave', [
			style({
				position: 'absolute',
				left: 0,
				opacity: 0,
				width: '100%',
				transform: 'scale(0) translateY(100%)',
				//transition: 'opacity 0.5s ease-out',
			}),
		]),
		query(':enter', [animate('500ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))]),
	]),
]);
