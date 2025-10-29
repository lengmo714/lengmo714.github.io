enum ELogLevel {
    Debug = 1,
    Warn = 2,
    Error = 3,
    None = 4,
}

export class LogUtil {
    private static logLevel: ELogLevel = ELogLevel.Debug;

    public static onErrorFn: (msg: string) => void

    private static Now(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = timeStr + " |";
        return timeStr;
    }

    public static SetLv(lv: ELogLevel) {
        LogUtil.logLevel = lv;
    }

    public static GetLv(): ELogLevel {
        return LogUtil.logLevel;
    }

    public static D(fmt: string, ...args: any[]) {
        if (ELogLevel.Debug < LogUtil.logLevel)
            return;

        console.log(LogUtil.Now(), fmt, ...this.argsToJson(...args));
    }

    // 指定颜色输出
    // public static DC(clr: ELogColor | string, fmt: string, ...args: any[]) {
    //     if (ELogLevel.Debug < LogUtil.logLevel)
    //         return;

    //     let log = [LogUtil.Now(), fmt].join(" ")
    //     console.log(`%c${log}`, clr, ...this.argsToJson(...args));
    // }

    public static W(fmt: string, ...args: any[]) {
        if (ELogLevel.Warn < LogUtil.logLevel)
            return;

        console.warn(LogUtil.Now(), fmt, ...this.argsToJson(...args));
    }

    public static E(fmt: string, ...args: any[]) {
        if (ELogLevel.Error < LogUtil.logLevel)
            return;

        console.error(LogUtil.Now(), fmt, ...this.argsToJson(...args));
        if (LogUtil.onErrorFn)
            LogUtil.onErrorFn([fmt, ...this.argsToJson(...args)].join(" "))
    }

    public static A(cond: null | boolean, fmt: string, ...args: any[]) {
        if (ELogLevel.Error < LogUtil.logLevel || cond)
            return;

        LogUtil.E(fmt, ...this.argsToJson(...args))
        throw new Error("--- exception, stop!");
    }

    public static T(fmt: string, ...args: any[]) {
        if (ELogLevel.Error < LogUtil.logLevel)
            return;
        console.trace(LogUtil.Now(), fmt, ...this.argsToJson(...args))
    }

    private static argsToJson(...args: any[]): any[] {
        return args
    }

}
