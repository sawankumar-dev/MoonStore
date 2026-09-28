class ApiResponse {
    constructor(statusCode, message, data = null) {
        this.message = message;
        this.data = data;
        this.success = statusCode<400;
    }
}

export default ApiResponse