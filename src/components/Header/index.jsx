import React, { useState } from 'react'
import classes from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import Container from '../../layout/Container'
import logo from '../../images/logo.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-scroll'
import './styles.css'
import arrow from '../../images/arrow.svg'
import classNames from 'classnames'
import { useRef } from 'react'
import { useEffect } from 'react'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAdaptive, setOpenAdaptive] = useState(false);
  const [header, setHeader] = useState(false)
  const btnRef = useRef()
  const btnAdaptiveRef = useRef()


  useEffect(() => {
    const closeDropdown = e => {
      if (e.path[0] !== btnRef.current) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    return () => document.body.removeEventListener('click', closeDropdown)
  }, [])


  useEffect(() => {
    const closeAdaptiveDropdown = e => {
      if (e.path[0] !== btnAdaptiveRef.current) {
        setOpenAdaptive(false)
      }
    }

    document.body.addEventListener('click', closeAdaptiveDropdown)

    return () => document.body.removeEventListener('click', closeAdaptiveDropdown)
  }, [])

  const [selected, setSelected] = useState(false)
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setSelected(false)
      }
    };

    document.addEventListener("mousedown", handler)

    return () => {
      document.addEventListener("mousedown", handler)
    }
  })

  const { t, i18n } = useTranslation()


  const changeLanguage = (lang) => {
    setIsOpen(!isOpen);
    i18n.changeLanguage(lang)

  }

  const [click, setClick] = useState(false)

  const closeMenu = () => {
    setClick(false)
    setSelected(false)
  }

  const setShadow = () => {
    if (window.scrollY > 0) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  window.addEventListener('scroll', setShadow)

  return (
    <header className={classNames(classes['header'], header ? classes['header__active'] : "")}>

      <Container className={classes['header__container']}>
        <div className={classes['header__left']}>
          <Link to='category'><img src={logo} alt="" className={classNames(classes['header__left-logo'], header ? classes['header__left-logo-active'] : "")} /></Link>
          <h2 className={classNames(classes['header__left-title'], header ? classes['header__left-title-active'] : "")}>
            OOO “Topfin Result”
            <span>{t("header.text")}</span>
          </h2>
        </div>
        <div className={classes['header__right']}>
          <div className={classes['header__right-top']}>
            <a href="tel:+99871 203 03 33" className={classes['header__right-phone']}>
              <span> <FontAwesomeIcon icon={faPhone} className={classes['header__right-icon']} /></span> +99871 203 03 33
            </a>
            <a href="tel:+99871 513 03 33" className={classes['header__right-phone']}>
              <span> <FontAwesomeIcon icon={faPhone} className={classes['header__right-icon']} /></span> +99871 513 03 33
            </a>

            <div className={classes['dropdown']}>
              <button ref={btnRef} onClick={() => setIsOpen(prev => !prev)} className={classes['dropdown-btn']}>
                {localStorage.getItem('i18nextLng')}
                <img
                  src={arrow}
                  alt=""
                  className={classNames(classes['dropdown__arrow-icon'], isOpen ? classes['dropdown__arrow-icon_active'] : '')}
                />
              </button>
              <div
                className={`dropdown-items ${isOpen ? "isVisible" : "isHidden"}`}
              >
                <div className={classes["dropdown-item"]}>
                  <button
                    className={classes["dropdown__link"]}
                    onClick={() => changeLanguage("Ru")}
                  >
                    Ru
                  </button>
                </div>
                <div className={classes["dropdown-item"]}>
                  <button
                    className={classes["dropdown__link"]}
                    onClick={() => changeLanguage("Uz")}
                  >
                    Uz
                  </button>
                </div>
              </div>
            </div>

          </div>
          <nav className={classes['header__right-bottom']}>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className={click ? "nav-item active" : "nav-item"}>
                <Link to='about' spy={true} offset={-120} duration={500} onClick={closeMenu} className={classes['header__right-bottom-link']} >{t("header.about")}</Link>
              </li>
              <li className={click ? "nav-item active" : "nav-item"}>
                <Link to='services' spy={true} offset={-120} duration={500} onClick={closeMenu} className={classes['header__right-bottom-link']} >{t("header.services")}</Link>
              </li>
              <li className={click ? "nav-item active" : "nav-item"}>
                <Link to='gallery' spy={true} offset={-120} duration={500} onClick={closeMenu} className={classes['header__right-bottom-link']} >{t("header.gallery")}</Link>
              </li>
              <li className={click ? "nav-item active" : "nav-item"}>
                <Link to='contacts' spy={true} offset={-390} duration={500} onClick={closeMenu} className={classes['header__right-bottom-link']} >{t("header.contacts")}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <button onClick={() => setSelected(!selected)} className={classNames(classes['menu'], selected ? classes['menu-active'] : classes['menu'])}>
          <div className={classNames(classes['menu-icon'], classes['first'], selected ? classes['menu-icon-active'] : classes['menu-icon'])}></div>
          <div className={classNames(classes['menu-icon'], classes['second'], selected ? classes['menu-icon-active'] : classes['menu-icon'])}></div>
          <div className={classNames(classes['menu-icon'], classes['third'], selected ? classes['menu-icon-active'] : classes['menu-icon'])}></div>
        </button>

      </Container>

      <div ref={menuRef} className={classNames(classes['navbar'], selected ? classes['navbar-active'] : classes['navbar'])}>
        <Container className={classes['navbar-container']}>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className={click ? "nav-item active" : "nav-item"}>
              <Link to='about' spy={true} offset={-150} duration={500} onClick={closeMenu} className={classes['navbar-link']} >{t("header.about")}</Link>
            </li>
            <li className={click ? "nav-item active" : "nav-item"}>
              <Link to='services' spy={true} offset={-100} duration={500} onClick={closeMenu} className={classes['navbar-link']} >{t("header.services")}</Link>
            </li>
            <li className={click ? "nav-item active" : "nav-item"}>
              <Link to='gallery' spy={true} offset={-100} duration={500} onClick={closeMenu} className={classes['navbar-link']} >{t("header.gallery")}</Link>
            </li>
            <li className={click ? "nav-item active" : "nav-item"}>
              <Link to='contacts' spy={true} offset={-305} duration={500} onClick={closeMenu} className={classes['navbar-link']} >{t("header.contacts")}</Link>
            </li>
          </ul>
          <div className={classes['navbar-phone']}>
            <a href="tel:+99871 203 03 33" className={classes['navbar-phone-number']}>
              <span> <FontAwesomeIcon icon={faPhone} className={classes['navbar-icon']} /></span> +99871 203 03 33
            </a>
            <a href="tel:+99871 513 03 33" className={classes['navbar-phone-number']}>
              <span> <FontAwesomeIcon icon={faPhone} className={classes['navbar-icon']} /></span> +99871 513 03 33
            </a>
          </div>
          <div className={`dropdown`}>
            <button ref={btnAdaptiveRef} onClick={() => setOpenAdaptive(prev => !prev)} className={classes['dropdown-btn']}>
              {localStorage.getItem('i18nextLng')}
              <img
                src={arrow}
                alt=""
                className={classNames('dropdown__arrow-icon', openAdaptive ? 'dropdown__arrow-icon_active' : '')}
              />
            </button>
            <div
              className={`dropdown-items ${openAdaptive ? "isVisible" : "isHidden"
                }`}
            >
              <div className="dropdown-item">
                <button
                  className={classes["dropdown__link"]}
                  onClick={() => changeLanguage("Ru")}
                >
                  Ru
                </button>
              </div>
              <div className="dropdown-item">
                <button
                  className={classes["dropdown__link"]}
                  onClick={() => changeLanguage("Uz")}
                >
                  Uz
                </button>
              </div>
            </div>
          </div>

        </Container>
      </div>
    </header >
  )
}

export default Header