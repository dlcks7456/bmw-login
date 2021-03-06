import Btn from "../components/Btn";
import Question from "../components/Question";

const CsoBrand = ({list}) => {
    return (
        <>
        <Question label="λΈλλ" addClass={"flex space-x-2"}>
            {list.map( (item, index) => (
                <Btn key={index} name="csoBrand" label={item.label} value={item.value} addClass={"w-[150px]"}/>    
            ))}
        </Question>
        </>
    );
}

export default CsoBrand;