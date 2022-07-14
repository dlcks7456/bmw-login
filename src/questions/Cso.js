import CsoBrand from "./CsoBrand";
import CsoMiniType from "./CsoMiniType";
import CsoModel from "./CsoModel";
import { useState } from "react";

const Cso = ({list, onClick, uidFlag}) => {
    const [brand, setBrand] = useState(null);
    const brandClick = (event)=>{
        const selectedBrand = event.target.value;
        if( selectedBrand !== undefined){
            setBrand(parseInt(selectedBrand));
            onClick.brand.code(parseInt(selectedBrand));
        }
        onClick.brand.label(event.target.parentElement.querySelector("span").innerText);
    }
    const showUID = (value)=>{
        if( value !== undefined){
            uidFlag(true);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div onClick={brandClick}>
                <CsoBrand list={list.brand}/>
            </div>
            {brand === 1 ? (
                <div onClick={(event)=>{ onClick.model(event.target.parentElement.querySelector("span").innerText); showUID(event.target.value); }}>
                    <CsoModel list={list.model}/>
                </div>
            ) : null}
            {brand === 2 ? (
                <div onClick={(event)=>{ onClick.type(event.target.parentElement.querySelector("span").innerText); showUID(event.target.value); }}>
                    <CsoMiniType list={list.type}/>
                </div>
            ) : null }
        </div>
    );
}

export default Cso;