import React from "react";
import { connect } from "react-redux";
import { Overlay } from "react-native-elements";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions
} from "react-native";
import { setFilter, setPage } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    setFilter: filter => {
      filter = filter === "Alle" ? null : filter;
      dispatch(setFilter({ filter }));
      dispatch(setPage({ change: 0 }));
    }
  };
}

function mapStateToProps(state) {
  return {
    filter: state.filter.filter
  };
}

/* List of filtercategories: */
const TYPE = [
  { filter: "Alle", image: require("./../assets/Alle.jpg") },
  { filter: "Rødvin", image: require("./../assets/Rødvin.jpg") },
  { filter: "Hvitvin", image: require("./../assets/Hvitvin.jpg") },
  { filter: "Musserende", image: require("./../assets/Musserende.jpg") },
  { filter: "Øl", image: require("./../assets/Øl.jpg") },
  { filter: "Sprit", image: require("./../assets/Sprit.jpg") }
];

/* Overlay with filter choices  */
function FilterOverlay(props) {

  /* When filter is pressed */
  handleTypePress = type => {
    filter = type;
    props.setFilter(filter);
    props.setOpen(false);
  };

  return (
    <Overlay
      isVisible={props.isOpen}
      onBackdropPress={() => {
        props.setOpen(false);
      }}
      height="auto"
      width={Dimensions.get("window").width}
      overlayStyle={{ padding: 0, marginBottom: 0 }}
    >
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {TYPE.map((el, index) => {
          return (
            <TouchableOpacity
              style={{ width: Dimensions.get("window").width * 0.5 }}
              key={index}
              onPress={() => {
                handleTypePress(el.filter);
              }}
            >
              <ImageBackground source={el.image} style={{ height: 100 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "800",
                      fontSize: 20
                    }}
                  >
                    {el.filter.toUpperCase()}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    </Overlay>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterOverlay);
