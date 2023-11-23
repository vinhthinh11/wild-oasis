import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiMiniCalendarDays,
  HiCog6Tooth,
  HiOutlineUser,
  HiMiniBuildingOffice,
} from 'react-icons/hi2';

import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyleNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-400);
  }
`;
function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyleNavLink to="/dashboard">
            <HiHome />
            <span>Home Page</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/cabins">
            <HiMiniBuildingOffice />
            <span>Cabins</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/bookings">
            <HiMiniCalendarDays />
            <span>Bookings</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/account">
            <HiOutlineUser />
            <span>Account</span>
          </StyleNavLink>
        </li>{' '}
        <li>
          <StyleNavLink to="/settings">
            <HiCog6Tooth />
            <span>Setting</span>
          </StyleNavLink>
        </li>
      </NavList>
    </nav>
  );
}
export default MainNav;