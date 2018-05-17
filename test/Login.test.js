import React from 'react';
import Login from './../src/client/components/Login';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import AuthService from './../src/client/components/AuthService';
import { shallow, mount } from 'enzyme';


describe('Login Component', () => {

 // make our assertion and what we expect to happen
 it('should render without throwing an error', () => {
   expect(shallow(<Router><Login /></Router>).exists(<form className='login'></form>)).toBe(true)
 })

 it('renders a email input', () => {
  expect(mount(<Router><Login /></Router>).find('#loginEmail').length).toEqual(1)
 })

 it('renders a password input', () => {
  expect(mount(<Router><Login /></Router>).find('#loginPassword').length).toEqual(1)
 })
})
