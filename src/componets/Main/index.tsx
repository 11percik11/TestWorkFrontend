import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUsersQuery } from "../../app/services/userApi"
import { LineUser } from "../LineUser"
import styles from "./index.module.css"
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { setUserFalseValue, setUserTrueValue } from "../searchSlice";



export const Main = () => {
  const dispatch = useDispatch();
    const value = useSelector((state: RootState) => state.searchReducer.value);
    const company = useSelector((state: RootState) => state.searchReducer.company);
    const presence = useSelector((state: RootState) => state.searchReducer.presence);
    const filter = useSelector((state: RootState) => state.searchReducer.filter);
    const { data: apiData } = useGetCurrentUsersQuery();


const storedData = JSON.parse(localStorage.getItem('DataUser') || 'null');
const data = apiData || storedData;

useEffect(() => {
  if (apiData) {
    localStorage.setItem('DataUser', JSON.stringify(apiData));
    const userTrueCount = apiData.filter(user => user.presence).length;
    const userFalseCount = apiData.filter(user => !user.presence).length;
    dispatch(setUserTrueValue(userTrueCount));
    dispatch(setUserFalseValue(userFalseCount));
  }
}, [apiData, dispatch]);
    


    const filteredData = data?.filter((name: any) => 
      name.name?.toLowerCase().includes(value.toLowerCase()) &&
      name.company?.toLowerCase().includes(company.toLowerCase()) &&
      (name.presence == presence || filter) 
    );
  return (
    <div className={styles.main}>
        <div className={styles.main_title}>
          <div className={styles.main_title_column}>Номер</div>
          <div className={styles.main_title_column}>ФИО</div>
          <div className={styles.main_title_column}>Компания</div>
          <div className={styles.main_title_column}>Группа</div>
          <div className={`${styles.main_title_column} ${styles.column5}`}>Присутсвие</div>
        </div>
          <hr />
        <div className={styles.main_data_user}>
            {filteredData?.map((user: any, index: number) => (
                <LineUser key={user.id} data={user} number={index + 1} />
            ))}
        </div>
    </div>
  )
}
