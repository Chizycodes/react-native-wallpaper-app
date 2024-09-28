import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Categories from "../../components/categories/Categories";
import { apiCall } from "../../api";
import ImageGrid from "../../components/images/ImageGrid";
import { debounce } from "lodash";
import FiltersModal from "../../components/filters/FiltersModal";

let page = 1;

const HomeScreen = () => {
	const { top } = useSafeAreaInsets();
	const paddingTop = top > 0 ? top + 10 : 30;
	const [search, setSearch] = useState("");
	const [images, setImages] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const searchInputRef = useRef(null);
	const modalRef = useRef(null);

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async (params = { page: 1 }, append = false) => {
		let res = await apiCall(params);
		if (res?.success && res?.data?.hits) {
			if (append) {
				setImages([...images, ...res.data.hits]);
			} else {
				setImages(res.data.hits);
			}
		}
	};

	const openFiltersModal = () => {
		modalRef.current?.present();
	};

	const handleCloseFiltersModal = () => {
    modalRef.current?.dismiss();
  };

	const handleChangeCategory = (cat) => {
		setActiveCategory(cat);
		clearSearch();
		setImages([]);
		page = 1;
		let params = { page };
		if (cat) params.category = cat;
		fetchImages(params, false);
	};

	const handleSearch = (text) => {
		setSearch(text);
		page = 1;
		setImages([]);

		setActiveCategory(null);
		if (text.length > 2) {
			// Search for text
			fetchImages({ page, q: text }, false);
		}

		if (text == "") {
			// Reset result
			searchInputRef.current.clear();
			fetchImages({ page }, false);
		}
	};

	const clearSearch = () => {
		setSearch("");
		searchInputRef.current.clear();
		// handleSearch("");
	};

	const handleTextDebouce = useCallback(debounce(handleSearch, 400), []);

	return (
		<View style={[styles.container, { paddingTop }]}>
			<View style={styles.header}>
				<Pressable>
					<Text style={styles.title}>Pixels</Text>
				</Pressable>
				<Pressable onPress={openFiltersModal}>
					<FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
				</Pressable>
			</View>

			<ScrollView contentContainerStyle={{ gap: 15 }}>
				<View style={styles.searchBar}>
					<View style={styles.searchIcon}>
						<Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
					</View>
					<TextInput
						style={styles.searchInput}
						placeholder="Search for photos..."
						ref={searchInputRef}
						// value={search}
						onChangeText={handleTextDebouce}
					/>
					{search && (
						<Pressable style={styles.closeIcon} onPress={() => handleSearch("")}>
							<Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
						</Pressable>
					)}
				</View>

				{/* Categories */}
				<Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

				{/* Images */}
				<View>{images.length > 0 && <ImageGrid images={images} />}</View>
			</ScrollView>

			{/* FIlters modal */}
			<FiltersModal modalRef={modalRef} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
	},
	header: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: hp(4),
		fontWeight: theme.fontWeight.semibold,
		color: theme.colors.neutral(0.9),
	},
	searchBar: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		backgroundColor: theme.colors.white,
		padding: 6,
		paddingLeft: 10,
		borderRadius: theme.radius.lg,
	},
	searchIcon: {
		padding: 8,
	},
	searchInput: {
		flex: 1,
		borderRadius: theme.radius.sm,
		paddingVertical: 10,
		fontSize: hp(1.8),
	},
	closeIcon: {
		backgroundColor: theme.colors.neutral(0.1),
		padding: 8,
		borderRadius: theme.radius.sm,
	},
});

export default HomeScreen;
