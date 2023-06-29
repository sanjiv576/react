// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [


    rest.get('https://jsonplaceholder.typicode.com/todos',
        //   note: ctx = context
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                // return fake data in array
                ctx.json([
                    { id: 1, title: 'buy oranges' },
                    { id: 2, title: 'go home and work' }

                ])
            )
        })
]