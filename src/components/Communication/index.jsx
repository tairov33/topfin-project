import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import classNames from 'classnames'
import classes from './Communication.module.scss'
import { validateName, validatePhoneContent, validatePhoneNumber } from '../../helper'
import tick from '../../images/tick.png'

import "../../utils/i18next"
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const initialData = {
    name: '',
    tel: '',
}

const Communication = () => {
    const TOKEN = "5728242084:AAHRqtcvfCke-Ath-eili5GfofjSt6VH-Uo";
    const CHAT_ID = "-1001198598715";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage `;

    const { t } = useTranslation()

    const [fields, setFields] = useState(initialData)
    const [disabled, setDisabled] = useState(true)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        const isValid =
            validateName(fields.name) &&
            validatePhoneNumber(fields.tel)
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
        message += `<b>Tel: </b> ${fields.tel}`;

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then((res) => {
                setSent(true)
                setFields(initialData)
            })
            .catch((err) => {
                console.warn(err);
            })

    }

    return (
        <div id='communication' className={classes['communication']}>
            <Container className={classes['communication__container']}>
                <h2 className={classes['communication__title']}>{t("contactUs.contactUs")}</h2>
                <form onSubmit={handleSubmit} className={classes['communication__orderForm']}>
                    <label className={classes['custom-field']}>
                        <input
                            required
                            onChange={handleChange}
                            value={fields.name}
                            name='name'
                            type="text" />
                        <span className={classes['placeholder']}>{t("contactUs.name")}</span>
                    </label>
                    <label className={classes['custom-field']}>
                        <input
                            required
                            onChange={handleChange}
                            value={fields.tel}
                            name='tel'
                            type="text" />
                        <span className={classes['placeholder']}>{t("contactUs.tel")}</span>
                    </label>
                    <button
                        type='submit'
                        className={classNames(classes['communication__orderForm-button'], {
                            [classes['communication__orderForm-button-disabled']]: disabled,
                        })}
                        disabled={disabled}

                    >{t("contactUs.send")}</button>
                </form>

                <div id='success' className={classNames(classes['sent'], sent ? classes['sent-active'] : classes[''])}>
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
        </div>
    )
}

export default Communication