import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { data } from "../../constants/data";
import CategoryItem from "./CategoryItem";
import { wp } from "../../helpers/common";

const Categories = ({ activeCategory, handleChangeCategory }) => {
	return (
		<FlatList
			horizontal
			contentContainerStyle={styles.flatlistContainer}
			showsHorizontalScrollIndicator={false}
			data={data.categories}
			keyExtractor={(item) => item}
			renderItem={({ item, index }) => (
				<CategoryItem
					title={item}
					index={index}
					isActive={activeCategory === item}
					handleChangeCategory={handleChangeCategory}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	flatlistContainer: {
		paddingHorizontal: wp(4),
		gap: 8,
	},
});

export default Categories;
