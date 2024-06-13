import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define your custom format
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const log = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
    ),
    transports: [
        new transports.Console()
    ]
});

export default log

