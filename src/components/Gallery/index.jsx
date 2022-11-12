import React, { useState } from 'react'
import Container from '../../layout/Container'
import classes from './Gallery.module.scss'
import './Gallery.styles.scss'
import gallery from '../../gallery'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../utils/i18next"
import { useTranslation } from 'react-i18next';



const Gallery = () => {
    const { t } = useTranslation()


    const [selected, setSelected] = useState(null)
    const showGallery = () => {
        setSelected(true)
        document.body.style.overflow = "hidden"
    }
    const hideGallery = () => {
        setSelected(null)
        document.body.style.overflow = "auto"
    }
    return (
        <div id='gallery' className={`${classes['gallery']} galleryCom`}>
            <Container className={classes['gallery__container']}>
                <h2  className={classes['gallery__title']}>{t("gallery.gallery")}</h2>
            </Container>
            <div className={classes['gallery__box']}>
                {gallery.map((item, i) => (
                    <button key={item.id}  onClick={showGallery} className={classes['gallery__item']}>
                        <img className={classes['gallery__mainImage']} src={item.image} alt="" />
                    </button>
                ))}
            </div>

            <div className={classNames(classes['gallery__modal'], selected ? classes['gallery__modal-active'] : classes['gallery__modal'])}>
                <button onClick={hideGallery} className={classes['gallery__modal-hideButton']}><FontAwesomeIcon icon={faXmark} /></button>
                <div className={classes['gallery__modal-box']}>
                    <Carousel className={classes['gallery__modal-carousel']}>
                        {gallery.map((item) => (
                            <div key={item.id} className={classes['gallery__modal-carousel-page']}>
                                <img src={item.image} alt='laboratory' />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Gallery