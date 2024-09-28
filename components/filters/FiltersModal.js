import { Text, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { capitalize, hp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import CommonFiltersRow from "./views/CommonFiltersRow";
import OrientationView from "./views/OrientationView";
import TypeView from "./views/TypeView";
import ColorsView from "./views/ColorsView";
import SectionView from "./views/SectionView";

const FiltersModal = ({ modalRef }) => {
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
				<View style={styles.content}>
					<Text style={styles.filterText}>Filters</Text>
					{Object.keys(sections).map((sectionName, index) => {
						let sectionView = sections[sectionName];
						let title = capitalize(sectionName);
						return (
							<View key={sectionName}>
								<SectionView title={title} content={sectionView({})} />
							</View>
						);
					})}
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
};

const sections = {
	order: (props) => <CommonFiltersRow {...props} />,
	orientation: (props) => <CommonFiltersRow {...props} />,
	type: (props) => <CommonFiltersRow {...props} />,
	colors: (props) => <CommonFiltersRow {...props} />,
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
		// flex: 1,
		width: "100%",
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
});

export default FiltersModal;
