import { environment } from './../../../environments/environment';



export const getUrl = (path) => {
    return `${environment.apiUrl}/${path}`
}

