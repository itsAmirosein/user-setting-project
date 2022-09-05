import { initReactI18next } from 'react-i18next'
import i18 from 'i18next'
import { enTranslation } from './en'
import { frTranslation } from './fr'


i18
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            fr: { translation: frTranslation },
        },
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        }
    })

export function changeLanguage(lang: 'en' | 'fr') {
    i18.changeLanguage(lang)
}

export function checkLanguage() {
    const { pathname } = window.location;
     if (pathname.includes('/en')) {
        return 'en'
    }
    else if (pathname.includes('/')) {
        return 'fr'
    }
    else {
        return null
    }
}
