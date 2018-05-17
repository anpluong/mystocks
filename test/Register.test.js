import React from 'react';
import Register from './../src/client/components/Register';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import AuthService from './../src/client/components/AuthService';
import { shallow, mount } from 'enzyme';


describe('Register Component', () => {

 // make our assertion and what we expect to happen
 it('should render without throwing an error', () => {
   expect(shallow(<Router><Register /></Router>).exists(<form className='login'></form>)).toBe(true)
 })

 it('renders a email input', () => {
  expect(mount(<Router><Register /></Router>).find('#registerEmail').length).toEqual(1)
 })

 it('renders a password input', () => {
  expect(mount(<Router><Register /></Router>).find('#registerPassword').length).toEqual(1)
 })

 it('renders a password input', () => {
  expect(mount(<Router><Register /></Router>).find('#registerPassconf').length).toEqual(1)
 })
})
