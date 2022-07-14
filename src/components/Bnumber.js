const Bnumber = ({name, label, min, max, onChange, dataList, thisRef}) => {
    return (
        <div className="shadow-md relative h-12 w-80">
            <input 
            name={name}
            type="number"
            min={min}
            max={max}
            onChange={onChange}
            ref={thisRef}
            className="w-full h-full border border-gray-300 rounded-md pl-2 peer"
            list={dataList ? "uidlist" : null}
            required/>
            <span 
            className="absolute transition-all ease-in select-none left-2 pt-3 w-10 text-center text-gray-400 peer-focus:text-[10px] peer-focus:pt-0 peer-focus:-top-1.5 peer-focus:bg-black peer-focus:text-white peer-focus:rounded-sm peer-valid:text-[10px] peer-valid:pt-0 peer-valid:-top-1.5 peer-valid:bg-black peer-valid:text-white peer-valid:rounded-sm">
            {label}</span>
            { dataList ? (
                <>
                <datalist id="uidlist">
                    {dataList.map( (item)=>(
                        <option value={item} key={item}/>
                    ))}
                </datalist>
                </>
            ) : null }
        </div>
    );
}

export default Bnumber;