import {
    SliceSimulator,
    SliceSimulatorProps,
} from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default function SliceSimulatorPage(props: any) {
    return (
        <SliceSimulator
            {...props}
            sliceZone={(props) => (
                <SliceZone {...props} components={components} />
            )}
        />
    );
}
