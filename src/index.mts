import { EventEmitter } from "node:events";
import { Console } from "node:console";
import { Writable } from "node:stream";
import { Buffer } from "node:buffer";

type LogType = "log" | "infoLog" | "warnLog" | "errorLog";
type TimeZone = "Africa/Johannesburg" | "Africa/Lagos" | "Africa/Windhoek" | "America/Adak" | "America/Anchorage" | "America/Argentina/Buenos_Aires" | "America/Bogota" | "America/Caracas" | "America/Chicago" | "America/Denver" | "America/Godthab" | "America/Guatemala" | "America/Halifax" | "America/Los_Angeles" | "America/Montevideo" | "America/New_York" | "America/Noronha" | "America/Phoenix" | "America/Santiago" | "America/Santo_Domingo" | "America/St_Johns" | "Asia/Baghdad" | "Asia/Baku" | "Asia/Beirut" | "Asia/Dhaka" | "Asia/Dubai" | "Asia/Irkutsk" | "Asia/Jakarta" | "Asia/Kabul" | "Asia/Kamchatka" | "Asia/Karachi" | "Asia/Kathmandu" | "Asia/Kolkata" | "Asia/Krasnoyarsk" | "Asia/Omsk" | "Asia/Rangoon" | "Asia/Shanghai" | "Asia/Tehran" | "Asia/Tokyo" | "Asia/Vladivostok" | "Asia/Yakutsk" | "Asia/Yekaterinburg" | "Atlantic/Azores" | "Atlantic/Cape_Verde" | "Australia/Adelaide" | "Australia/Brisbane" | "Australia/Darwin" | "Australia/Eucla" | "Australia/Lord_Howe" | "Australia/Sydney" | "Etc/GMT+12" | "Europe/Berlin" | "Europe/London" | "Europe/Moscow" | "Pacific/Apia" | "Pacific/Auckland" | "Pacific/Chatham" | "Pacific/Easter" | "Pacific/Gambier" | "Pacific/Honolulu" | "Pacific/Kiritimati" | "Pacific/Majuro" | "Pacific/Marquesas" | "Pacific/Norfolk" | "Pacific/Noumea" | "Pacific/Pago_Pago" | "Pacific/Pitcairn" | "Pacific/Tongatapu" | "UTC";
type LoggerOptions = {
    timeZone?: TimeZone;
}

type Listener = (log: string) => void;
class Logger {
    private readonly timeZone: TimeZone;
    private readonly _eventEmitter: EventEmitter;

