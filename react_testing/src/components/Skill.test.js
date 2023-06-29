// import { render, screen, logRoles } from "@testing-library/react";
// import Skill from "./Skill";



// describe('Skill', () => {
//     const skillsList = [
//         { id: 1, name: 'plumbing' },
//         { id: 2, name: 'wiring' },
//         { id: 3, name: 'painting' },
//     ]
//     test('renders correctly', () => {
//       const view =  render(<Skill skills={skillsList} />);
//       logRoles(view.container); // see what kind roles are present in it
//         const h2Elem = screen.getByRole('heading', {
//             level: 2
//         })
//         expect(h2Elem).toBeInTheDocument();

//         const itemsElem = screen.getByRole('list')
//         // const i = screen.g
//         expect(itemsElem).toBeInTheDocument();


//     })

//     test('renders all list items', () => {
//         render(<Skill skills={skillsList} />);
//         // Note: use 'AllBy' when there is more than one item that returns in list
//         const listItems = screen.getAllByRole('listitem')
//         expect(listItems).toHaveLength(3);
//     })

//     test('renders all list items in proper order', () => {
//         render(<Skill skills={skillsList} />);

//         const orderItems = screen.getAllByRole('listitem');
//         expect(orderItems[0]).toHaveTextContent('plumbing');
//         expect(orderItems[2]).toHaveTextContent('painting');
//     })

//     test('renders login button', () => {
//         render(<Skill skills={skillsList} />);
//         const buttonElement = screen.getByRole('button', {
//             name: 'login'
//         });
//         expect(buttonElement).toBeInTheDocument();
//     });

//     test('start working button is not rendered', () => {
//         render(<Skill skills={skillsList} />);
//         const startWorkingButton = screen.queryByRole('button', {
//             name: 'start working'
//         });
//         expect(startWorkingButton).not.toBeInTheDocument();

//     });

//     // findBy ==> elements visible only under 1 sec  or 1000 sec or events ==> always comes with async and awit
//     test('start working button is rendered later', async () => {
//         render(<Skill skills={skillsList} />);
//         const startWorkingButton = await screen.findByRole('button', {
//             name: 'start working'
//         }, {timeout: 2000});  // wait upto 2 sec or 2000
//         expect(startWorkingButton).toBeInTheDocument();
//     });
// })
