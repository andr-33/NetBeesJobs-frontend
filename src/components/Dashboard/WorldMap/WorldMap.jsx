import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Box, Typography, Tooltip } from "@mui/material";

const DATA_TEST = {
    Colombia: 120,
    Mexico: 85,
    USA: 200,
    Spain: 95,
    Argentina: 50,
    Brazil: 70,
};

const WorldMap = () => {  
  return (
    <Box>
        <ComposableMap
            projectionConfig={{
                scale: 200,
            }}
            width={800}
            height={400}
            style={{
                width: "100%",
                height: "auto",
            }}
        >
            <Geographies geography="/collections/map_features.json"> 
                {({ geographies })=> geographies.map(geo => (
                    <Geography 
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                            default: {
                                fill: "#D6D6DA",
                                outline: "none",
                            },
                            hover: {
                                fill: "#F53",
                                outline: "none",
                            },
                            pressed: {
                                fill: "#E42",
                                outline: "none",
                            },
                        }}
                    />
                ))}
            </Geographies>
        </ComposableMap>
    </Box>
  );
}   

export default WorldMap;