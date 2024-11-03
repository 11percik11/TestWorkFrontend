import { useState } from "react"
import {
  useLazyGetCurrentUsersQuery,
  useUpdateUserMutation,
} from "../../app/services/userApi"
import styles from "./index.module.css"
import { Update } from "../Update"

interface LineUser {
  data: {
    id: string
    name: string
    group: string
    company: string
    presence: boolean
  }
  number: number
}

export const LineUser = ({ data, number }: LineUser) => {
  const [updateProduct] = useUpdateUserMutation()
  const [triggerCurrentQuery] = useLazyGetCurrentUsersQuery()
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)

  const toggleUpdate = () => {
    setIsUpdateVisible(!isUpdateVisible)
  }

  const UpdatePresence = async () => {
    try {
      await updateProduct({
        id: data.id,
        userData: { presence: !data.presence },
      }).unwrap()
      await triggerCurrentQuery()
    } catch (error) {
      console.error("Error:", error) 
    }
  }

  return (
      <div className={styles.lineUser}>
        <div className={styles.LineUser_box1}>
          <div>{number}</div>
        </div>
        <div className={styles.LineUser_box2}>
          <div className={styles.lineUser_divUpdate} onClick={toggleUpdate}>
            {data.name}
          </div>
        </div>
        <div className={styles.LineUser_box3}>
          <div>{data.company}</div>
        </div>
        <div className={styles.LineUser_box4}>
          <div>{data.group}</div>
        </div>
        <div className={styles.LineUser_box5}>
          <div onClick={UpdatePresence}>
            {data.presence ? (<div className={styles.presence_true}></div>) : (<div className={styles.presence_false}></div>)}
          </div>
        </div>
        <Update isVisible={isUpdateVisible} onClose={toggleUpdate} data={data} />
      </div>
  )
}