    constructor(options: LoggerOptions) {
        if (!Logger.isValidTimeZone(options.timeZone ?? "UTC")) {
            throw new TypeError("Invalid TimeZone");
        }
        this.timeZone = options.timeZone ?? "UTC";
        this._eventEmitter = new EventEmitter();
    }
    public log(message?: any, ...optionalParams: any[]): void {
        const formatted = Logger.format(message, ...optionalParams);
        const out = `${style.ansi(`38;5;${0xf5}m`)}[ log --- ${style.ansi("3m") + this.getDateString() + style.ansi(`0;38;5;${0xf5}m`)} ]${formatted.includes("\n") ? "\n" : " "}${formatted + style.reset}`;
        console.log(out);
        this._eventEmitter.emit("log", out.replace(/\x1b\[([0-9]|[;])+([A-K]|[Hm])/g, ""));
    }
    public info(message?: any, ...optionalParams: any[]): void {
        const formatted = Logger.format(message, ...optionalParams);
        const out = `[ ${style.ansi("32m")}info${style.reset} -- ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ]${formatted.includes("\n") ? "\n" : " "}${formatted + style.reset}`;
        console.log(out);
        this._eventEmitter.emit("infoLog", out.replace(/\x1b\[([0-9]|[;])+([A-K]|[Hm])/g, ""));
    }
    public warn(message?: any, ...optionalParams: any[]): void {
        const formatted = Logger.format(message, ...optionalParams);
        const out = `[ ${style.ansi("33m")}warn${style.reset} -- ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ]${formatted.includes("\n") ? "\n" : " "}${formatted + style.reset}`;
        console.warn(out);
        this._eventEmitter.emit("warnLog", out.replace(/\x1b\[([0-9]|[;])+([A-K]|[Hm])/g, ""));
    }
    public error(message?: any, ...optionalParams: any[]): void {
        const formatted = Logger.format(message, ...optionalParams);
        const out = `[ ${style.ansi("31m")}error${style.reset} - ${style.ansi(`3;38;5;${0xf5}m`) + this.getDateString() + style.reset} ]${formatted.includes("\n") ? "\n" : " "}${formatted + style.reset}`;
        console.error(out);
        this._eventEmitter.emit("errorLog", out.replace(/\x1b\[([0-9]|[;])+([A-K]|[Hm])/g, ""));
    }
    public on(event: LogType, listener: Listener): void {
        this._eventEmitter.on(event, listener);
    }
    public once(event: LogType, listener: Listener): void {
        this._eventEmitter.once(event, listener);
    }
    public off(event: LogType, listener: Listener): void {
        this._eventEmitter.off(event, listener);
    }
    private getDateString(time?: Date | number): string {
        return `${new Intl.DateTimeFormat("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: this.timeZone }).format(time ?? new Date())} (UTC${TimeZoneOffset["Asia/Tokyo"]})`
    }
    private static isValidTimeZone(tz: string): boolean {
        try {
            Intl.DateTimeFormat(undefined, { timeZone: tz });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    private static format(message?: any, ...optionalParams: any[]):string {
        const stdoutStderr = new DummyConsoleOut();
        new Console(stdoutStderr).log(message, ...optionalParams);
        const formatted = stdoutStderr._data.toString().slice(0, -1);
        stdoutStderr.destroy();
        return formatted;
    }
}
class style {
    static reset = "\x1b[0m"
    static ansi(str: string): string {
        return `\x1b[${str}`
    }
}
const TimeZoneOffset = {
    "Africa/Johannesburg": "+02:00",
    "Africa/Lagos": "+01:00",
    "Africa/Windhoek": "+01:00",
    "America/Adak": "-10:00",
    "America/Anchorage": "-09:00",
    "America/Argentina/Buenos_Aires": "-03:00",
    "America/Bogota": "-05:00",
    "America/Caracas": "-04:30",
    "America/Chicago": "-06:00",
    "America/Denver": "-07:00",
    "America/Godthab": "-03:00",
    "America/Guatemala": "-06:00",
    "America/Halifax": "-04:00",
    "America/Los_Angeles": "-08:00",
    "America/Montevideo": "-03:00",
    "America/New_York": "-05:00",
    "America/Noronha": "-02:00",
    "America/Phoenix": "-07:00",
    "America/Santiago": "-04:00",
    "America/Santo_Domingo": "-04:00",
    "America/St_Johns": "-03:30",
    "Asia/Baghdad": "+03:00",
    "Asia/Baku": "+04:00",
    "Asia/Beirut": "+02:00",
    "Asia/Dhaka": "+06:00",
    "Asia/Dubai": "+04:00",
    "Asia/Irkutsk": "+09:00",
    "Asia/Jakarta": "+07:00",
    "Asia/Kabul": "+04:30",
    "Asia/Kamchatka": "+12:00",
    "Asia/Karachi": "+05:00",
    "Asia/Kathmandu": "+05:45",
    "Asia/Kolkata": "+05:30",
    "Asia/Krasnoyarsk": "+08:00",
    "Asia/Omsk": "+07:00",
    "Asia/Rangoon": "+06:30",
    "Asia/Shanghai": "+08:00",
    "Asia/Tehran": "+03:30",
    "Asia/Tokyo": "+09:00",
    "Asia/Vladivostok": "+11:00",
    "Asia/Yakutsk": "+10:00",
    "Asia/Yekaterinburg": "+06:00",
    "Atlantic/Azores": "-01:00",
    "Atlantic/Cape_Verde": "-01:00",
    "Australia/Adelaide": "+09:30",
    "Australia/Brisbane": "+10:00",
    "Australia/Darwin": "+09:00",
    "Australia/Eucla": "+08:45",
    "Australia/Lord_Howe": "+10:30",
    "Australia/Sydney": "+10:00",
    "Etc/GMT+12": "-12:00",
    "Europe/Berlin": "+01:00",
    "Europe/London": "+00:00",
    "Europe/Moscow": "+04:00",
    "Pacific/Apia": "+13:00",
    "Pacific/Auckland": "+12:00",
    "Pacific/Chatham": "+12:45",
    "Pacific/Easter": "-06:00",
    "Pacific/Gambier": "-09:00",
    "Pacific/Honolulu": "-10:00",
    "Pacific/Kiritimati": "+14:00",
    "Pacific/Majuro": "+12:00",
    "Pacific/Marquesas": "-09:30",
    "Pacific/Norfolk": "+11:30",
    "Pacific/Noumea": "+11:00",
    "Pacific/Pago_Pago": "-11:00",
    "Pacific/Pitcairn": "-08:00",
    "Pacific/Tongatapu": "+13:00",
    "UTC": "+00:00",
}

class DummyConsoleOut extends Writable {
    public _data: Buffer = Buffer.alloc(0);
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        const buf = Buffer.from(chunk, encoding);
        this._data = Buffer.concat([this._data, buf]);
    }
}

export default Logger;