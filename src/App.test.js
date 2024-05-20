import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservation from './Components/Reservation';

test('Renders the BookingForm heading', () => {
    render(<Reservation />);
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
});

test('Ensures initial times list is empty', () => {
    const { container } = render(<Reservation />);
  
    // Query the input element by its class name
    const dropdown = container.querySelector('.dropdown-btn');

    // Assertion to check if the element is found and visible
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeVisible();

    // Simulate a button click
    fireEvent.click(dropdown);

    // Query the menu to make sure it's empty
    const menuItems = container.querySelectorAll('.menu-item');
    expect(menuItems.length).toBe(0);
});

test('Ensures weekday times list is correct', async () => {
    const { container } = render(<Reservation />);

    // Query all instances of the div with the class name "calendar-day"
    const calendarDays = container.querySelectorAll('.calendar-day');

    // Ensure there are calendar-day divs rendered and click one
    expect(calendarDays.length).toBe(42);
    fireEvent.click(calendarDays[30]);
  
    // Query the input element by its class name
    const dropdown = container.querySelector('.dropdown-btn');

    // Assertion to check if the element is found and visible
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeVisible();

    // Simulate a button click
    fireEvent.click(dropdown);

    // Query the menu to make sure it has 5 items
    await waitFor(() => {
        const menuItems = container.querySelectorAll('.menu-item');
        expect(menuItems.length).toBe(5);
    });

    // Checking item values
    const expectedValues = ['18:00', '19:00', '20:00', '21:00', '22:00'];
    const menuItems = container.querySelectorAll('.menu-item');

    menuItems.forEach((menuItem, index) => {
        const button = menuItem.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe(expectedValues[index]);
    });
});