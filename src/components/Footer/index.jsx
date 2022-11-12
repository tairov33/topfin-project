import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import classes from './Footer.module.scss'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


import telegram from '../../images/social-medias/telegram.png'
import instagram from '../../images/social-medias/instagram.png'
import wk from '../../images/social-medias/wk.png'
import youtube from '../../images/social-medias/youtube.png'
import twitter from '../../images/social-medias/twitter.png'
import classNames from 'classnames'
import Iframe from 'react-iframe'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation()

    const [selected, setSelected] = useState(1)
    const handleClick = (divNum) => () => {
        setSelected(divNum);
    };

    return (
        <div id='contacts' className={classes['footer']}>
            <Container className={classes['footer__container']}>
                <div className={classes['footer__logo']}>
                    <Link to='/'><img src={logo} alt="" className={classes['footer__logo-image']} /></Link>
                    <h2 className={classes['footer__logo-title']}>
                        OOO “Topfin Result”
                        <span>{t("footer.title")}</span>
                    </h2>
                </div>

                <div className={classes['footer__info']}>
                    <div className={classes['footer__contacts']}>
                        <h2 className={classes['footer__contacts-title']}>{t("footer.contacts")} </h2>
                        <p className={classes['footer__contacts-text']}> <a className={classes['footer__contacts-text-link']} href="tel:+99871 203 03 33"><span><FontAwesomeIcon icon={faPhone} /></span>+99871 203 03 33</a> </p>
                        <p className={classes['footer__contacts-text']}> <a className={classes['footer__contacts-text-link']} href="tel:+99871 513 03 33"><span><FontAwesomeIcon icon={faPhone} /></span>+99871 513 03 33</a> </p>
                        <p className={classes['footer__contacts-text']}> <a className={classes['footer__contacts-text-link']} href="mailto:help@topfin.uz"><span><FontAwesomeIcon icon={faEnvelope} /></span>help@topfin.uz</a> </p>
                        
                        <h2 className={classes['footer__contacts-mediaTitle']}>{t("footer.social-medias")}
                            <span>
                                <a href="https://t.me/diarybookuz"><img src={telegram} alt="" /></a>
                                <a href="https://instagram.com/tairrov/"><img src={instagram} alt="" /></a>
                                <a href="#!"><img src={wk} alt="" /></a>
                                <a href="https://www.youtube.com/channel/UCXYkLpwKGjd-zsKiIIrF4Vg"><img src={youtube} alt="" /></a>
                                <a href="#!"><img src={twitter} alt="" /></a>
                            </span>
                        </h2>
                    </div>

                    <div className={classes['footer__location']}>
                        <div className={classes['footer__location-info']}>
                            <button onClick={(handleClick(1))} className={classNames(classes['footer__location-info-button'], selected === 1 ? classes['footer__location-info-button-active'] : "")}>
                                <h2>{t("footer.mainOffice")}</h2>
                                <p>{t("footer.mainOffice-location")}</p>
                            </button>
                            <button onClick={(handleClick(2))} className={classNames(classes['footer__location-info-button'], selected === 2 ? classes['footer__location-info-button-active'] : "")}>
                                <h2>{t("footer.subsidiary")}</h2>
                                <p>{t("footer.subsidiary-location")}</p>
                            </button>
                        </div>
                        <div className={classes['footer__location-map']}>
                            {
                                selected === 1 ?
                                    <Iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11987.54020437009!2d69.2826782!3d41.3113642!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x22b5bc120c7e164!2z0JPQvtGB0YLQuNC90LjRhtCwICLQo9C30LHQtdC60LjRgdGC0LDQvSI!5e0!3m2!1sru!2s!4v1660199579605!5m2!1sru!2s"
                                        className={classes['footer__location-map-info']}
                                        styles={{ border: "0" }}
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade" />
                                    :
                                    < Iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11996.052560240825!2d69.2001372!3d41.2650498!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x82d1d0a1630a1413!2zUFJPV0VCIC0g0YPRh9C10LHQvdGL0Lkg0YbQtdC90YLRgCDQsiDQotCw0YjQutC10L3RgtC1LiDQmtGD0YDRgdGLINCf0YDQvtCz0YDQsNC80LzQuNGA0L7QstCw0L3QuNGPLCDQnNCw0YDQutC10YLQuNC90LMg0LggU01NLCDQlNC40LfQsNC50L0g0LggM0Qt0LPRgNCw0YTQuNC60LAu!5e0!3m2!1sru!2s!4v1660207876054!5m2!1sru!2s"
                                        className={classes['footer__location-map-info']}
                                        styles={{ border: "0" }}
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade" />

                            }
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer