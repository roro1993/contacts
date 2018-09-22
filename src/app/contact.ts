import { IContact } from './contactlist';

export class Contact implements IContact{
	constructor(
		public id:number = '',
		public name:string = '',
		public number:number = '',
		public email:string = '',
		public company:string = '',
		public job:string = '',
	){}
}
