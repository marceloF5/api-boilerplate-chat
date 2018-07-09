import Auth from '../../utils/services/auth.service';

export class TokenServices {
    
    constructor() { }

    create(id: string): Promise<string> {                                                                             
        return Auth.generateToken(id);
    }

}

export default new TokenServices();