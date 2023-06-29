import { logRoles, render, screen } from "@testing-library/react"
import Counter from "./Counter"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";



describe('Counter', () => {
    test('should render correctly', () => {
        render(<Counter />);

        const h1Element = screen.getByRole('heading', {
            level: 1
        });
        expect(h1Element).toBeInTheDocument();

        const btnElem = screen.getByRole('button', {
            name: 'Increase Count'
        });
        expect(btnElem).toBeInTheDocument();
    })

    //   increase count on button click
    test('should increase count with button click', async () => {
        render(<Counter />)
        const btnElem = screen.getByRole('button', {
            name: 'Increase Count'
        });


        // now handling user events
        // Note: act is asyn func
        // Note: if the state is changed then use act on user events

        await act(() => userEvent.click(btnElem))

        // find the new text element i.e 1 from 0 is present or not there
        const h1Element = screen.getByRole('heading', {
            level: 1
        });

        expect(h1Element).toHaveTextContent(1);

        // expect(btnElem).toBeInTheDocument();
    })


    test('should set the inital value from input field', async () => {
        const view = render(<Counter />);

        logRoles(view.container)

        // step 1
        const inputElem = screen.getByRole('spinbutton')

        // assume 20 value in input field
        // Note: if the state is changed then use act on user events

        await act(() => userEvent.type(inputElem, "20"));
        expect(inputElem).toHaveValue(20);

        // step 2
        const setBtn = screen.getByRole('button', { name: "Set" });
        // Note: if the state is changed then use act on user events
        await act(() => userEvent.click(setBtn));

        // step 3

        const h1Elem = screen.getByRole('heading', { level: 1 });
        expect(h1Elem).toHaveTextContent(20)

        // step 4 click on the increase button

        const increaseBtn = screen.getByRole('button', { name: "Increase Count" })

        // Note: if the state is changed then use act on user events
        await act(() => userEvent.click(increaseBtn))

        expect(h1Elem).toHaveTextContent(21);
    })


    // testing right order of elements on tapping
    // proper orders is increase btn --> input field --> set button
    test('should have proper order of focus', () => {
        render(< Counter />)

        // first find all
        const increaseBtn = screen.getByRole('button', { name: "Increase Count" });
        const setBtn = screen.getByRole('button', { name: "Set" });
        const inputElem = screen.getByRole('spinbutton');

        // first tab
        userEvent.tab();
        expect(increaseBtn).toHaveFocus();

        // second tab

        userEvent.tab();
        expect(inputElem).toHaveFocus();

        // third tab

        userEvent.tab();
        expect(setBtn).toHaveFocus();



    })
})
