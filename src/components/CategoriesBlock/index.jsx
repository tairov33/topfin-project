import React, { useEffect, useState } from 'react'
import classes from './CategoriesBlock.module.scss'
import './CategoriesBlock.styles.scss'
import categories from '../../categories'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import tick from '../../images/tick.png'
import { validateName, validatePhoneContent, validatePhoneNumber } from '../../helper'
import { useTranslation } from 'react-i18next'

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-scroll'
import axios from 'axios'

const CategoriesBlock = () => {
  const TOKEN = "5728242084:AAHRqtcvfCke-Ath-eili5GfofjSt6VH-Uo";
  const CHAT_ID = "-1001198598715";
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage `;

  const { t } = useTranslation()

  const initialData = {
    name: '',
    tel: '',
  }

  const [fields, setFields] = useState(initialData)
  const [disabled, setDisabled] = useState(true)


  const [selected, setSelected] = useState([])
  const [ordered, setOrdered] = useState(false)
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

  const showDesc = ({ num }) => {
    setSelected(num)
    document.body.style.overflow = "hidden"
  }

  const hideDesc = () => {
    setSelected(false)
    document.body.style.overflow = "auto"
  }

  const handleSelect = (e) => {
    setSelected(false)
    document.body.style.overflow = "auto"
  }



  return (
    <div id='category' className={`${classes['category']} categories`}>
      {categories.map((item, i) => (
        <div key={item.id} className={classes['category__item']}>
          <img src={item.image} alt="" className={classes['category__image']} />
          <div className={classes['category__box']}>
            <h2 className={classes['category__title']}>{item.title[localStorage.getItem('i18nextLng')]} <span>{item.span[localStorage.getItem('i18nextLng')]}</span></h2>
            <button
              onClick={() => showDesc({ num: i })} className={classes['category__button']}>{t('more.more')}
            </button>
          </div>
        </div>
      ))}

      <Swiper className={classes['category__swiper']} navigation={true} modules={[Navigation]}>
        {categories.map((item, i) => (
          <SwiperSlide key={item.id} className={classes['category__swiper-slide']}>
            <div className={classes['category__swiper-item']} >
              <img src={item.image} alt="" className={classes['category__image']} />
              <div className={classes['category__box']}>
                <h2 className={classes['category__swiper-title']}>{item.title[localStorage.getItem('i18nextLng')]} <span>{item.span[localStorage.getItem('i18nextLng')]}</span></h2>
                <button
                  onClick={() => showDesc({ num: i })} className={classes['category__button']}>{t('more.more')}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



      {categories.map((item, i) => (
        <div key={item.id} className={classNames(classes['category__modal'], selected === i ? classes['category__modal-active'] : classes['category__modal'])}>
          <div className={classNames(classes['category__modal-box'])}>
            <button onClick={hideDesc} className={classes['category__modal-hide']}><FontAwesomeIcon icon={faXmark} className={classes['category__modal-icon']} /></button>
            <img src={item.image} alt={item.image} className={classes['category__modal-image']} />
            <div className={classes['category__modal-info']}>
              <h2 className={classes['category__modal-title']}>{item.title[localStorage.getItem('i18nextLng')]} <span>{item.span[localStorage.getItem('i18nextLng')]}</span></h2>
              <p className={classes['category__modal-text']}>{item.text[localStorage.getItem('i18nextLng')]}</p>
              <div className={classes['category__modal-btns']}>
                <Link onClick={handleSelect} to='communication' spy={true} offset={-150} duration={500} className={classes['category__modal-btns-communication']}>{t("category.connect")}</Link>
                <button onClick={() => setOrdered(true)} className={classes['category__modal-btns-request']}>{t("category.order")}</button>
              </div>
            </div>
          </div>
        </div>
      ))}

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
              type='submit' className={classNames(classes['orderService__modal-box-btns-order'], { [classes['orderService__modal-box-btns-order-disabled']]: disabled, })}
              disabled={disabled}
            >{t("orderService.submitApplication")}</button>
            <button className={classes['orderService__modal-box-btns-cancel']} onClick={() => setOrdered(false)}>{t('orderService.cancel')}</button>
          </div>
        </form>
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
          <button onClick={() => setSent(false)} className={classes['sent__box-button']}>{t('notification.close')}</button>
        </div>
      </div>

    </div >
  )
}

export default CategoriesBlock