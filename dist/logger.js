var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pino } from 'pino';
export default class Logger {
    constructor() {
        this.logInstance = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                },
            },
            base: {
                pid: false,
            },
        });
        this.log('info', 'Logger Initialized.');
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                this.instance = new Logger();
            }
            return this.instance;
        });
    }
    log(level, message, code = 200) {
        switch (level) {
            case 'info':
                this.logInstance.info(message);
                break;
            case 'debug':
                this.logInstance.debug(message);
                break;
            case 'error':
                this.logInstance.error(message);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=logger.js.map