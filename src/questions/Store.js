import Btn from "../components/Btn";
import Question from "../components/Question";

const Store = ({list}) => {
    return (
        <>
        <Question label="매장 선택" addClass={"flex-col w-full space-y-2"}>
            {list.map( (item, index) => (
                <Btn key={index} name="store" label={item.label} value={item.value}/>    
            ))}
        </Question>
        </>
    );
}

export default Store;