import { getUrl } from '../app/core/utilities/api.utils';
import * as fs from 'fs';
import axios from 'axios';
import { EOL } from 'os'

const routesFile = `${__dirname}/routes-result.txt`;

const routes = new Set<RouteData>();

interface RouteData {
    url: string;
    name: string;
}


// Add paths that should be dynamically fetched
// Use getUrl utillity so url is replaced in production
routes.add({ url: getUrl('projects'), name: 'works'});

(async () => {
    const fetchedRoutes = new Array<string>();

    for(let route of Array.from(routes)) {
        try {
            const result = await axios.get(route.url);
            const ids: number[] = extractIds(result.data);
            for(let id of ids) {
                fetchedRoutes.push(`/${route.name}/${id}`);
            }
        } catch (error) {
            console.log(`Error happened while fetching routes for prerender \n ${error}`);
        }
    }
    fs.writeFileSync(routesFile, fetchedRoutes.join(EOL), 'utf8');
})()

interface Entity {
    id: number;
}

const extractIds = (data: Entity[]): number[] => {
    return [...data.map(entity => entity.id)]
}




