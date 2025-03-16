import styles from "./Sign.module.scss";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRegUser } from "./hooks/useRegUser";
import { useAuthUser } from "./hooks/useAuthUser";
import { SignUp } from "../../components/layouts/auth/SignUp/SignUp";
import { SignIn } from "../../components/layouts/auth/SignIn/SignIn";
import { ContentPage } from "../../components/ui/contentPage/ContentPage";

const tabs = [
  { id: 1, name: "register", title: "Регистрация", component: SignUp },
  { id: 2, name: "login", title: "Авторизация", component: SignIn },
] as const;

export const Sign = () => {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [lineStyle, setLineStyle] = useState({ width: "0px", left: "0px" });
  const lineStyleRef = useRef({ width: "0px", left: "0px" });
  const tabRefs = useRef(
    new Map<"register" | "login", HTMLButtonElement | null>()
  );
  const reg = useRegUser();
  const auth = useAuthUser();

  const activeHook = activeTab === "register" ? reg : auth;

  const ActiveComponent = useMemo(
    () => tabs.find((tab) => tab.name === activeTab)?.component,
    [activeTab]
  );

  useEffect(() => {
    const activeButton = tabRefs.current.get(activeTab);
    if (activeButton) {
      requestAnimationFrame(() => {
        const newStyle = {
          width: `${activeButton.offsetWidth}px`,
          left: `${activeButton.offsetLeft}px`,
        };
        lineStyleRef.current = newStyle;
        setLineStyle(newStyle);
      });
    }
  }, [activeTab]);

  const setTabRef = useCallback(
    (name: "register" | "login", el: HTMLButtonElement | null) => {
      if (el) tabRefs.current.set(name, el);
    },
    []
  );

  return (
    <ContentPage className={styles.container}>
      <h2>АртТех Production</h2>
      <form
        onSubmit={
          activeTab === "register" ? reg.submitRegUser : auth.submitAuthUser
        }
        className={styles.formContainer}
      >
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              onClick={() => setActiveTab(tab.name)}
              key={tab.id}
              ref={(el) => setTabRef(tab.name, el)}
              type="button"
              className={activeTab === tab.name ? styles.active : ""}
            >
              {tab.title}
            </button>
          ))}

          <div className={styles.underline} style={lineStyle} />
        </div>
        {ActiveComponent && (
          <ActiveComponent
            error={activeHook.error}
            loading={activeHook.loading}
            activateTab={setActiveTab}
          />
        )}
      </form>
    </ContentPage>
  );
};
