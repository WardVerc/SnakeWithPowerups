import React from "react";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  direction: string;
  score: number;
}

const Header: FC<HeaderProps> = ({ direction, score }) => {
  return (
    <>
      <Text>Score: {score}</Text>
    </>
  );
};

export default Header;
