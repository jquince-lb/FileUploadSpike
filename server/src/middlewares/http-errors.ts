class HttpErrors extends Error {
	public code: number;
	constructor(message: string, errorCode: number) {
		super(message);
		this.code = errorCode;
	}
}

export default HttpErrors;
