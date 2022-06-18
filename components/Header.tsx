import React from "react";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  direction: string;
}

const Header: FC<HeaderProps> = ({ direction }) => {
  return (
    <>
      <Text>Header</Text>
      <Text>Direction: {direction}</Text>
    </>
  );
};

export default Header;
