import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' })
});

routes.get('/posts', (req, res) => {
    return res.json({ message: 'New Post' })
});

export default routes;