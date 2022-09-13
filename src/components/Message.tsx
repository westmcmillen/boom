import React, { ReactElement } from "react";

import Component from "../components/Component";
import Container from "../layout/Container";

type Props = {
  username: string;
  message: string;
  origin: "user" | "participant";
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
  conditional: {
    user: string;
    participant: string;
  };
};

const styles = {} as Styles;

styles.static = "flex flex-col w-3/4 h-max p-2 border  rounded";
styles.conditional = {
  user: "bg-violet-100 border border-violet-400",
  participant: "self-end bg-neutral-100 border-neutral-400",
};

export default function Message({ origin, username, message, className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Message">
      <div className={`${styles.static} ${styles.dynamic} ${origin === "user" ? styles.conditional.user : styles.conditional.participant}`}>
        <span className="text-xs font-bold">{username}</span>
        <span className="text-xs">{message}</span>
      </div>
    </Component>
  );
}
