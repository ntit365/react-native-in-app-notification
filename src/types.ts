import React from "react";
import type { ViewStyle, Animated, ImageSourcePropType } from "react-native";

export interface NotificationProps {
  closeInterval?: number;
  animationDuration?: number;
  height?: number;
  topOffset?: number;
  backgroundColor?: string;
  content?: (
    title: string | undefined,
    message: string | undefined
  ) => React.ReactNode;
  contentContainerStyle?: ViewStyle;
  children: (() => React.ReactNode) | React.ReactNode[] | React.ReactNode;
}

export type NotificationState = {
  title: string;
  message: string;
  onPress?: () => void;
  vibrate?: true | boolean;
  icon?: ImageSourcePropType | undefined;
};

export interface NotificationBodyProps {
  onColse?: (callback?: Animated.EndCallback) => void;
  onPress?: () => void | undefined;
  title?: string | undefined;
  message?: string | undefined;
  content?: (
    title: string | undefined,
    message: string | undefined
  ) => React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  isOpen: boolean | undefined;
  vibrate: boolean | undefined;
  icon?: ImageSourcePropType | undefined;
}

export type NotificationRef = {
  show(data: NotificationState): void;
};
