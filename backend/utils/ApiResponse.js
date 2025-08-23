export class ApiResponse {
constructor(success, data = null, message = null) {
this.success = success;
if (data !== null) this.data = data;
if (message) this.message = message;
}
}