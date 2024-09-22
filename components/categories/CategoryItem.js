import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp } from "../../helpers/common";
import Animated, { FadeInRight } from "react-native-reanimated";

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
	const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
	const backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white;

	return (
		<Animated.View
			entering={FadeInRight.delay(index * 200)
				.duration(1000)
				.springify()
				.damping(14)}
		>
			<Pressable
				onPress={() => handleChangeCategory(isActive ? null : title)}
				style={[styles.category, { backgroundColor }]}
			>
				<Text style={[styles.title, { color }]}>{title}</Text>
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	category: {
		padding: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		borderRadius: theme.radius.lg,
		borderCurve: "continuous",
	},
	title: {
		fontSize: hp(1.8),
		fontWeight: theme.fontWeight.medium,
	},
});

export default CategoryItem;
