import Btn from "../components/Btn";
import Question from "../components/Question";

const Spath = ({list, uidFlag}) => {
    const showUID = (value)=>{
        if( value !== undefined){
            uidFlag(true);
        }
    }
    return (
        <>
        <Question label="온라인 시승 예약 경로" addClass={"flex-col w-full"}>
            <div onClick={(event)=>{showUID(event.target.value)}} className="space-y-2">
                {list.map( (item, index) => (
                    <Btn key={index} name="spath" label={item.label} value={item.value}/>
                ))}
            </div>
        </Question>
        </>
    );
}

export default Spath;