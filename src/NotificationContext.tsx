import React from "react";
import type { NotificationRef } from "./types";

/**
 * Context which holds the notification prop for a screen.
 */
const NotificationContext = React.createContext<NotificationRef | undefined>(
  undefined
);

export default NotificationContext;
