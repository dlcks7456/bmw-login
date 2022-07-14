import Btn from "../components/Btn";
import Question from "../components/Question";

const CsoMiniType = ({list}) => {
    return (
        <>
        <Question label="매장 구분" addClass={"flex space-x-2"}>
        {list.map( (item, index) => (
            <Btn key={index} name="csoMINItype" label={item.label} value={item.value} addClass={"w-[150px]"}/>
        ))}
        </Question>
        </>
    );
}

export default CsoMiniType;