import React from 'react'
import Container from '../../layout/Container'
import classes from './Sertificates.module.scss'
import './Sertificates.styles.scss'

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { sertificates, singleSertificates } from '../../sertificates'


import { useTranslation } from 'react-i18next';
import "../../utils/i18next"

const Sertificates = () => {

    const { t } = useTranslation()
    return (
        <div className={`${classes['sertificate']} sertificates`}>
            <Container className={classes['sertificate__container']}>
                <h2 className={classes['sertificate__title']}>{t("sertificates.sertificates")}</h2>
                <Swiper navigation={true} modules={[Navigation]}>
                    {sertificates.map((item) => (
                        <SwiperSlide key={item.id} className={classes['sertificate__swiper-slide']}>
                            <img src={item.ozak} alt="" />
                            <img src={item.guvohnoma} alt="" />
                            <img src={item.myGov} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper navigation={true} modules={[Navigation]} className='adaptive-swiper'>
                    {singleSertificates.map((item) => (
                        <SwiperSlide key={item.id} className={classes['sertificate-adaptive__swiper-slide']}>
                            <img src={item.sertificate} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    )
}

export default Sertificates