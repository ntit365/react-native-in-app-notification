import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import type { NotificationBodyProps } from "./types";

const NotificationBody: React.FC<NotificationBodyProps> = ({
  onColse,
  onPress,
  content,
  isOpen,
  vibrate,
  title,
  message,
  style,
  backgroundColor,
  icon,
}) => {
  const onSwipeUp = () => {
    if (typeof onColse !== "undefined") {
      onColse();
    }
  };

  useEffect(() => {
    if (vibrate && isOpen) {
      Vibration.vibrate();
    }
  }, [isOpen, vibrate]);

  const renderContent = () => {
    return content !== undefined ? (
      content(title, message)
    ) : (
      <>
        {icon && (
          <View style={styles.imageView}>
            <Image source={icon} style={styles.image} />
          </View>
        )}
        <View
          style={[styles.textContainer, !icon && styles.textContainerNoMargin]}
        >
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.message}>
            {message}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={[styles.root, style, { backgroundColor: backgroundColor }]}>
      <GestureRecognizer style={styles.container} onSwipeUp={onSwipeUp}>
        <TouchableOpacity
          activeOpacity={0.3}
          style={[styles.content]}
          onPress={onPress}
        >
          {renderContent()}
        </TouchableOpacity>
        <View style={styles.footer} />
      </GestureRecognizer>
    </View>
  );
};

export default NotificationBody;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6e6e6e",
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imageView: {
    width: 48,
    height: 48,
    overflow: "hidden",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: "cover",
  },
  textContainer: {
    alignSelf: "center",
    marginLeft: 20,
    flex: 1,
  },
  textContainerNoMargin: {
    marginLeft: 0,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
  },
  message: {
    color: "#FFF",
    marginTop: 5,
  },
  footer: {
    backgroundColor: "#dedede",
    borderRadius: 5,
    alignSelf: "center",
    height: 5,
    width: 35,
    margin: 5,
  },
});
