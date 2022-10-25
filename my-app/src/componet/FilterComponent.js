import React from "react";

const FilterComponent = (props) => {
const {filterText, onFilter, onClear} = props;

    return (
        <div>
            <input type='search' value={filterText} onChange={onFilter} onClear={onClear}/>
        </div>
    )
};
export default FilterComponent;