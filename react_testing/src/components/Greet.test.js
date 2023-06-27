import { render, screen } from "@testing-library/react";
import Greet from "./Greet";


describe('Greet', () => {

    test('renders correctly', () => {
        render(< Greet />)

        // method - 1
        // test by Role is used here, because react categorizes all elements
        // const h1Element = screen.getByRole('heading', {level: 1});


        // method - 2
        // test by name
        // const h1Element = screen.getByRole('heading', {
        //     name: "Hello"
        // });


        // method - 3 by test
        // const h1Element = screen.getByText(/hello/i); 


        // method - 4 bt text
        const h1Element = screen.getByText("hello", {
            exact: false
        })

        // assert whether it is in the UI or not
        expect(h1Element).toBeInTheDocument();
    });

    // test('renders with name prop', () => {
    //     render(<Greet name={'Sanjiv'} />);
    //     const h1Element = screen.getByText("Hello Sanjiv")
    //     expect(h1Element).toBeInTheDocument();
    // })
});

