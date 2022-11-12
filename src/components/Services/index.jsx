import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import classes from './Services.module.scss'
import { extraServices, services } from '../../services'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import tick from '../../images/tick.png'
import { validateName, validatePhoneContent, validatePhoneNumber } from '../../helper'
import { useTranslation } from 'react-i18next'
import axios from 'axios'


const initialData = {
    name: '',
    tel: '',
}

const Services = () => {
    const TOKEN = "5728242084:AAHRqtcvfCke-Ath-eili5GfofjSt6VH-Uo";
    const CHAT_ID = "-1001198598715";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage `;

    const { t } = useTranslation()

    const [fields, setFields] = useState(initialData)
    const [disabled, setDisabled] = useState(true)

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


    const [sent, setSent] = useState(false)
    const [ordered, setOrdered] = useState(false)
    const showOrder = () => {
        setOrdered(true)
        document.body.style.overflow = "hidden"
        setSelected(null)
    }
    const hideOrder = () => {
        setOrdered(false)
        document.body.style.overflow = "auto"
    }
    const [extracted, setExtracted] = useState(false)
    const [clicked, setClicked] = useState([])
    const showExtraInfo = ({ num }) => {
        setClicked(num)
    }

    const [selected, setSelected] = useState([])
    const showDesc = ({ num }) => {
        setSelected(num)
        document.body.style.overflow = "hidden"
    }
    const hideDesc = ({ num }) => {
        setSelected(null)
        document.body.style.overflow = "auto"
    }

    const showExtra = () => {
        setExtracted(true)
        document.body.style.overflow = "hidden"
    }

    const [service, setService] = useState(false)

    const hideServiceOrder = () => {
        setService(false)
        document.body.style.overflow = "hidden"
    }
    const showServiceOrder = () => {
        setService(true)
        document.body.style.overflow = "hidden"
    }
    const hideExtra = () => {
        setExtracted(false)
        document.body.style.overflow = "auto"
    }
    return (
        <div id='services' className={classes['service']}>
            <Container className={classes['service__container']}>
                <h2 className={classes['service__title']}>{t("services.title")}</h2>
                <div className={classes['service__box']}>
                    {services.map((item, i) => (
                        <div key={item.id} className={classes['service__item']}>
                            <img className={classes['service__item-bgImage']} src={item.bgImage} alt="" />
                            <div className={classes['service__item-left']}>
                                <img className={classes['service__item-image']} src={item.mainImage} alt="" />
                            </div>
                            <div className={classes['service__item-right']}>
                                <div className={classes['service__item-icon-box']}><img className={classes['service__item-icon']} src={item.icon} alt="" /></div>
                                <div className={classes['service__item-texts']}>
                                    <h2 className={classes['service__item-texts-title']}>{item.title[localStorage.getItem('i18nextLng')]}</h2>
                                    <p className={classes['service__item-texts-text']}>{item.text[localStorage.getItem('i18nextLng')]}</p>
                                </div>
                                <div className={classes['service__item-btns']}>
                                    <button
                                        onClick={showOrder} className={classes['service__item-btns-order']}>{t("services.orderService")}
                                    </button>
                                    <button
                                        onClick={() => showDesc({ num: i })} className={classes['service__item-btns-data']}>{t("services.more")}
                                    </button>
                                </div>
                            </div>

                            {services.map((item, i) => (
                                <div key={item.id} className={classNames(classes['service__modal'], selected === i ? classes['service__modal-active'] : classes['service__modal'])}>
                                    <div className={classes['service__modal-box']}>
                                        <button onClick={hideDesc} className={classes['service__modal-button']}><FontAwesomeIcon icon={faXmark} className={classes['service__modal-icon']} /></button>
                                        <img src={item.mainImage} alt="" className={classes['service__modal-box-image']} />
                                        <div className={classes['service__modal-box-info']}>
                                            <h2 className={classes['service__modal-box-info-title']}>{item.title[localStorage.getItem('i18nextLng')]}</h2>
                                            <p className={classes['service__modal-box-info-text']}>{item.info[localStorage.getItem('i18nextLng')]}</p>
                                            <button onClick={showServiceOrder} className={classes['service__modal-box-info-button']}>{t("services.orderService")}</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <button
                        onClick={showExtra} className={classes['service__open-extra']}>{t("services.extraServices")}
                    </button>

                    <div className={classNames(classes['extra'], extracted ? classes['extra-active'] : classes['extra'])}>
                        <div className={classes['extra__box']}>
                            <button onClick={hideExtra} className={classes['extra-button']}><FontAwesomeIcon icon={faXmark} className={classes['extra-button-icon']} /></button>
                            <h1 className={classes['extra__box-title']}>{t("services.extraServices")}</h1>
                            <p className={classes['extra__box-text']}>{t("services.extraServices-info")}</p>
                            {extraServices.map((extra, i) => (
                                <div key={extra.id} className={classes['extra__box-item']}>
                                    <button onClick={() => showExtraInfo({ num: i })} className={classes['extra__box-item-icon']}><img className={classes['extra__box-item-icon-image']} src={extra.icon} alt="" /></button>
                                    <h2 className={classes['extra__box-item-title']}>{extra.title[localStorage.getItem('i18nextLng')]}</h2>
                                </div>
                            ))}
                            <button
                                onClick={showServiceOrder} className={classes['extra__box-order']}>{t("services.orderService")}</button>
                        </div>
                    </div>

                    {extraServices.map((extra, i) => (
                        <div key={extra.id} className={classNames(classes['service__modal'], clicked === i ? classes['service__modal-active'] : classes['service__modal'])}>
                            <div className={classes['service__modal-box']}>
                                <button onClick={() => setClicked(null)} className={classes['service__modal-button']}><FontAwesomeIcon icon={faXmark} className={classes['service__modal-icon']} /></button>
                                <img src={extra.image} alt="" className={classes['extra__box-image']} />
                                <div className={classes['service__modal-box-info']}>
                                    <h2 className={classes['service__modal-box-info-title']}>{extra.title[localStorage.getItem('i18nextLng')]}</h2>
                                    <p className={classes['service__modal-box-info-text']}>{extra.text[localStorage.getItem('i18nextLng')]}</p>
                                    <button onClick={showServiceOrder} className={classes['service__modal-box-info-button']}>{t("services.orderService")}</button>
                                </div>
                            </div>
                        </div>
                    ))}



                    <div className={classNames(classes['orderService__modal'], service ? classes['orderService__modal-active'] : classes['orderService__modal'])}>
                        <form onSubmit={handleSubmit} className={classes['orderService__modal-box']}>
                            <h2 className={classes['orderService__modal-box-title']}>{t("orderService.title")}</h2>
                            <p className={classes['orderService__modal-box-text']} >{t("orderService.text")}</p>
                            <div className={classes['orderService__modal-box-input']}>
                                <label className={classes['custom-field']}>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={fields.name}
                                        name='name'
                                        type="text" />
                                    <span className={classes['placeholder']}>{t("orderService.name")}</span>
                                </label>
                                <label className={classes['custom-field']}>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={fields.tel}
                                        name='tel'
                                        type="text" />
                                    <span className={classes['placeholder']}>{t("orderService.tel")}</span>
                                </label>
                            </div>
                            <div className={classes['orderService__modal-box-btns']}>
                                <button 
                                type='submit'
                                className={classNames(classes['orderService__modal-box-btns-order'], { [classes['orderService__modal-box-btns-order-disabled']]: disabled, })}
                                    disabled={disabled}
                                >{t("orderService.submitApplication")}</button>
                                <button className={classes['orderService__modal-box-btns-cancel']} onClick={hideServiceOrder}>{t("orderService.cancel")}</button>
                            </div>
                        </form>
                    </div>



                    <div className={classNames(classes['orderService__modal'], ordered ? classes['orderService__modal-active'] : classes['orderService__modal'])}>
                        <form onSubmit={handleSubmit} className={classes['orderService__modal-box']}>
                            <h2 className={classes['orderService__modal-box-title']}>{t("orderService.title")}</h2>
                            <p className={classes['orderService__modal-box-text']} >{t("orderService.text")}</p>
                            <div className={classes['orderService__modal-box-input']}>
                                <label className={classes['custom-field']}>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={fields.name}
                                        name='name'
                                        type="text" />
                                    <span className={classes['placeholder']}>{t("orderService.name")}</span>
                                </label>
                                <label className={classes['custom-field']}>
                                    <input
                                        required
                                        onChange={handleChange}
                                        value={fields.tel}
                                        name='tel'
                                        type="text" />
                                    <span className={classes['placeholder']}>{t("orderService.tel")}</span>
                                </label>
                            </div>
                            <div className={classes['orderService__modal-box-btns']}>
                                <button 
                                type='submit'
                                className={classNames(classes['orderService__modal-box-btns-order'], { [classes['orderService__modal-box-btns-order-disabled']]: disabled, })}
                                    disabled={disabled}
                                >{t("orderService.submitApplication")}</button>
                                <button className={classes['orderService__modal-box-btns-cancel']} onClick={hideOrder}>{t("orderService.cancel")}</button>
                            </div>
                        </form>
                    </div>
                </div>

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

            </Container >

        </div >
    )
}

export default Services