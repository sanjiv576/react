import { render, screen } from "@testing-library/react";
import Notes from "./Notes";


describe('Notes', () => {
  

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
        expect(itemElem).toHaveLength(200)
    });
})
