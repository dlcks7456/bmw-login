import './App.css';
import Store from './questions/Store';
import Spath from './questions/Spath';
import { useState, useRef, useEffect, useCallback } from 'react';
import Cso from './questions/Cso';
import nielseniq from './img/nielseniq.png';
import { cls } from './libs/utils';
import Bnumber from './components/Bnumber';
import Uids from './uids/Uids';
import Btn from './components/Btn';

function App() {
  const storeList = [
    {value:1, label:"BMW 일반"},
    {value:2, label:"BMW xEV"},
    {value:3, label:"MINI"},
    // {value:4, label:"CSO"},
  ];
  const [storeLabel, setStoreLabel] = useState("");
  
  const spathList = [
    {value:1, label: "딜러사 웹사이트"},
    {value:2, label: "브랜드 공식 웹사이트"},
    {value:3, label: "딜러사 카카오톡 플러스 채널"}
  ];
  const [spathLabel, setSpathLabel] = useState("");

  const csoList  = {
    brand: [{value:1, label: "BMW"}, {value:2, label: "MINI"}],
    model: [{value:1, label: "일반"}, {value:3, label: "xEV"}],
    type: [{value:1, label: "a"}, {value:2, label: "b"}]
  }
  const [csoBrandLabel, setCsoBrandLabel] = useState("");
  const [csoBrandCode, setCsoBrandCode] = useState(undefined);
  const [csoModelLabel, setCsoModelLabel] = useState("");
  const [csoTypeLabel, setCsoTypeLabel] = useState("");
  
  const csoLabelFnc = { brand: {label: setCsoBrandLabel, code: setCsoBrandCode}, model: setCsoModelLabel, type:setCsoTypeLabel };
  
  const [store, setStore] = useState(undefined);

  const [uidFlag, setUidFlag] = useState(false);
  const formRef = useRef();

  const storeClick = (event) => {
    if( event.target.value !== undefined ){
      setStoreLabel(event.target.parentElement.querySelector("span").innerText);
      const storeCode = parseInt(event.target.value);
      setStore(storeCode);
    }
  }

  const [uidList, setUidList] = useState([]);

  useEffect(() => {
    if( store === 1 ){ setUidList(Uids.bmw_normal); }
    else if( store === 2 ){ setUidList(Uids.bmw_xev); }
    else if( store === 3 ){ setUidList(Uids.mini); }
    else if( store === 4 ){
      if( csoBrandCode === 1 ){
        setUidList(Uids.cso.bmw);
      }
      if( csoBrandCode === 2 ){
        setUidList(Uids.cso.mini);
      }
    }else{
      setUidList([]);
    }

  },[store, csoBrandCode])

  // Debounce
  const debounceFuntion = useCallback(
    (callback, delay) => {
        let timer;

        return(...args)=>{
            setLoading(true);
            clearTimeout(timer);
            timer = setTimeout( ()=> callback(...args), delay );
        }
    }
    ,[]);

    const [startShow, setStartShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [idErr, setIdErr] = useState(true);
    const [idText, setIdText] = useState("매장 ID 입력 부탁드립니다.");
    const uidRef = useRef();

    const showGoToSurvey = useCallback(
      debounceFuntion( (event) => {
        setLoading(false);
        const uid = String(event.target.value);
        if( uid === "" || uid === undefined || uid === null){
          setStartShow(false);
          setIdErr(true);
          setIdText("매장 ID 입력 부탁드립니다.");
          return false;
        }
        var hstcode = document.querySelector("#uidlist").querySelectorAll("option");
        var validUids = []
        for(var i=0; i<hstcode.length; i++){
          validUids.push(hstcode[i].value);
        }
        
        if( validUids.includes(uid) ){
          setStartShow(true);
          setIdErr(false);
          setIdText("");
        }else{
          setStartShow(false);
          setIdErr(true);
          setIdText("조사 대상이 아닌 매장 ID입니다.");
        }
      }, 1000 )
      , []);

      const addRef = useRef();
      const resetStore = ()=>{
        setUidFlag(false);
        setStore(undefined);
        setStartShow(false);
        setIdErr(true);
        addRef.current.querySelector("input[type=checkbox]").checked = false;
        setIdText("매장 ID 입력 부탁드립니다.");
        uidRef.current.value = "";
      }

      const onSubmit = (event) => {
        event.preventDefault();
        if( startShow ){
          if( store === 1 ){ 
            formRef.current.storeid.value = `KR_${uidRef.current.value}`;
           }
          if( store === 2 ){ 
            formRef.current.storeid.value = `KR_${uidRef.current.value}P`;
           }
          if( store === 3 ){ 
            formRef.current.storeid.value = `KR_${uidRef.current.value}M`;
           }

           if( [1, 2, 3].includes(store) ){
            formRef.current.SID.value = `${formRef.current.storeid.value}_${formRef.current.spath.value}`;
           }

          if( store === 4 ){ 
            if( csoBrandLabel === "MINI" ){
              formRef.current.storeid.value = `KR_${uidRef.current.value}${csoTypeLabel}CM`
            }else{
              formRef.current.storeid.value = `KR_${uidRef.current.value}C`
              if( csoModelLabel === "xEV" ){
                formRef.current.storeid.value = `${formRef.current.storeid.value}P`;
              }
            }
            formRef.current.SID.value = formRef.current.storeid.value;
           }

          const params = new URLSearchParams(window.location.search);
          const pid = params.get("pid");
          const mode = params.get("mode");
          if( !pid || !mode ) return;
          const modeList = ["public", "temp"]
          if( !modeList.includes(mode) ) return;

          //console.log(pid, mode);
          let actionUrl = `https://pacific.surveys.nielseniq.com/survey/selfserve/548/${pid}`;
          if( mode === "temp" ){
           actionUrl = `${actionUrl}/temp-edit-live`;
          }
          
          event.target.action = actionUrl;
          event.target.submit();
        }
      }
      const [wait, setWait] = useState({text: "START", disabeld: false});
      const waitOnclick = ()=>{
        setWait({text: "Wait ...", disabeld: true});
      }

  return (
    <div className="flex items-center justify-center max-w-auto">
      <div className="mt-10 sm:mt-20 border border-gray-400 w-[400px] rounded-md shadow-md pb-10">
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="mb-5">
            <img src={nielseniq}/>
          </div>
          <div className="mt-2 text-4xl font-bold">BMW MS Study</div>
          <div className="relative w-full">
            <form className="w-full mt-5" ref={formRef} method="GET" onSubmit={onSubmit}>
              <input type="hidden" name="list" value="1" />
              <input type="hidden" name="SID" value={""} />
              <input type="hidden" name="storeid" value={""} />
              <div className="flex flex-col items-center justify-center w-full">
                <div onClick={storeClick} className="w-80">
                  <Store list={storeList}/>
                </div>

                { [1, 2, 3].includes(store) ? (
                  <div className="mt-5 w-80" onClick={(event)=>{ setSpathLabel(event.target.parentElement.querySelector("span").innerText) }}>
                    <Spath list={spathList} uidFlag={setUidFlag}/>
                  </div>
                ) : null}

                { [4].includes(store) ? (
                  <div className="mt-5 w-80">
                    <Cso list={csoList} onClick={csoLabelFnc} uidFlag={setUidFlag}/>
                  </div>
                ) : null}
              </div>
              <div className={cls("absolute top-5 flex flex-col items-center w-full h-full space-y-5 bg-white", uidFlag ? "block" : "hidden")}>
                    <div className="flex items-center justify-center pl-2 pr-3 mt-10 text-center transition-all bg-gray-300 border border-gray-400 rounded-full shadow-md cursor-pointer peer hover:bg-black hover:text-white" onClick={()=>(resetStore())}>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                          응답 초기화
                      </div>
                    </div>
                    <div>
                      {[1, 2, 3].includes(store) ? (
                        <>
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="font-bold text-center">매장</div>
                            <div>{storeLabel}</div>
                            <div className="font-bold text-center break-all">온라인 시승 경로</div>
                            <div>{spathLabel}</div>
                          </div>
                        </>
                      ) : null}
                      {[4].includes(store) ? (
                        <>
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="font-bold text-center">매장</div>
                            <div>{storeLabel}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="font-bold text-center">브랜드</div>
                            <div>{csoBrandLabel}</div>
                          </div>
                          {csoBrandCode === 1 ? (
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="font-bold text-center">모델</div>
                            <div>{csoModelLabel}</div>
                          </div>
                          ) : null}
                          {csoBrandCode === 2 ? (
                          <div className="grid grid-cols-2 gap-x-2">
                            <div className="font-bold text-center">타입</div>
                            <div>{csoTypeLabel}</div>
                          </div>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                    <div className="w-44" ref={addRef}>
                        <Btn name="add" label={"추가 조사"} value={1} type={"checkbox"} required={false}/>
                    </div>
                    <Bnumber name="UID" label="UID" min={1} max={99999} dataList={uidList} onChange={showGoToSurvey} thisRef={uidRef}/>
                    {loading ? (
                      <i className="absolute bottom-10 fa-2x fas fa-circle-notch fa-spin"/>
                      ) : (
                        idErr ? (
                          <div className="absolute bottom-10 text-lg text-red-400 font-bold">
                            {idText}
                          </div>
                        ) : 
                        startShow ? (
                          <div onClick={waitOnclick} className={`absolute flex justify-center h-12 font-bold bg-gray-300 border border-gray-400 rounded-md bottom-10 w-80 hover:bg-black hover:text-white ${wait.disabeld ? "pointer-events-none" : null}`}>
                            <input type="submit" value={wait.text} className="w-full cursor-pointer"/>
                          </div>
                      ) : null
                    )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
