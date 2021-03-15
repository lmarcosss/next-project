import { useContext, useState } from "react";
import { Modal } from "./Modal"
import { CountdownContext } from "../../context/CountdownContext";

import styles from '../../styles/components/home/SettingsModal.module.css'
import Cookies from "js-cookie";

const DEFAULT_TIME = 25

interface Props {
    closeModal: () => void;
}

export function SettingsModal({ closeModal }: Props) {
    const { setCountdownTime, countdownTime } = useContext(CountdownContext)
    const [time, setTime] = useState(countdownTime / 60 ?? DEFAULT_TIME)
    const [isDisabledButton, setIsDisabledButton] = useState(true)

    function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setCountdownTime(time * 60)
        closeModal()
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value)
        
        setTime(value)
        setIsDisabledButton(value === countdownTime)
    }

    return (
        <Modal closeModal={closeModal} containerStyles={styles.container}>
            <div className={styles.content}>
                <h2>Configurações</h2>

                <form onSubmit={onSubmit}>
                    <label htmlFor="time">Tempo de ciclo (minutos)</label>
                    <input
                        type="number"
                        name="time"
                        id="time"
                        value={time}
                        onChange={onChange}
                        min={1}
                    />
                    <button
                        disabled={isDisabledButton}
                        type="submit"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </Modal>
    )
}