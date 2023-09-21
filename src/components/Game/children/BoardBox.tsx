import React from 'react';
import {BoardBoxProps} from "../types";

export const BoardBox = (props: BoardBoxProps)=>{
    const {
        position,
        isSelected,
        isHit,
        onSelect
    } = props;

    const handleSelect = ()=> {
        if (!isSelected) {
            onSelect()
        }
    }
    return (<button type="button" className="flex-auto bg-white border border-gray-500" onClick={handleSelect}>
        <div className="h-0 pt-[100%] relative">
            {isSelected && (
                <img src={isHit ? 'assets/Hit.png' : 'assets/Miss.png'} className="absolute inset-0"/>
            )}
        </div>
    </button>)
}
