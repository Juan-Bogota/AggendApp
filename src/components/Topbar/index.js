import { TopbarContainer, TopbarTitle, BackButtonTopbar } from "./styles";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
import { useHistory } from "react-router-dom";
import { Button } from "../Button";

export const Topbar = ({ isBackVisible = false, title, onPress }) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  }
  return (
    <TopbarContainer>
      {isBackVisible && (
        <BackButtonTopbar onClick={onPress}>
          <FaAngleLeft />
        </BackButtonTopbar>
      )}
      {!isBackVisible && <div></div>}
      <TopbarTitle>
        <h4>{title}</h4>
      </TopbarTitle>
      <Button onPress={handleLogout} text="Cerrar Sesion" bgColor="#00FFA4" />
    </TopbarContainer>
  );
};
