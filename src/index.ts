import { EventEmitter } from "node:events";

type LogType = "log" | "infoLog" | "warnLog" | "errorLog";
type TimeZone = "Africa/Johannesburg" | "Africa/Lagos" | "Africa/Windhoek" | "America/Adak" | "America/Anchorage" | "America/Argentina/Buenos_Aires" | "America/Bogota" | "America/Caracas" | "America/Chicago" | "America/Denver" | "America/Godthab" | "America/Guatemala" | "America/Halifax" | "America/Los_Angeles" | "America/Montevideo" | "America/New_York" | "America/Noronha" | "America/Phoenix" | "America/Santiago" | "America/Santo_Domingo" | "America/St_Johns" | "Asia/Baghdad" | "Asia/Baku" | "Asia/Beirut" | "Asia/Dhaka" | "Asia/Dubai" | "Asia/Irkutsk" | "Asia/Jakarta" | "Asia/Kabul" | "Asia/Kamchatka" | "Asia/Karachi" | "Asia/Kathmandu" | "Asia/Kolkata" | "Asia/Krasnoyarsk" | "Asia/Omsk" | "Asia/Rangoon" | "Asia/Shanghai" | "Asia/Tehran" | "Asia/Tokyo" | "Asia/Vladivostok" | "Asia/Yakutsk" | "Asia/Yekaterinburg" | "Atlantic/Azores" | "Atlantic/Cape_Verde" | "Australia/Adelaide" | "Australia/Brisbane" | "Australia/Darwin" | "Australia/Eucla" | "Australia/Lord_Howe" | "Australia/Sydney" | "Etc/GMT+12" | "Europe/Berlin" | "Europe/London" | "Europe/Moscow" | "Pacific/Apia" | "Pacific/Auckland" | "Pacific/Chatham" | "Pacific/Easter" | "Pacific/Gambier" | "Pacific/Honolulu" | "Pacific/Kiritimati" | "Pacific/Majuro" | "Pacific/Marquesas" | "Pacific/Norfolk" | "Pacific/Noumea" | "Pacific/Pago_Pago" | "Pacific/Pitcairn" | "Pacific/Tongatapu" | "UTC";
type LoggerOptions = {
    timeZone: TimeZone;
}
export default class Logger<T extends (...args: any[]) => void> {
    private readonly timeZone: TimeZone;
    private readonly _eventEmitter: EventEmitter;
    constructor(options: LoggerOptions) {
        if (!this.isValidTimeZone(options.timeZone)) {
            throw new TypeError("Invalid TimeZone");
        }
        this.timeZone = options.timeZone;
        this._eventEmitter = new EventEmitter();
    }
    public log(message?: any, ...optionalParams: any[]): void {
        let args = [...optionalParams];
        args.unshift(`${style.ansi(`38;5;${0xf5}m`)}[ log ---${style.ansi("3m")} ${this.getDateString()} ${style.ansi(`0;38;5;${0xf5}m`)}] ${message ?? ""}`);
        console.log(...args, style.reset);
        this._eventEmitter.emit("log", [message, ...optionalParams]);
    }
    public info(message?: any, ...optionalParams: any[]): void {
        let args = [...optionalParams];
        args.unshift(`[ ${style.ansi("32m")}info${style.reset} -- ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ] ${message ?? ""}`);
        console.log(...args, style.reset);
        this._eventEmitter.emit("infoLog", [message, ...optionalParams]);
    }
    public warn(message?: any, ...optionalParams: any[]): void {
        let args = [...optionalParams];
        args.unshift(`[ ${style.ansi("33m")}warn${style.reset} -- ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ] ${message ?? ""}`);
        console.warn(...args, style.reset);
        this._eventEmitter.emit("warnLog", [message, ...optionalParams]);
    }
    public error(message?: any, ...optionalParams: any[]): void {
        let args = [...optionalParams];
        args.unshift(`[ ${style.ansi("31m")}error${style.reset} - ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ] ${message ?? ""}`);
        console.error(...args, style.reset);
        this._eventEmitter.emit("errorLog", [message, ...optionalParams]);
    }
    public on(event: LogType, listener: T): void {
        this._eventEmitter.on(event, listener);
    }
    public once(event: LogType, listener: T): void {
        this._eventEmitter.once(event, listener);
    }
    public off(event: LogType, listener: T): void {
        this._eventEmitter.off(event, listener);
    }
    private getDateString(time?: Date | number): string {
        return new Intl.DateTimeFormat("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: this.timeZone }).format(time ?? new Date());
    }
    private isValidTimeZone(tz: string): boolean {
        try {
            Intl.DateTimeFormat(undefined, { timeZone: tz });
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
class style {
    static reset = "\x1b[0m"
    static ansi(str: string): string {
        return `\x1b[${str}`
    }
}
