import { useDispatch } from "react-redux";
import { User } from "../../../../../interfaces/user";
import { SubmitButton } from "../../../../ui/buttons/submitButton/SubmitButton";
import styles from "./DetectedProfile.module.scss";
import { AppDispatch } from "../../../../../store";
import { clearUserData } from "../../../../../store/slices/user";
import { UserLogo } from "../../../user/UserLogo/UserLogo";
import { STATUS_VALUES } from "../../../../../config/constants";
import { Status } from "../../../../ui/status/Status";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
}

interface Status {
  id: number;
  text: string;
  color: "red" | "green";
  status: string;
}

const userStatus = (): Status[] => [
  {
    id: 1,
    text: "Подтвержден",
    color: "green",
    status: STATUS_VALUES.APPROVED,
  },
  {
    id: 3,
    text: "Не подтвержден",
    color: "red",
    status: STATUS_VALUES.PENDING,
  },
];

export const DetectedProfile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentStatus = userStatus().find((s) => s.status === user.status);

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
        <Status text={currentStatus?.text} color={currentStatus?.color} />
      </div>

      <SubmitButton text="Войти" event={() => navigate("/")} />
      <button onClick={() => dispatch(clearUserData())} className={styles.exit}>
        Войти в другой аккаунт
      </button>
    </div>
  );
};
