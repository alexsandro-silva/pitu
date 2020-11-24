import {Request, Response} from 'express';

function postLink(request: Request, response: Response) {
    response.send('postLink');
}

function getLink(request: Request, response: Response) {
    response.send('getLink');
}

function hitLink(request: Request, response: Response) {
    response.send('hitLink');
}

export default {
    postLink,
    getLink,
    hitLink
}