<template>
    <div id="top" class="landing-page">
        <header class="site-header" :class="{ 'site-header--scrolled' : isScrolled }">
            <div class="shell site-header__inner">
                <BrandLogo />

                <nav class="desktop-nav" aria-label="Основная навигация">
                    <a href="#possibilities">Возможности</a>
                    <a href="#workflow">Как это работает</a>
                    <a href="#student-space">Для ученика</a>
                    <a href="#development">Что дальше</a>
                    <a :href="demoUrl">Демо</a>
                </nav>

                <a class="button button--small button--dark" :href="appUrl">
                    Открыть Klick
                    <IconArrowUpRight :size="16" />
                </a>
            </div>
        </header>

        <main>
            <section class="hero section-pad">
                <div class="hero-orb hero-orb--left"></div>
                <div class="hero-orb hero-orb--right"></div>
                <div class="hero-ink-splat" aria-hidden="true"><span></span><span></span><span></span></div>
                <div class="shell hero__content">
                    <div class="hero__copy">
                        <div class="eyebrow"><IconSparkles :size="15" /> Рабочее пространство преподавателя</div>
                        <h1 aria-label="Преподавание — в один Klick">
                            <span class="hero__title-main">Преподавание</span>
                            <span class="hero__title-signature"><i>в один</i><img src="/logo.svg" alt="Klick"></span>
                        </h1>
                        <p class="hero__lead">
                            Расписание, ученики, задания, учебные планы, материалы и оплаты — в одном рабочем пространстве.
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
                            <li><IconCheck :size="14" /> Быстрый старт</li>
                            <li><IconCheck :size="14" /> Кабинет ученика</li>
                            <li><IconCheck :size="14" /> Всё связано между собой</li>
                        </ul>
                    </div>

                    <div class="hero__visual">
                        <a class="demo-gateway" :href="demoUrl" aria-label="Открыть демо-пространство Klick">
                            <span class="demo-gateway__drop demo-gateway__drop--one"></span>
                            <span class="demo-gateway__drop demo-gateway__drop--two"></span>
                            <header><span>Демо-пространство</span><IconArrowUpRight :size="19" /></header>
                            <div class="demo-gateway__body">
                                <img src="/logo.svg" alt="">
                                <span class="demo-gateway__label">Можно нажимать всё</span>
                                <h2>Настоящий Klick.<br>Уже с готовыми данными.</h2>
                                <p>Расписание, ученики, задания и оплаты заполнены моками — исследуйте платформу в своём темпе.</p>
                                <ul>
                                    <li><IconCheck :size="14" /> Без настройки</li>
                                    <li><IconCheck :size="14" /> Без риска</li>
                                    <li><IconCheck :size="14" /> Все основные сценарии</li>
                                </ul>
                            </div>
                            <footer><span>Войти в кабинет преподавателя</span><i><IconArrowRight :size="18" /></i></footer>
                        </a>
                    </div>
                </div>

                <div class="context-strip" aria-label="Что заменяет Klick">
                    <div class="shell context-strip__inner">
                    <p>Вместо вкладок, таблиц и переписок — <strong>одно пространство Klick</strong></p>
                    <div>
                        <span><IconCalendarDays :size="17" /> Календарь</span>
                        <i></i>
                        <span><IconMessageSquareText :size="17" /> Чаты</span>
                        <i></i>
                        <span><IconVideo :size="17" /> Видеозвонки </span>
                        <i></i>
                        <span><IconVideo :size="17" /> Интерактивная доска </span>
                        <i></i>
                        <span><IconFolderOpen :size="17" /> Материалы</span>
                    </div>
                    
                    </div>
                </div>
            </section>

            <section id="possibilities" class="section-pad features-section">
                <div class="shell">
                    <div class="section-heading">
                        <div>
                            <span class="section-kicker">Рабочий день без переключений</span>
                            <h2>Все сервисы в одном пространстве.</h2>
                        </div>
                        <p>
                            Каждый модуль продолжает предыдущий: урок появляется в календаре, материалы остаются у ученика, а выполненная работа сразу ждёт проверки.
                        </p>
                    </div>

                    <CapabilityShowcase />
                </div>
            </section>

            <section id="workflow" class="section-pad workflow-section">
                <div class="shell workflow-shell">
                    <div class="workflow-copy">
                        <span class="section-kicker">От плана до результата</span>
                        <h2>Весь путь ученика остаётся перед глазами</h2>
                        <p>
                            Klick связывает организацию занятий и само обучение. Ничего не приходится переносить вручную между календарём, папками и таблицами.
                        </p>
                        <a class="text-link" :href="appUrl">Попробовать рабочий процесс <IconArrowRight :size="17" /></a>
                    </div>

                    <ol class="workflow-list">
                        <li v-for="(step, index) in workflow" :key="step.title">
                            <span class="workflow-list__number">{{ index + 1 }}</span>
                            <div>
                                <h3>{{ step.title }}</h3>
                                <p>{{ step.text }}</p>
                            </div>
                            <span class="workflow-list__icon"><component :is="step.icon" :size="20" /></span>
                        </li>
                    </ol>
                </div>
            </section>

            <section id="student-space" class="section-pad student-section">
                <div class="shell student-shell">
                    <div class="student-preview" aria-label="Пример личного кабинета ученика">
                        <div class="student-preview__top">
                            <span class="student-preview__logo"><img src="/logo.svg" alt=""></span>
                            <span>Главная</span><span>Календарь</span><span>Домашние задания</span>
                            <i><IconBell :size="16" /></i>
                        </div>
                        <div class="student-preview__body">
                            <header><small>Добрый день, Александр!</small><b>Что сегодня в плане</b></header>
                            <div class="student-preview__grid">
                                <article class="student-next-lesson">
                                    <span>Следующий урок</span>
                                    <strong>Сегодня, 12:30</strong>
                                    <p>Английский язык · Анна Смирнова</p>
                                    <button type="button">Подключиться к уроку</button>
                                </article>
                                <article class="student-task-card">
                                    <span>Домашнее задание</span>
                                    <strong>Упражнения на Present Perfect</strong>
                                    <p>Срок: завтра, 20:00</p>
                                    <div><i></i><em>Прикреплено 2 файла</em></div>
                                </article>
                            </div>
                            <div class="student-plan-card">
                                <span><b>Учебный план · Английский B1</b><small>Текущая тема: Present Perfect</small></span>
                                <em>68%</em>
                                <i><span></span></i>
                            </div>
                        </div>
                    </div>

                    <div class="student-copy">
                        <span class="section-kicker">Один ритм для двоих</span>
                        <h2>Ученику тоже понятно, что делать дальше</h2>
                        <p>
                            В личном кабинете — ближайший урок, задания, тесты, материалы, учебный план и комментарии преподавателя. Без поиска нужной ссылки в переписке.
                        </p>
                        <ul>
                            <li><IconCircleCheck :size="18" /><span><b>Ничего не теряется</b><small>Файлы и обратная связь остаются рядом с работой.</small></span></li>
                            <li><IconCircleCheck :size="18" /><span><b>Виден прогресс</b><small>Темы, тесты и статусы заданий собраны в одном месте.</small></span></li>
                            <li><IconCircleCheck :size="18" /><span><b>Меньше лишних вопросов</b><small>Сроки и следующие действия всегда перед глазами.</small></span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="section-pad principles-section">
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

            <FutureRoadmap />

            <section class="final-cta section-pad">
                <div class="shell final-cta__card">
                    <div class="final-cta__spark final-cta__spark--one"></div>
                    <div class="final-cta__spark final-cta__spark--two"></div>
                    <span class="eyebrow eyebrow--dark"><IconSparkles :size="15" /> Меньше рутины между уроками</span>
                    <h2>Соберите преподавание<br>в одном Klick</h2>
                    <p>Начните с расписания и учеников. Остальные инструменты уже будут рядом, когда понадобятся.</p>
                    <a class="button button--accent button--large" :href="appUrl">
                        Открыть Klick
                        <IconArrowRight :size="18" />
                    </a>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="shell site-footer__main">
                <div>
                    <BrandLogo />
                    <p>Рабочее пространство для репетиторов и онлайн-преподавателей.</p>
                </div>
                <nav aria-label="Навигация в подвале">
                    <a href="#possibilities">Возможности</a>
                    <a href="#workflow">Как это работает</a>
                    <a href="#student-space">Для ученика</a>
                    <a href="#development">Что дальше</a>
                    <a :href="demoUrl">Демо</a>
                    <a :href="appUrl">Войти</a>
                </nav>
            </div>
            <div class="shell site-footer__bottom">
                <span>© {{ currentYear }} Klick</span>
                <span>Преподавание — в один клик</span>
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
        Check as IconCheck,
        CircleCheck as IconCircleCheck,
        FolderOpen as IconFolderOpen,
        GraduationCap as IconGraduationCap,
        Layers3 as IconLayers3,
        MessageSquareText as IconMessageSquareText,
        Play as IconPlay,
        Video as IconVideo,
        Presentation as IconPresentation,
        ShieldCheck as IconShieldCheck,
        Sparkles as IconSparkles,
        WalletCards as IconWalletCards,
        WandSparkles as IconWandSparkles
    } from '@lucide/vue';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    import BrandLogo from './components/BrandLogo.vue';
    import CapabilityShowcase from './components/CapabilityShowcase.vue';
    import FutureRoadmap from './components/FutureRoadmap.vue';
    const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173/auth/sign';
    const demoUrl = import.meta.env.VITE_DEMO_URL || `${appUrl}${appUrl.includes('?') ? '&' : '?'}demo=true`;
    const currentYear = new Date().getFullYear();
    const isScrolled = ref(false);

    const updateHeader = () => isScrolled.value = window.scrollY > 18;

    onMounted(() => {
        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive : true });
    });

    onBeforeUnmount(() => window.removeEventListener('scroll', updateHeader));

    const workflow = [
        { title : 'Запланируйте урок', text : 'Выберите ученика, время и условия занятия.', icon : IconCalendarDays },
        { title : 'Проведите занятие', text : 'Всё нужное — материалы, план и история ученика — уже рядом.', icon : IconGraduationCap },
        { title : 'Назначьте практику', text : 'Домашнее задание или тест отправятся в кабинет ученика.', icon : IconBookOpen },
        { title : 'Дайте обратную связь', text : 'Проверьте файлы, оставьте комментарии и зафиксируйте результат.', icon : IconMessageSquareText },
        { title : 'Закройте организационные вопросы', text : 'Отметьте занятие и сохраните оплату в истории.', icon : IconWalletCards }
    ];

    const principles = [
        { title : 'Понятно с первого дня', text : 'Знакомые сценарии и спокойный интерфейс без перегруженных панелей.', icon : IconWandSparkles },
        { title : 'Связано по смыслу', text : 'Данные ученика продолжают путь из календаря в задания, план и оплаты.', icon : IconLayers3 },
        { title : 'Разные роли — общий контекст', text : 'Преподаватель управляет процессом, ученик видит только то, что нужно ему.', icon : IconShieldCheck }
    ];
</script>
