import { useDispatch } from "react-redux";
import { User } from "../../../../../interfaces/user";
import { SubmitButton } from "../../../../ui/buttons/submit/SubmitButton";
import styles from "./DetectedProfile.module.scss";
import { AppDispatch } from "../../../../../store";
import { clearUserData } from "../../../../../store/slices/user";
import { UserLogo } from "../../../user/logo/UserLogo";
import { Status } from "../../../../ui/status/Status";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
}

export const DetectedProfile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      <div className={styles.profileCard}>
        <div className={styles.info}>
          <UserLogo user={user} />

          <div>
            <h3>{user.login}</h3>
            <p>{user.role}</p>
          </div>
        </div>
        <Status user={user} />
      </div>

      <SubmitButton text="Войти" event={() => navigate("/")} />
      <button onClick={() => dispatch(clearUserData())} className={styles.exit}>
        Войти в другой аккаунт
      </button>
    </div>
  );
};
