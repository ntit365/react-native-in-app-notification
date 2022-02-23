import React from "react";
import NotificationContext from "./NotificationContext";
import { NotificationRef } from "./types";

export default function useInAppNotification() {
  const notification = React.useContext(NotificationContext);

  if (notification === undefined) {
    throw new Error(
      "Couldn't find a notification object. Is your component inside InAppNotification?"
    );
  }

  return notification as unknown as NotificationRef;
}
