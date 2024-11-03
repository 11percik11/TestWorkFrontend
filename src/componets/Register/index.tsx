import { ChangeEvent, FormEvent, useState } from "react"
import styles from "./index.module.css"
import {
  useLazyGetCurrentUsersQuery,
  useRegisterUserMutation,
} from "../../app/services/userApi"

interface Register {
  isVisible: boolean
  onClose: () => void
}

interface FormData {
  name: string
  group: string
  company: string
  presence: boolean
}

export const Register = ({ isVisible, onClose }: Register) => {
  if (!isVisible) return null
  const [register] = useRegisterUserMutation()
  const [triggerCurrentQuery] = useLazyGetCurrentUsersQuery()
  const ArrGroup = ["Выбрать", "Прохожий", "Клиент", "Партнер"]

  const [formData, setFormData] = useState<FormData>({
    name: "",
    group: "",
    company: "",
    presence: true,
  })

  const [errors, setErrors] = useState({
    name: "",
    group: "",
    company: "",
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)

    const nameValid = formData.name.trim() !== ""
    const groupValid = formData.group.trim() !== ""
    const companyValid = formData.company.trim() !== ""

    if (!nameValid || !groupValid || !companyValid) {
      setErrors({
        name: nameValid ? "" : "Поле 'ФИО' обязательно для заполнения",
        group: groupValid ? "" : "Поле 'Группа' обязательно для заполнения",
        company: companyValid
          ? ""
          : "Поле 'Компания' обязательно для заполнения",
      })
      return
    }

    try {
      await register(formData).unwrap()
      await triggerCurrentQuery()
      await onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerContent}>
        <div className={styles.register_svg} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            id="cross-circle"
            className="icon glyph"
          >
            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit} className={styles.register_form}>
          <div className={styles.register_form_container}>
            <div className={styles.register_box_input1}>
              <div className={styles.input_title}>ФИО</div>
              <input
                type="text"
                className={styles.register_input}
                onChange={handleChange}
                value={formData.name}
                id="name"
                name="name"
                required
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>
            <div className={styles.register_box_input2}>
              <div className={styles.input_title}>Компания</div>
              <input
                type="text"
                name="company"
                value={formData.company}
                className={styles.register_input2}
                onChange={handleChange}
                required
              />
              {errors.company && (
                <div className={styles.error}>{errors.company}</div>
              )}
            </div>
            <div className={styles.register_box_input3}>
              <div className={styles.input_title}>Группа</div>
              <select
                className={styles.register_select}
                name="group"
                value={formData.group}
                onChange={handleChange}
              >
                {ArrGroup?.map((role, index) => (
                  <option key={index} value={role === "Выбрать" ? "" : role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.group && (
                <div className={styles.error}>{errors.group}</div>
              )}
            </div>
            <div className={styles.register_box_input4}>
              <div className={styles.input_title}>Присутсвие</div>
              <input
                type="checkbox"
                className={styles.register_checkbox}
                name="presence"
                checked={formData.presence}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.addButton}>
                Добавить
              </button>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
