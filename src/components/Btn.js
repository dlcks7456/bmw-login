import { cls } from "../libs/utils";


const Btn = ({name, label, value, addClass, type="radio", required=true}) => {
    return (
        <div className="w-full">
            <label>
                <input type={type} value={value} className="hidden peer" name={name} required={required}/>
                <div className={cls("h-10 py-1 text-lg font-bold text-center transition-colors bg-gray-200 border border-gray-400 rounded-md cursor-pointer w-90 hover:bg-black hover:text-white peer-checked:bg-black peer-checked:text-white", addClass ? addClass : "w-full")}>
                    <span>{label}</span>
                </div>
            </label>
        </div>
    );
}

export default Btn;