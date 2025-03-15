import { useState, useRef, useEffect } from "react";
import { ContentPage } from "../../components/ui/contentPage/ContentPage";
import { useRegUser } from "./hooks/useRegUser";
import styles from "./Sign.module.scss";
import { SignUp } from "../../components/layouts/auth/SignUp/SignUp";
import { SignIn } from "../../components/layouts/auth/SignIn/SignIn";

const tabs: {
  id: number;
  name: "register" | "login";
  title: string;
  component: React.FC<{
    error: string | null;
    loading: boolean;
    activateTab: (name: "register" | "login") => void;
  }>;
}[] = [
  {
    id: 1,
    name: "register",
    title: "Регистрация",
    component: SignUp,
  },
  {
    id: 2,
    name: "login",
    title: "Авторизация",
    component: SignIn,
  },
];

export const Sign = () => {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [lineStyle, setLineStyle] = useState({ width: "0px", left: "0px" });
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { submitRegUser, error, loading } = useRegUser();

  useEffect(() => {
    const activeButton = tabRefs.current[activeTab];
    if (activeButton) {
      setLineStyle({
        width: `${activeButton.offsetWidth}px`,
        left: `${activeButton.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  const ActiveComponent = tabs.find((tab) => tab.name === activeTab)?.component;

  const activateTab = (name: "register" | "login") => {
    setActiveTab(name);
  };

  return (
    <ContentPage className={styles.container}>
      <h2>АртТех Production</h2>
      <form onSubmit={submitRegUser} className={styles.formContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.name] = el;
              }}
              className={activeTab === tab.name ? styles.active : ""}
              onClick={() => activateTab(tab.name)}
            >
              {tab.title}
            </button>
          ))}

          <div className={styles.underline} style={lineStyle} />
        </div>
        {ActiveComponent && (
          <ActiveComponent
            error={error}
            loading={loading}
            activateTab={activateTab}
          />
        )}
      </form>
    </ContentPage>
  );
};
