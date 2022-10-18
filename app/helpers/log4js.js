const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: { type: "console" },
        infoFile: { type: "file", filename: "./logs/info.log" },
        warnFile: { type: "file", filename: "./logs/warn.log" },
        errorFile: { type: "file", filename: "./logs/error.log" },

        onlyInfo: {
            type: "logLevelFilter",
            appender: "infoFile",
            level: "info",
        },
        onlyWarn: {
            type: "logLevelFilter",
            appender: "warnFile",
            level: "warn",
        },

        onlyError: {
            type: "logLevelFilter",
            appender: "errorFile",
            level: "error",
        },
    },
    categories: {
        default: {
            appenders: ["console", "onlyInfo", "onlyError", "onlyWarn"],
            level: "info",
        },
    },
});

const logger = log4js.getLogger("default");

module.exports = logger;
