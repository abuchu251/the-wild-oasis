import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../ui/ButtonIcon";
import { useDarkMode } from "../context/darkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggleDarkMode}>
          {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
