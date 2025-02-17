import styled from "styled-components";
import Logout from "../features/authentication/Logout.jsx";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";

const StytedHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  justify-content: flex-end;
  gap: 2.4rem;
  align-items: center;
`;

const Header = () => {
  return (
    <StytedHeader>
      <UserAvatar />
      <HeaderMenu />
    </StytedHeader>
  );
};

export default Header;
