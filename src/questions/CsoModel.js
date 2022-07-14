import Btn from "../components/Btn";
import Question from "../components/Question";

const CsoModel = ({list}) => {
    return (
        <>
        <Question label="모델" addClass={"flex space-x-2"}>
        {list.map( (item, index) => (
            <Btn key={index} name="csoModel" label={item.label} value={item.value} addClass={"w-[150px]"}/>
        ))}
        </Question>
        </>
    );
}

export default CsoModel;