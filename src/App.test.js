import { render, screen } from "@testing-library/react";
import Reservation from './Components/Reservation';

test('Renders the BookingForm heading', () => {
    render(<Reservation />);
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
})