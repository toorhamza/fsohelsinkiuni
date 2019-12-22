import React from 'react';

const FilterSearch = (props) => {
    return (
        <div>filter this name <input onChange={props.filterName}/> </div>
    )
}

export default FilterSearch;