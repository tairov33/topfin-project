import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import classes from './Complaints.module.scss'
import { validateName, validatePhoneContent, validatePhoneNumber, validateText } from '../../helper'
import classNames from 'classnames'
import tick from '../../images/tick.png'
import "../../utils/i18next"
import { useTranslation } from 'react-i18next'
import axios from 'axios'


const initialData = {
    name: '',
    tel: '',
    text: '',
    select: '',
}

const Complaints = () => {
    const TOKEN = "5787709442:AAFV9osI3iZL1t3GBb7FMJtmq1T6Fe0cvGg";
    const CHAT_ID = "-1001766155114";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage `;

    const { t } = useTranslation()

    const [fields, setFields] = useState(initialData)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        const isValid =
            validateName(fields.name) &&
            validatePhoneNumber(fields.tel) &&
            validateText(fields.text)
        setDisabled(!isValid)
    }, [fields])

    const handleChange = (e) => {
        if (e.target.name === 'tel' && !validatePhoneContent(e.target.value))
            return
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let message = `<b>Зайавка с сайта Topfin!</b>\n`;
        message += `<b>User: </b> ${fields.name}\n`;
        message += `<b>Tel: </b> ${fields.tel}\n`;
        message += `<b>Comment: </b> ${fields.text}\n`;
        message += `<b>Selected: </b> ${fields.select}`;

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then((res) => {
                this.name.value = "";
                this.tel.value = "";
                this.text.value = "";
                this.select.option = "";
                setSent(true)
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                setFields(initialData)
            })

    }

    const [sent, setSent] = useState(false)

    return (
        <div className={classes['complaint']}>
            <div className={classes['download']}>
                <Container className={classes['download__container']}>
                    <p className={classes['download__text']}>{t("about.download-info")}</p>
                    <button className={classes['download__button']}>{t("about.download-button")}</button>
                </Container>
            </div>
            <Container className={classes['complaint__container']}>
                <h2 className={classes['complaint__title']}>{t("complaints.complaints")}</h2>
                <form onSubmit={handleSubmit} className={classes['complaint__form']} action="">
                    <div className={classes['complaint__form-info']}>
                        <label className={classes['custom-field']}>
                            <input
                                required
                                onChange={handleChange}
                                value={fields.name}
                                name='name'
                                type="text" />
                            <span className={classes['placeholder']}>{t("complaints.name")}</span>
                        </label>
                        <label className={classes['custom-field']}>
                            <input
                                required
                                onChange={handleChange}
                                value={fields.tel}
                                name='tel'
                                type="text" />
                            <span className={classes['placeholder']}>{t("complaints.tel")}</span>
                        </label>
                    </div>
                    <div className={classes['complaint__form-text']}>
                        <label className={classes['custom-field']}>
                            <textarea
                                required
                                onChange={handleChange}
                                value={fields.text}
                                name='text'>
                            </textarea>
                            <span className={classes['placeholder']}>{t("complaints.comment")}</span>
                        </label>
                        <select name="select" id="">
                            <option value="">{t("complaints.theme")}</option>
                            <option value="">{t("complaints.theme")}</option>
                        </select>
                    </div>
                    <div className={classes['complaint__form-send']}>
                        <p >{t("complaints.send-text")}</p>
                        <button
                            className={classNames(classes['complaint__form-button'], {
                                [classes['complaint__form-button-disabled']]: disabled,
                            })}
                            type='submit' disabled={disabled}>{t("complaints.send")}</button>
                    </div>
                </form>

                <div className={classNames(classes['sent'], sent ? classes['sent-active'] : classes['sent'])}>
                    <div className={classes['sent__box']}>
                        <div className={classes['sent__box-info']}>
                            <div className={classes['sent__box-image']}><img src={tick} alt="" /></div>
                            <div className={classes['sent__box-info-texts']}>
                                <h2 className={classes['sent__box-title']}>{t("notification.title")}</h2>
                                <p className={classes['sent__box-text']}>{t("notification.text")}</p>
                            </div>
                        </div>
                        <button onClick={() => setSent(false)} className={classes['sent__box-button']}>{t("notification.close")}</button>
                    </div>
                </div>
            </Container>
        </div >
    )
}

export default Complaints