import { Text, StyleSheet, View, Pressable } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { capitalize, hp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import CommonFiltersRow, { ColorsFiltersRow } from "./views/CommonFiltersRow";
import SectionView from "./views/SectionView";
import { data } from "../../constants/data";
import { ScrollView } from "react-native-gesture-handler";

const FiltersModal = ({ modalRef, onClose, onApply, onReset, filters, setFilters }) => {
	const snapPoints = useMemo(() => ["75%"], []);

	return (
		<BottomSheetModal
			ref={modalRef}
			index={0}
			snapPoints={snapPoints}
			enablePanDownToClose
			backdropComponent={CustomBackdrop}
			// onChange={handleSheetChanges}
		>
			<BottomSheetView style={styles.contentContainer}>
				<ScrollView>
					<View style={styles.content}>
						<Text style={styles.filterText}>Filters</Text>
						{Object.keys(sections).map((sectionName, index) => {
							let sectionView = sections[sectionName];
							let sectionData = data.filters[sectionName];
							let title = capitalize(sectionName);
							return (
								<Animated.View
									key={sectionName}
									entering={FadeInDown.delay(index * 100 + 100)
										.springify()
										.damping(11)}
								>
									<SectionView
										title={title}
										content={sectionView({ data: sectionData, filters, setFilters, filterName: sectionName })}
									/>
								</Animated.View>
							);
						})}

						{/* actions */}
						<Animated.View style={styles.buttons} entering={FadeInDown.delay(500).springify().damping(11)}>
							<Pressable style={styles.resetButton} onPress={onReset}>
								<Text style={[styles.buttonText, { color: theme.colors.neutral(0.9) }]}>Reset</Text>
							</Pressable>

							<Pressable style={styles.applyButton} onPress={onApply}>
								<Text style={[styles.buttonText, { color: theme.colors.white }]}>Apply</Text>
							</Pressable>
						</Animated.View>
					</View>
				</ScrollView>
			</BottomSheetView>
		</BottomSheetModal>
	);
};

const sections = {
	order: (props) => <CommonFiltersRow {...props} />,
	orientation: (props) => <CommonFiltersRow {...props} />,
	type: (props) => <CommonFiltersRow {...props} />,
	colors: (props) => <ColorsFiltersRow {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
	const containerAnimatedStyle = useAnimatedStyle(() => {
		let opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP);

		return {
			opacity,
		};
	});

	const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay, containerAnimatedStyle];

	return (
		<Animated.View style={containerStyle}>
			<BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	content: {
		flex: 1,
		// width: "100%",
		gap: 15,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	filterText: {
		fontSize: hp(4),
		fontWeight: theme.fontWeight.semibold,
		color: theme.colors.neutral(0.8),
		marginBottom: 5,
	},
	buttons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	applyButton: {
		flex: 1,
		backgroundColor: theme.colors.neutral(0.8),
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.md,
		borderCurve: "continuous",
	},
	resetButton: {
		flex: 1,
		backgroundColor: theme.colors.neutral(0.03),
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.md,
		borderCurve: "continuous",
		borderWidth: 2,
		borderColor: theme.colors.grayBG,
	},
	buttonText: {
		fontSize: hp(2.2),
	},
});

export default FiltersModal;
