import Messages from './Messages';

class RequestError extends Error {
  public message: Messages;
  public status: number;

  constructor(message: Messages, status: number) {
    super();

    this.message = message;
    this.status = status;
  }
}

export default RequestError;
