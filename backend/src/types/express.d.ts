import { AuthPayload } from './index';

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
            pagination?: {
                limit: number;
                offset: number;
                page: number;
            };
        }
    }
}

export { };
