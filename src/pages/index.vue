<template>
    <div id="top" class="landing-page landing-page--workshop">
        <header class="site-header" :class="{ 'site-header--scrolled' : isScrolled }">
            <div class="shell site-header__inner">
                <BrandLogo />

                <nav class="desktop-nav" aria-label="Основная навигация">
                    <a href="#connections">Почему Klick</a>
                    <a href="#possibilities">Возможности</a>
                    <a href="#lesson-journey">Как это работает</a>
                    <a href="#student-space">Для ученика</a>
                    <!-- <a href="#start">Что дальше</a> -->
                    <a :href="demoUrl">Демо</a>
                </nav>

                <a class="button button--small button--dark" :href="appUrl">
                    Открыть Klick
                    <IconArrowUpRight :size="16" />
                </a>
            </div>
        </header>

        <main>
            <section id="hero" class="hero section-pad">
                <div class="hero-orb hero-orb--left"></div>
                <div class="hero-orb hero-orb--right"></div>
                <div class="hero-ink-splat" aria-hidden="true"><span></span><span></span><span></span></div>
                <div class="shell hero__content">
                    <div class="hero__copy">
                        <div class="eyebrow"><IconSparkles :size="15" /> Мастерская преподавателя</div>
                        <h1 aria-label="Преподавание в один клик">
                            <span class="hero__title-main">Преподавание</span>
                            <span class="hero__title-signature"><i>в один</i><b>клик</b></span>
                        </h1>
                        <p class="hero__lead">
                            Все для учебы и обучения — в одном рабочем пространстве.
                        </p>
                        <p class="hero__annotation" aria-hidden="true">одна линия от первого урока до результата ↗</p>
                        <div class="hero__actions">
                            <a class="button button--accent" :href="appUrl">
                                Начать работу
                                <IconArrowRight :size="18" />
                            </a>
                            <a class="button button--ghost" :href="demoUrl">
                                Открыть демо
                                <IconPlay :size="17" />
                            </a>
                        </div>
                        <ul class="hero__proof" aria-label="Ключевые преимущества">
                            <li><span class="trust-pin" aria-hidden="true"></span> Быстрый старт</li>
                            <li><span class="trust-pin" aria-hidden="true"></span> Личное рабочее пространство</li>
                            <li><span class="trust-pin" aria-hidden="true"></span> Всё связано между собой</li>
                        </ul>
                    </div>

                    <div class="hero__visual">
                        <div class="workshop-sticker workshop-sticker--lesson" aria-hidden="true">версия<br><b>0.1.0</b></div>
                        
                        <div class="workshop-pencil" aria-hidden="true"></div>
                        <article class="demo-gateway">
                            <span class="demo-gateway__drop demo-gateway__drop--one"></span>
                            <span class="demo-gateway__drop demo-gateway__drop--two"></span>
                            <header><span>Демо-пространство</span></header>
                            <div class="demo-gateway__body">
                                <div class="demo-gateway__brand" aria-label="Klick demo">
                                    <BrandMark />
                                    <span aria-hidden="true">demo</span>
                                </div>
                                <span class="demo-gateway__label">Можно нажимать всё</span>
                                <h2>Платформа Klick,<br>но уже с готовыми данными.</h2>
                                <p>Все инструменты платформы настроены и заполнены тестовыми данными  — исследуйте платформу в своём темпе.</p>
                                <ul>
                                    <li><span class="trust-pin" aria-hidden="true"></span> Без регистрации</li>
                                    <li><span class="trust-pin" aria-hidden="true"></span> Без настройки</li>
                                    <li><span class="trust-pin" aria-hidden="true"></span> Все основные сценарии</li>
                                </ul>
                            </div>
                            <footer>
                                <a
                                    class="demo-gateway__footer-link"
                                    :href="demoUrl"
                                    aria-label="Перейти в демо-пространство Klick"
                                >
                                    <span>Перейти в демо-пространство Klick</span>
                                    <span class="demo-gateway__footer-icon" aria-hidden="true">
                                        <IconArrowRight :size="18" />
                                    </span>
                                </a>
                            </footer>
                        </article>
                    </div>
                </div>
            </section>

            <IntegrationTangle />

            <section id="possibilities" class="section-pad features-section">
                <div class="shell">
                    <div class="section-heading">
                        <div>
                            <span class="section-kicker">Рабочий день без переключений</span>
                            <h2>Все сервисы в одном пространстве.</h2>
                        </div>
                        <p>
                            Каждый модуль продолжает предыдущий. <br> Урок появляется в календаре, материалы остаются у ученика, а выполненная работа сразу ждёт проверки.
                        </p>
                    </div>

                    <CapabilityShowcase />
                </div>
            </section>

            <LessonJourney />

            <RoleWorkspace />

            <section id="system" class="section-pad principles-section">
                <div class="shell">
                    <div class="section-heading section-heading--center">
                        <div>
                            <span class="section-kicker">Удобная система</span>
                            <h2>Сделано вокруг реальной работы преподавателя</h2>
                        </div>
                    </div>
                    <div class="principles-grid">
                        <article v-for="principle in principles" :key="principle.title">
                            <span><component :is="principle.icon" :size="21" /></span>
                            <h3>{{ principle.title }}</h3>
                            <p>{{ principle.text }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <ValueCalculator />

            <section id="start" class="section-pad start-section">
                <div class="shell">
                    <div class="start-heading">
                        <span class="section-kicker">Перейти проще, чем кажется</span>
                        <h2>Не нужно переносить<br>всю работу за один день</h2>
                        <p>Начните с расписания и учеников. Подключайте остальные инструменты тогда, когда они действительно понадобятся.</p>
                    </div>
                    <ol class="start-steps">
                        <li v-for="(step,index) in startSteps" :key="step.title"><span>{{index+1}}</span><div><small>{{step.note}}</small><h3>{{step.title}}</h3><p>{{step.text}}</p></div></li>
                    </ol>
                    <div class="trust-note"><span class="trust-pin"></span><div><b>Ваши материалы и работы учеников не становятся публичными</b><p>Klick показывает каждой пользователю только нужные ему данные. Развитие платформы остаётся прозрачным, а поддержку можно попросить прямо из рабочего пространства.</p></div><a class="button button--ghost" :href="demoUrl">Сначала открыть демо <IconPlay :size="16" /></a></div>
                </div>
            </section>

            <!-- <FutureRoadmap /> -->

            <section id="final" class="final-cta section-pad">
                <div class="shell final-cta__card">
                    <div class="final-cta__spark final-cta__spark--one"></div>
                    <div class="final-cta__spark final-cta__spark--two"></div>
                    <span class="eyebrow eyebrow--dark"><IconSparkles :size="15" /> Меньше рутины между уроками</span>
                    <h2>Соберите преподавание<br>в одном Klick</h2>
                    <p>Начните с расписания и учеников. Остальные инструменты уже будут рядом, когда понадобятся.</p>
                    <div class="final-actions">
                    <a class="button button--accent button--large" :href="demoUrl">
                        Открыть демо
                        <IconArrowRight :size="18" />
                    </a>
                    <a class="button button--ghost button--large" :href="appUrl">Начать работу</a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <span class="site-footer__thread" aria-hidden="true"></span>
            <span class="site-footer__scribble" aria-hidden="true">всё для урока — рядом ↗</span>
            <div class="shell site-footer__main">
                <div class="site-footer__brand-card">
                    <span class="site-footer__pin" aria-hidden="true"></span>
                    <BrandLogo />
                    <p>Рабочее пространство для репетиторов и онлайн-преподавателей.</p>
                    <small>Преподавание — в один клик</small>
                </div>

                <div class="site-footer__map">
                    <span>Карта мастерской</span>
                    <nav aria-label="Навигация в подвале">
                        <a href="#connections"><small>01</small> Почему Klick</a>
                        <a href="#possibilities"><small>02</small> Возможности</a>
                        <a href="#lesson-journey"><small>03</small> Как это работает</a>
                        <a href="#student-space"><small>04</small> Для ученика</a>
                        <!-- <a href="#start"><small>05</small> Что дальше</a> -->
                    </nav>
                </div>

                <div class="site-footer__demo-card">
                    <span>Можно начать с демо</span>
                    <h3>Загляните внутрь Klick</h3>
                    <p>Основные сценарии уже заполнены мок-данными — можно спокойно всё посмотреть.</p>
                    <a :href="demoUrl">Открыть демо <IconArrowUpRight :size="17" /></a>
                </div>
            </div>
            <div class="shell site-footer__bottom">
                <span>© {{ currentYear }} Klick</span>
                <span>Сделано для тех, кто учит и обучается</span>
                <a href="#top">Наверх <span aria-hidden="true">↑</span></a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
    import {
        ArrowRight as IconArrowRight,
        ArrowUpRight as IconArrowUpRight,
        Bell as IconBell,
        BookOpen as IconBookOpen,
        CalendarDays as IconCalendarDays,
        FolderOpen as IconFolderOpen,
        Layers3 as IconLayers3,
        MessageSquareText as IconMessageSquareText,
        Play as IconPlay,
        Video as IconVideo,
        Presentation as IconPresentation,
        ShieldCheck as IconShieldCheck,
        Sparkles as IconSparkles,
        WandSparkles as IconWandSparkles,
        FileCheckCorner as IconFileCheckCorner,
        ClipboardCheck as IconClipboardCheck
    } from '@lucide/vue';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    import BrandLogo from '~/components/BrandLogo.vue';
    import BrandMark from '~/components/BrandMark.vue';
    import CapabilityShowcase from '~/components/CapabilityShowcase.vue';
    import FutureRoadmap from '~/components/FutureRoadmap.vue';
    import IntegrationTangle from '~/components/IntegrationTangle.vue';
    import LessonJourney from '~/components/LessonJourney.vue';
    import RoleWorkspace from '~/components/RoleWorkspace.vue';
    import ValueCalculator from '~/components/ValueCalculator.vue';

    const { appUrl, demoUrl } = useRuntimeConfig().public;
    const currentYear = new Date().getFullYear();
    const isScrolled = ref(false);

    const updateHeader = () => isScrolled.value = window.scrollY > 18;

    onMounted(() => {
        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive : true });
    });

    onBeforeUnmount(() => window.removeEventListener('scroll', updateHeader));

    const principles = [
        { title : 'Понятно с первого дня', text : 'Знакомые сценарии и спокойный интерфейс без перегруженных панелей.', icon : IconWandSparkles },
        { title : 'Связано по смыслу', text : 'Данные ученика продолжают путь из календаря в задания, план и оплаты.', icon : IconLayers3 },
        { title : 'Контекст следует за вами', text : 'После возврата сохраняются фильтры, открытые панели и место, где вы работали.', icon : IconPresentation },
        { title : 'Действия находятся рядом', text : 'Перенос, проверка, материал или оплата доступны там, где возникла задача.', icon : IconCalendarDays },
        { title : 'Разные роли — общий процесс', text : 'Преподаватель управляет, а ученик видит ясный маршрут и следующий шаг.', icon : IconShieldCheck },
        { title : 'Можно начинать постепенно', text : 'Сначала расписание и ученики, затем остальные инструменты по необходимости.', icon : IconBookOpen }
    ];

    const startSteps = [
        { note : '10 минут', title : 'Создайте профиль', text : 'Добавьте предметы, условия занятий и доступное время.' },
        { note : 'без сложного импорта', title : 'Добавьте учеников', text : 'Соберите ближайшее расписание и основной учебный контекст.' },
        { note : 'в своём темпе', title : 'Подключайте инструменты', text : 'Задания, планы, материалы и оплаты появятся тогда, когда понадобятся.' }
    ];
</script>
