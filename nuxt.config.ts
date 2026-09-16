const appUrl = process.env.NUXT_PUBLIC_APP_URL
    || process.env.VITE_APP_URL
    || 'http://localhost:5173/auth/sign';

export default defineNuxtConfig({
    compatibilityDate : '2026-09-16',
    srcDir             : 'src/',
    css                : ['~/style.css'],
    telemetry          : false,
    devtools           : { enabled : false },
    app                : {
        head : {
            htmlAttrs : { lang : 'ru' },
            title     : 'Klick — пространство для преподавателя',
            meta      : [
                { charset : 'utf-8' },
                { name : 'viewport', content : 'width=device-width, initial-scale=1' },
                { name : 'theme-color', content : '#fafaf8' },
                {
                    name    : 'description',
                    content : 'Klick — единое рабочее пространство для репетиторов и онлайн-преподавателей: расписание, ученики, задания, тесты, материалы и оплаты.'
                },
                { property : 'og:title', content : 'Klick — преподавание в один клик' },
                {
                    property : 'og:description',
                    content  : 'Расписание, ученики, задания, учебные планы, материалы и оплаты — в одном рабочем пространстве.'
                },
                { property : 'og:type', content : 'website' }
            ],
            link : [{ rel : 'icon', href : '/favicon.svg' }]
        }
    },
    runtimeConfig : {
        public : {
            appUrl,
            demoUrl : process.env.NUXT_PUBLIC_DEMO_URL
                || process.env.VITE_DEMO_URL
                || `${appUrl}${appUrl.includes('?') ? '&' : '?'}demo=true`
        }
    },
    typescript : {
        typeCheck : true
    }
});
