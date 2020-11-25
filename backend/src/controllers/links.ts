import {Request, Response} from 'express';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository';

function generateCode() {
    let text='';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < 5; index++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

async function postLink(request: Request, response: Response) {
    const link = request.body as Link;
    link.code = generateCode();
    link.hits = 0;
    const result = await linksRepository.add(link);
    if (!result.id) return response.sendStatus(400);

    link.id = result.id!;

    response.status(201).json(link);
}

async function getLink(request: Request, response: Response) {
    const code = request.params.code as string;
    const link = await linksRepository.findByCode(code);
    if(!link) {
        response.sendStatus(404);
    } else {
        response.json(link);
    }
}

async function hitLink(request: Request, response: Response) {
    const code = request.params.code as string;
    const link = await linksRepository.hit(code);
    if(!link) {
        response.sendStatus(404);
    } else {
        response.json(link);
    }
}

export default {
    postLink,
    getLink,
    hitLink
}