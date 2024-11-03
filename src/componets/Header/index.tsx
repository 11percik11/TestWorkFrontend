import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import { Register } from "../Register";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyValue, setSearchValue } from "../searchSlice";
import { RootState } from "../../app/store";

export const Header = () => {
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const usertrue = useSelector((state: RootState) => state.searchReducer.usertrue);
  const userfalse = useSelector((state: RootState) => state.searchReducer.userfalse);

  const [nameValueStorage, setNameValueStorage] = useState(localStorage.getItem("nameValue") || '')
  const [companyValueStorage, setCompanyeValueStorage] = useState(localStorage.getItem("companyValue") || '')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValueStorage(event.target.value)
    localStorage.setItem("nameValue", event.target.value);
    dispatch(setSearchValue(event.target.value));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyeValueStorage(event.target.value);
    localStorage.setItem("companyValue", event.target.value);
    dispatch(setCompanyValue(event.target.value));
  };


  useEffect(() => {
    if (nameValueStorage) {
      dispatch(setSearchValue(nameValueStorage));
    }
    if (companyValueStorage) {
      dispatch(setCompanyValue(companyValueStorage));
    }
  }, [nameValueStorage, companyValueStorage, dispatch]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };


  return (
    <div className={styles.header}>
      <div className={styles.header_block}>

      <div className={styles.header_box1}>
        <div><img src="src\foto\Logo.png" alt="Logo" className={styles.header_logo}/></div>
        <div>
          <input type="text" placeholder="Поиск по имени" value={nameValueStorage}  className={styles.header_input} onChange={handleInputChange}/>
        </div>
        <div>
          <input type="text" placeholder="Поиск по компании" value={companyValueStorage} className={styles.header_input} onChange={handleCompanyChange}/>
        </div>
        <div>
          <button className={styles.header_button} onClick={togglePopup}>Добавить</button>
        </div>
      </div>
      <div className={styles.header_user_value}>
        <div>Посетители</div>
        <div className={styles.header_value}>
          <div className={styles.header_value_true}>{usertrue}</div>
          <div className={styles.header_palka}>/</div>
          <div className={styles.header_value_false}>{userfalse}</div>
          </div>
      </div>
      <Register isVisible={isPopupVisible} onClose={togglePopup} />
      </div>
    </div>
  )
}
