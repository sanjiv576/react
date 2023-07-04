import { render, screen } from "@testing-library/react";
import Notes from "./Notes";
import { server } from "../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";


describe('Notes', () => {
  
    // by default it goes to Hanlder.js unless it is overriden
    test('should render correctly', async () => {
        render(<Notes/>)
        const h1Elem = screen.getByRole('heading', {level: 1})
        expect(h1Elem).toBeInTheDocument()  

        // test whether
        const listElem = screen.getByRole('list')
        expect(listElem).toBeInTheDocument()

        // note: there are multiple list items so findAllByRole is used
        const itemElem = await screen.findAllByRole('listitem')
        // 200 the acutal length of list that come from API
        // expect(itemElem).toHaveLength(200)
        expect(itemElem).toHaveLength(2)
    });


    test('should render error message', async () => {

        // handlers ma na gayera,
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/todos',
                (req, res, ctx) => {
                    return res(ctx.status(500))
                })
        )

        render(<Notes/>)
        const errorElem = await screen.findByText('error fetching data');

        expect(errorElem).toBeInTheDocument();

    });

    test('should call the delete function', async () => {

        // declare mock fnction
        const mockHanldeDelete = jest.fn();

        // send mock function for deleting

        render(<Notes handleDelete={mockHanldeDelete}/>)

        // we have many buttons so, findAllByRole is used instead of findByRole
        const deleteBtn = await screen.findAllByRole('button', {
            name: 'delete'
        });

        // assume click on first index button
        userEvent.click(deleteBtn[0]);

        // assure the mock function will be called, also set it called only 1 time
        expect(mockHanldeDelete).toHaveBeenCalledTimes(1);
    })
})
