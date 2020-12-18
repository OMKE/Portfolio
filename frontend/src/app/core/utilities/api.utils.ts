import { environment } from '../../../environments/environment';



export const getUrl = (path) => {
    return `${environment.apiUrl}/${path}`;
};



export interface ApiResponse {
    message: string;
    data?: any;
    errors?: any;
}
