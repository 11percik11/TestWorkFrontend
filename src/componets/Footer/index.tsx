import { useDispatch } from "react-redux";
import styles from "./index.module.css"
import { setFilterValue, setPresenceValue } from "../searchSlice";
import { useEffect } from "react";

export const Footer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFilter = localStorage.getItem("filterValue");
    const savedPresence = localStorage.getItem("presenceValue");

    if (savedFilter !== null) {
      dispatch(setFilterValue(JSON.parse(savedFilter)));
    }
    if (savedPresence !== null) {
      dispatch(setPresenceValue(JSON.parse(savedPresence)));
    }
  }, [dispatch]);

  const handlePresenceChangeFalse = () => {
    dispatch(setPresenceValue(false));
    dispatch(setFilterValue(false));
    localStorage.setItem("presenceValue", JSON.stringify(false));
    localStorage.setItem("filterValue", JSON.stringify(false));
  };

  const handlePresenceChangeTrue = () => {
    dispatch(setPresenceValue(true));
    dispatch(setFilterValue(false));
    localStorage.setItem("presenceValue", JSON.stringify(true));
    localStorage.setItem("filterValue", JSON.stringify(false));
  };

  const handleFilterChange = () => {
    dispatch(setFilterValue(true));
    localStorage.setItem("filterValue", JSON.stringify(true));
  };


  return (
    <div className={styles.footer}>
          <div className={styles.footer_div1}>Фильтровать по:</div>
          <div><button className={styles.footer_div2_button} onClick={handlePresenceChangeFalse}>Отсутсвующим</button></div>
          <div><button className={styles.footer_div3_button} onClick={handlePresenceChangeTrue}>Присутствующим</button></div>
          <div><button className={styles.footer_div4_button} onClick={handleFilterChange}>Без фильтра</button></div>
    </div>
  )
}
