import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';
import Auth from '../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Header = ({ onDateChange }) => { // Receive the callback as a prop
  const [startDate, setStartDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date); // Call the callback with the selected date
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <p className="m-0">Your News on the World Wide Web.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().authenticatedPerson.author}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
              <Link to="/" className="btn btn-lg btn-light m-2">
                Home
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={toggleCalendar}>
                Search by Date
              </button>
              {isCalendarOpen && (
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange} // Handle date change
                  inline
                />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
