import { useEffect, useState } from "react";

const LS_PREFIX = "temtools:notifications:v1:";

export default function LocalstorageNotification({
  name,
  ToggleComponent,
  children
}: {
  name: string;
  ToggleComponent?: (props: { onClick: () => void }) => JSX.Element;
  children: JSX.Element;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    try {
      const existing = localStorage.getItem(`${LS_PREFIX}${name}`);
      setVisible(JSON.parse(existing || '"true"') === "true");
    } catch {
      // Do nothing
    }
  }, []);
  // tslint:disable-next-line:strict-type-predicates
  if (typeof window === "undefined") return null;
  return visible ? (
    <div
      onClick={() => {
        setVisible(false);
        localStorage.setItem(`${LS_PREFIX}${name}`, JSON.stringify("false"));
      }}
    >
      {children}
    </div>
  ) : ToggleComponent ? (
    <ToggleComponent
      onClick={() => {
        setVisible(true);
        localStorage.setItem(`${LS_PREFIX}${name}`, JSON.stringify("true"));
      }}
    />
  ) : null;
}
