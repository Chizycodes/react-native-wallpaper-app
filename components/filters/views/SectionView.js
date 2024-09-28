import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { hp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";

const SectionView = ({ title, content }) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.sectionContent}>{content}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		gap: 8,
	},
	sectionTitle: {
		fontSize: hp(2.4),
		fontWeight: theme.fontWeight.medium,
		color: theme.colors.neutral(0.8),
	},
});

export default SectionView;
