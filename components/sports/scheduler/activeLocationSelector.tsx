"use client"
import {Location} from "@/src/models/LocationModel";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {number} from "prop-types";

export type ActiveLocationSelectorProps = {
    locations: Location[],
    activeLocations: Location[],
    setActiveLocations: (locations: Location[]) => void
}

export default function ActiveLocationSelector(props: ActiveLocationSelectorProps) {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedLocationIds = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
        const selectedLocations = props.locations.filter(location => selectedLocationIds.includes(location.id.toString()))
        props.setActiveLocations(selectedLocations)
    }

    return (
        <FormControl>
            <InputLabel id="location-selector-label">開催場所一覧</InputLabel>
            <Select
                labelId="location-selector-label"
                id="location-selector"
                multiple
                value={props.activeLocations.map(location => location.id.toString())}
                onChange={handleChange}
                input={<OutlinedInput label="Location" />}
            >
                {props.locations.map((location) => (
                    <MenuItem
                        key={location.id}
                        value={location.id.toString()}
                    >
                        {location.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}