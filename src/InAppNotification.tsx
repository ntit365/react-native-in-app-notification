import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  memo,
} from "react";
import { Animated, ImageSourcePropType, StyleSheet } from "react-native";
import NotificationBody from "./NotificationBody";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import type {
  NotificationProps,
  NotificationRef,
  NotificationState,
} from "./types";
import NotificationContext from "./NotificationContext";

const InAppNotificationComponent = forwardRef<
  NotificationRef,
  NotificationProps
>(
  (
    {
      height = 80,
      topOffset = 0,
      animationDuration,
      closeInterval,
      content,
      children,
      backgroundColor,
      contentContainerStyle,
    },
    ref
  ) => {
    const animateValue = useRef(new Animated.Value(0)).current;
    const heightOffset = isIphoneX() ? getStatusBarHeight() + 20 : 20;
    const [onNoticationPress, setOnNotificationPress] =
      useState<() => void | undefined>();
    const [title, setTitle] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [vibrate, setVibrate] = useState<boolean>();
    const [isOpen, setIsOpen] = useState<boolean>();
    const [icon, setIcon] = useState<ImageSourcePropType | undefined>(
      undefined
    );
    const currentNotificationInterval = useRef<any>();
    const tranlsateValue = -height - heightOffset + -topOffset;

    const closeNotification = useCallback(
      (callback: Animated.EndCallback | undefined) => {
        setIsOpen(false);
        Animated.timing(animateValue, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(callback);
      },
      [animateValue, animationDuration]
    );

    const openNotification = useCallback(
      (callback: Animated.EndCallback | undefined) => {
        setIsOpen(true);
        Animated.timing(animateValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(callback);
      },
      [animateValue, animationDuration]
    );

    const handleShow = useCallback(
      (data: NotificationState) => {
        clearTimeout(currentNotificationInterval.current);

        const showNotificationWithStateChanges = () => {
          setOnNotificationPress(() => data.onPress);
          setTitle(data.title);
          setMessage(data.message);
          setVibrate(data.vibrate);
          setIcon(data.icon);
          openNotification(() => {
            currentNotificationInterval.current = setTimeout(() => {
              closeNotification(() => {
                resetData();
              });
            }, closeInterval);
          });
        };
        if (isOpen) {
          closeNotification(showNotificationWithStateChanges);
        } else {
          showNotificationWithStateChanges();
        }
      },
      [isOpen, closeNotification, openNotification, closeInterval]
    );

    const resetData = () => {
      setOnNotificationPress(undefined);
      setTitle("");
      setMessage("");
      setIcon(undefined);
      setVibrate(true);
    };

    React.useImperativeHandle(ref, () => ({
      show: handleShow,
    }));

    const contextVariables = useMemo(
      () => ({
        show: handleShow,
      }),
      [handleShow]
    );

    const translateY = animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [tranlsateValue, 0],
    });

    return (
      <NotificationContext.Provider value={contextVariables}>
        {typeof children === "function" ? (children as Function)() : children}
        <Animated.View
          style={[
            styles.notification,
            {
              height: height,
              transform: [{ translateY }],
            },
          ]}
        >
          <NotificationBody
            isOpen={isOpen}
            title={title}
            message={message}
            vibrate={vibrate}
            content={content}
            onColse={closeNotification}
            icon={icon}
            onPress={onNoticationPress}
            style={contentContainerStyle}
            backgroundColor={backgroundColor}
          />
        </Animated.View>
      </NotificationContext.Provider>
    );
  }
);

InAppNotificationComponent.defaultProps = {
  content: undefined,
  height: 80,
  topOffset: 0,
  backgroundColor: "rgba(120, 120, 120, 0.9)",
  closeInterval: 4000,
  animationDuration: 200,
  contentContainerStyle: undefined,
};

const InAppNotification = memo(InAppNotificationComponent);

export default InAppNotification;

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    left: 10,
    right: 10,
    top: isIphoneX() ? getStatusBarHeight() + 20 : 20,
  },
});
