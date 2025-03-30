import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} aria-disabled={isLoggingOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
