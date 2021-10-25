export default class Language {
	public readonly code: string;
	public readonly flag: string;
	public readonly label: string;
	public readonly translationData: any;

	constructor(code: string, flag: string, label: string, translationData: any) {
		this.code = code;
		this.flag = flag;
		this.label = label;
		this.translationData = translationData;
	}
}
