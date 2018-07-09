import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';

class Handlers {
    
    authFail(res: Response, message: string, error: any) {
        console.log(`Error: ${error}`);
        res.status(HTTPStatus.UNAUTHORIZED).send({ message: message });
    };

    authSuccess(res: Response, credentials: any, data: any) {
        //implementar esse método
    };

    onError(res: Response, message: string, error: any) {
        console.log(`Error: ${error}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({ message: message }); 
    };

    onSuccess(res: Response, data: any) {         
        res.status(HTTPStatus.OK).json({ payload: data }); 
    };

    onNext(next: NextFunction) {
        next();
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        console.error(`API error handler was executed: ${err}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            errorCode: 'ERR-001',
            errorMessage: 'Internal Server Error'
        })
    };

    dbErrorHandler(res: Response, error: any) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            code: 'ERR-01',
            message: `Error to CREATE User`
        }); 
    }

}

export default new Handlers();