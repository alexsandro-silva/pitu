import {Request, Response} from 'express';
import { Link } from '../models/link';

const links: Link[] = [];
let proxId = 1;

function generateCode() {
    let text='';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < 5; index++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function postLink(request: Request, response: Response) {
    const link = request.body as Link;
    link.id = proxId++;
    link.code = generateCode();
    link.hits = 0;
    links.push(link);
    response.status(201).json(link);
}

function getLink(request: Request, response: Response) {
    const code = request.params.code as string;
    const link = links.find(item => item.code === code);
    if(!link) {
        response.sendStatus(404);
    } else {
        response.json(link);
    }
}

function hitLink(request: Request, response: Response) {
    const code = request.params.code as string;
    const index = links.findIndex(item => item.code === code);
    if(index === -1) {
        response.sendStatus(404);
    } else {
        links[index].hits!++;
        response.json(links[index]);
    }
}

export default {
    postLink,
    getLink,
    hitLink
}