import React, { useEffect } from 'react'
import Container from '../../layout/Container'
import classes from './Sponsors.module.scss'
import sponsors from '../../sponsors'
import './Sponsors.styles.scss'

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useTranslation } from 'react-i18next'
import "../../utils/i18next"

const Sponsors = () => {
  const { t } = useTranslation()
  return (
    <div id="sponsor" className={`${classes['sponsor']} sponsors`}>
      <Container className={classes['sponsor__container']}>
        <h2 className={classes['sponsor__title']}>{t("sponsors.partners")}</h2>
        <Swiper navigation={true} modules={[Navigation]} className={classes['sponsor__swiper']}>
          <SwiperSlide className={classes['sponsor__slide']}>
            {sponsors.map((item) => (
              <div key={item.id} className={classes['sponsor__brand']}><img src={item.brand} alt="" /></div>
            ))}
          </SwiperSlide>
          <SwiperSlide className={classes['sponsor__slide']}>
            {sponsors.map((item) => (
              <div key={item.id} className={classes['sponsor__brand']}><img src={item.brand} alt="" /></div>
            ))}
          </SwiperSlide>
          <SwiperSlide className={classes['sponsor__slide']}>
            {sponsors.map((item) => (
              <div key={item.id} className={classes['sponsor__brand']}><img src={item.brand} alt="" /></div>
            ))}
          </SwiperSlide>
        </Swiper>

      </Container>

    </div>
  )
}

export default Sponsors