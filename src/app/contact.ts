import { IContact } from './contactlist';

export class Contact implements IContact{
	constructor(
		public id:number = 0,
		public name:string = '',
		public number:string = '',
		public email:string = '',
		public company:string = '',
		public job:string = '',
	){}
}
