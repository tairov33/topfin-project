import React, { useState } from 'react'
import Container from '../../layout/Container'
import classes from './AboutCompany.module.scss'
import mainImage from '../../images/aboutMain.png'
import buttonImage from '../../images/aboutImg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import "../../utils/i18next"

const AboutCompany = () => {
  const { t } = useTranslation()

  const [selected, setSelected] = useState(false)
  const showDesc = () => {
    setSelected(true)
    document.body.style.overflow = "hidden"
  }

  const hideDesc = () => {
    setSelected(false)
    document.body.style.overflow = "auto"
  }
  return (
    <div id='about' className={classes['main']}>
      <div className={classes['about']}>
        <Container className={classes['about__container']}>
          <div className={classes['about__left']}><img src={mainImage} alt="" className={classes['about__left-image']} /></div>
          <div className={classes['about__right']}>  
            <h2 className={classes['about__right-title']}>{t("about.title")}</h2>
            <p className={classes['about__right-text']}>{t("about.text")}</p>
            <button
              onClick={showDesc} className={classes['about__right-button']}>{t("about.more")}
              </button>
            <p className={classes['about__right-info-title']}>{t("about.wecan")}</p>

            <div className={classes['about__right-info']}>
              <p className={classes['about__right-info-experience']}>8 <span>{t("about.experience")}</span></p>
              <p className={classes['about__right-info-staff']}>80 <span>{t("about.staff")}</span></p>
            </div>
          </div>

        </Container>
        <div className={classes['download']}>
          <p className={classes['download__text']}>{t("about.download-info")}</p>
          <button
            className={classes['download__button']}>{t("about.download-button")}</button>
        </div>
      </div>

      <div className={classes['about-adaptive']}>
        <Container className={classes['about-adaptive__container']}>
          <h2 className={classes['about-adaptive__right-title']}>{t("about.title")}</h2>
          <div className={classes['about-adaptive__left']}><img src={mainImage} alt="" className={classes['about-adaptive__left-image']} /></div>
          <div className={classes['about-adaptive__right']}>
            <p className={classes['about-adaptive__right-text']}>{t("about.adaptive-text")}</p>
            <p className={classes['about-adaptive__right-info-title']}>{t("about.wecan")}</p>

            <div className={classes['about-adaptive__right-info']}>
              <p className={classes['about__right-info-experience']}>8 <span>{t("about.experience")}</span></p>
              <p className={classes['about__right-info-staff']}>80 <span>{t("about.staff")}</span></p>
            </div>
          </div>

        </Container>
      </div>


      <div className={classNames(classes['buttonPage'], selected ? classes['buttonPage-active'] : classes['buttonPage'])}>
        <div className={classNames(classes['buttonPage-box'], selected ? classes['buttonPage-box-active'] : classes['buttonPage-box'])}>
          <button onClick={hideDesc} className={classes['buttonPage-button']}><FontAwesomeIcon icon={faXmark} className={classes['buttonPage-icon']} /></button>
          <img className={classes['buttonPage-image']} src={buttonImage} alt="" />
          <div className={classes['buttonPage-info']}>
            <h2 className={classes['buttonPage-title']}>TOPFIN RESULT</h2>
            <p className={classes['buttonPage-text']}>
              <span>{t("about.paragraph-first")}</span>
              <span>{t("about.paragraph-second")}</span>
              <span>{t("about.paragraph-third")}</span>
              <span>{t("about.paragraph-four")}</span>
              <span>{t("about.paragraph-five")}</span>
              <span>{t("about.paragraph-six")}</span>
              <span>{t("about.paragraph-seven")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutCompany