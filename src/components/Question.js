import { cls } from "../libs/utils";


const Question = ({label, addClass, children}) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-full mt-2 text-xl font-bold text-center mp-2">{label}</div>
            <div className={cls("flex", addClass ? addClass : "")}>
                {children}
            </div>
        </div>
    );
}

export default Question;