import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { capitalize } from "../../../helpers/common";
import { theme } from "../../../constants/theme";

const CommonFiltersRow = ({ data, filters, setFilters, filterName }) => {
	const onSelect = (item) => {
		setFilters((prevFilters) => ({ ...prevFilters, [filterName]: item }));
	};

	return (
		<View style={styles.flexRowWrap}>
			{data &&
				data.map((item, index) => {
					let isActive = filters && filters[filterName] === item;
					let backgroundColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white;
					let color = isActive ? theme.colors.white : theme.colors.neutral(0.7);

					return (
						<Pressable onPress={() => onSelect(item)} key={item} style={[styles.outlinedButton, { backgroundColor }]}>
							<Text style={[styles.outlineButtonText, { color }]}>{capitalize(item)}</Text>
						</Pressable>
					);
				})}
		</View>
	);
};

export const ColorsFiltersRow = ({ data, filters, setFilters, filterName }) => {
	const onSelect = (item) => {
		setFilters((prevFilters) => ({ ...prevFilters, [filterName]: item }));
	};

	return (
		<View style={styles.flexRowWrap}>
			{data &&
				data.map((item, index) => {
					let isActive = filters && filters[filterName] === item;
					let borderColor = isActive ? theme.colors.neutral(0.4) : theme.colors.white;

					return (
						<Pressable onPress={() => onSelect(item)} key={item}>
							<View style={[styles.colorWrapper, { borderColor }]}>
								<View style={[styles.color, { backgroundColor: item }]} />
							</View>
						</Pressable>
					);
				})}
		</View>
	);
};

const styles = StyleSheet.create({
	flexRowWrap: {
		gap: 10,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	outlinedButton: {
		padding: 8,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		borderRadius: theme.radius.xs,
		borderCurve: "continuous",
	},
	color: {
		height: 30,
		width: 40,
		borderRadius: theme.radius.sm - 3,
		borderCurve: "continuous",
	},
	colorWrapper: {
		padding: 3,
		borderRadius: theme.radius.sm,
		borderWidth: 2,
		borderCurve: "continuous",
	},
});

export default CommonFiltersRow;
