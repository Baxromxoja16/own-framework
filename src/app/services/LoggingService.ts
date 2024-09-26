export class LoggingService {
    private messagePr: string = "";

    log(message: string) {
        console.log(`LoggingService dan: ${message}`);
    }

    set message(msg: string) {
        this.messagePr = msg;
    }
}