import React, { createContext, useState, useContext, useEffect } from 'react';
import User from '../models/User';
import UserRole from '../constants/UserRole';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    addUserSeedings();
  }, []);

  const addUserSeedings = () => {
    const users = [
      new User("John", "Doe", "john.doe@example.com", "password123", "+1234567890", "123 Elm Street", "1990-01-01", null, new Date("2024-01-01"), false, "USER"),
        new User("Jane", "Smith", "jane.smith@example.com", "password456", "+0987654321", "456 Oak Avenue", "1985-05-15", null, new Date("2024-02-01"), false, "USER"),
        new User("Emily", "Johnson", "emily.johnson@example.com", "password789", "+1122334455", "789 Pine Road", "1992-07-20", null, new Date("2024-03-01"), false, "USER"),
        new User("Michael", "Williams", "michael.williams@example.com", "password012", "+2233445566", "101 Maple Street", "1988-12-25", null, new Date("2024-04-01"), false, "USER"),
        new User("Sarah", "Brown", "sarah.brown@example.com", "password345", "+3344556677", "202 Birch Lane", "1995-10-10", null, new Date("2024-05-01"), false, "USER"),
        new User("David", "Jones", "david.jones@example.com", "password678", "+4455667788", "303 Cedar Avenue", "1982-03-30", null, new Date("2024-06-01"), false, "USER"),
        new User("Laura", "Garcia", "laura.garcia@example.com", "password901", "+5566778899", "404 Spruce Drive", "1998-08-14", null, new Date("2024-07-01"), false, "USER"),
        new User("Robert", "Martinez", "robert.martinez@example.com", "password234", "+6677889900", "505 Fir Court", "1986-11-18", null, new Date("2024-08-01"), false, "USER"),
        new User("Linda", "Hernandez", "linda.hernandez@example.com", "password567", "+7788990011", "606 Willow Way", "1994-04-22", null, new Date("2024-09-01"), false, "USER"),
        new User("James", "Wilson", "james.wilson@example.com", "password890", "+8899001122", "707 Ash Boulevard", "1991-02-28", null, new Date("2024-10-01"), false, "USER"),
        new User("Patricia", "Lopez", "patricia.lopez@example.com", "password123", "+9900112233", "808 Cherry Lane", "1987-06-12", null, new Date("2024-11-01"), false, "USER"),
        new User("Charles", "Anderson", "charles.anderson@example.com", "password456", "+0011223344", "909 Maple Court", "1984-09-25", null, new Date("2024-12-01"), false, "USER"),
        new User("Jessica", "Thomas", "jessica.thomas@example.com", "password789", "+1122334455", "1010 Oak Lane", "1996-01-10", null, new Date("2024-01-15"), false, "USER"),
        new User("Daniel", "Taylor", "daniel.taylor@example.com", "password012", "+2233445566", "1111 Pine Avenue", "1989-07-05", null, new Date("2024-02-15"), false, "USER"),
        new User("Mary", "Moore", "mary.moore@example.com", "password345", "+3344556677", "1212 Birch Street", "1993-11-20", null, new Date("2024-03-15"), false, "USER"),
        new User("William", "Jackson", "william.jackson@example.com", "password678", "+4455667788", "1313 Cedar Lane", "1981-04-14", null, new Date("2024-04-15"), false, "USER"),
        new User("Elizabeth", "White", "elizabeth.white@example.com", "password901", "+5566778899", "1414 Spruce Court", "1997-10-01", null, new Date("2024-05-15"), true, "ADMIN"),
        new User("Christopher", "Harris", "christopher.harris@example.com", "password234", "+6677889900", "1515 Fir Lane", "1990-02-22", null, new Date("2024-06-15"), false, "USER"),
        new User("Susan", "Clark", "susan.clark@example.com", "password567", "+7788990011", "1616 Willow Street", "1983-08-30", null, new Date("2024-07-15"), false, "USER"),
        new User("Andrew", "Lewis", "andrew.lewis@example.com", "password890", "+8899001122", "1717 Ash Lane", "1994-12-05", null, new Date("2024-08-15"), false, "USER"),
        new User("Nancy", "Walker", "nancy.walker@example.com", "password123", "+9900112233", "1818 Cherry Court", "1987-05-18", null, new Date("2024-09-15"), false, "USER"),
        new User("Brian", "Hall", "brian.hall@example.com", "password456", "+0011223344", "1919 Maple Lane", "1995-03-22", null, new Date("2024-10-15"), false, "USER")
    ];

    setUsers(prevUsers => [...prevUsers, ...users]);
  };

  const Post = (user) => {
    const newUser = new User(user.Name, user.Surname, user.Email, user.Password, user.Phone, user.Address, user.BirthDate,
    user.ProfilImage, new Date(), false, UserRole.USER)
    setUsers(prevUsers => [...prevUsers, newUser]);
    console.log(users)
  };

  const login = (user) => {
    
  };

  const logout = () => {
    
  };
  
  const GetAllUsers = () =>
  {
    return users;
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, Post, GetAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
