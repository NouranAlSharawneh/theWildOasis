import styled from "styled-components";
import logoImg_light from "/img/logo-light.png";
import logoImg_dark from "/img/logo-dark.png";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? logoImg_dark : logoImg_light;
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
