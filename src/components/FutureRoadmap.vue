<template>
    <section id="development" class="future-section section-pad viewport-section">
        <div class="shell">
            <div class="future-heading">
                <div>
                    <span class="section-kicker">Klick развивается</span>
                    <h2>Больше возможностей для роста</h2>
                </div>
                <div>
                    <span class="future-heading__badge"><IconSparkles :size="14" /> В планах</span>
                    <p>Следующие инструменты помогут находить друг друга, готовиться к урокам быстрее и создавать новые форматы обучения.</p>
                </div>
            </div>

            <div class="development-showcase">
                <div class="development-tabs" role="tablist" aria-label="Планы развития Klick">
                    <button
                        v-for="item in developments"
                        :key="item.id"
                        type="button"
                        role="tab"
                        class="development-tab"
                        :class="{ 'development-tab--active' : activeId === item.id }"
                        :aria-selected="activeId === item.id"
                        @click="activeId = item.id"
                    >
                        <span><component :is="item.icon" :size="20" /></span>
                        <b>{{ item.title }}</b>
                        <IconChevronRight :size="16" />
                    </button>
                </div>

                <Transition name="capability-fade" mode="out-in">
                    <article :key="activeDevelopment.id" class="development-detail" role="tabpanel">
                        <div class="development-detail__copy">
                            <span class="future-heading__badge"><IconSparkles :size="13" /> Планируем</span>
                            <h3>{{ activeDevelopment.title }}</h3>
                            <p>{{ activeDevelopment.text }}</p>
                            <span class="development-card__tags"><i v-for="tag in activeDevelopment.tags" :key="tag">{{ tag }}</i></span>
                        </div>

                        <div class="development-card__visual" aria-hidden="true">
                            <div v-if="activeId === 'search'" class="development-search">
                                <span class="development-search__field"><IconSearch :size="14" /> Английский язык, B1</span>
                                <div><i>АС</i><span><b>Анна Смирнова</b><small>Английский · 4,9 ★</small></span><em>от 1 500 ₽</em></div>
                                <div><i>ММ</i><span><b>Иван Иванов</b><small>Ищет преподавателя</small></span><em>B1</em></div>
                            </div>

                            <div v-else-if="activeId === 'ai'" class="development-ai">
                                <span><IconBot :size="17" /> AI-помощник</span>
                                <p>Составь план урока по Present Perfect для уровня B1 на 60 минут.</p>
                                <div><i></i><i></i><i></i><i></i></div>
                                <em><IconSparkles :size="13" /> План урока готов</em>
                            </div>

                            <div v-else-if="activeId === 'ide'" class="development-ide">
                                <header><span>main.js</span><em>▶ Запустить</em></header>
                                <pre><i>1</i> <b>const</b> greeting = <u>'Hello, Klick!'</u>;
<i>2</i>
<i>3</i> console.log(greeting);</pre>
                                <footer><span>Терминал</span><b>Hello, Klick!</b></footer>
                            </div>

                            <div v-else-if="activeId === 'mobile'" class="development-mobile">
                                <div class="development-phone"><header><img src="/logo.svg" alt=""><IconBell :size="12" /></header><small>Следующий урок</small><b>Сегодня, 12:30</b><span>Английский язык</span><button type="button">Открыть урок</button></div>
                                <span><b>Всё важное рядом</b><small>Уроки, задания и сообщения — в телефоне.</small></span>
                            </div>

                            <div v-else-if="activeId === 'gamification'" class="development-game">
                                <span class="development-game__level"><IconTrophy :size="19" /><b>Уровень 7</b><small>Знаток грамматики</small></span>
                                <div><span><i style="width: 72%"></i></span><em>720 / 1000 XP</em></div>
                                <section><span>🔥 12 дней подряд</span><span>🏅 8 достижений</span></section>
                            </div>

                            <div v-else class="development-market">
                                <span><IconSearch :size="14" /> Найти материал или тест</span>
                                <section><article><i><IconBookOpen :size="18" /></i><b>English B1 Pack</b><small>24 материала</small></article><article><i><IconClipboardCheck :size="18" /></i><b>Grammar Tests</b><small>18 тестов</small></article></section>
                            </div>
                        </div>
                    </article>
                </Transition>
            </div>
        </div>
    </section>

    <section id="roadmap" class="roadmap-section section-pad viewport-section">
        <div class="shell roadmap-card">
            <div class="roadmap-card__heading">
                <div><span class="section-kicker">Дорожная карта</span><h3>Куда движется Klick</h3></div>
                <p>План развития построен вокруг роста преподавателя: от поиска учеников и подготовки контента до новых форматов занятий и собственной экосистемы.</p>
            </div>

            <ol class="roadmap-list">
                <li v-for="(stage, index) in roadmap" :key="stage.title" :class="{ 'roadmap-list__item--active' : index === 0 }">
                    <span class="roadmap-list__number">0{{ index + 1 }}</span>
                    <div><em>{{ stage.label }}</em><h4>{{ stage.title }}</h4><p>{{ stage.text }}</p><span class="roadmap-list__tags"><i v-for="tag in stage.tags" :key="tag">{{ tag }}</i></span></div>
                </li>
            </ol>

            <div class="roadmap-card__note"><IconInfo :size="14" /> Порядок этапов может меняться по результатам обратной связи пользователей.</div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import {
        Bell as IconBell,
        BookOpen as IconBookOpen,
        Bot as IconBot,
        ChevronRight as IconChevronRight,
        ClipboardCheck as IconClipboardCheck,
        Code2 as IconCode2,
        Gamepad2 as IconGamepad2,
        Info as IconInfo,
        Search as IconSearch,
        ShoppingBag as IconShoppingBag,
        Smartphone as IconSmartphone,
        Sparkles as IconSparkles,
        Trophy as IconTrophy,
        UserRoundSearch as IconUserRoundSearch
    } from '@lucide/vue';
    import { computed, ref } from 'vue';

    const developments = [
        { id : 'search', title : 'Поиск учеников и репетиторов', text : 'Каталог с понятными профилями, фильтрами и подбором специалиста или ученика под конкретную цель.', tags : ['Профили', 'Умный поиск', 'Рекомендации'], icon : IconUserRoundSearch },
        { id : 'ai', title : 'AI-помощник для учителей', text : 'Поможет подготовить план урока, создать упражнения, адаптировать материал и разобрать прогресс ученика.', tags : ['Планы уроков', 'Генерация заданий', 'Аналитика'], icon : IconBot },
        { id : 'ide', title : 'IDE для преподавания программирования', text : 'Совместное написание и запуск кода прямо на занятии с заданиями, терминалом и комментариями преподавателя.', tags : ['Совместный код', 'Терминал', 'Задания'], icon : IconCode2 },
        { id : 'mobile', title : 'Мобильное приложение', text : 'Расписание, сообщения, задания и материалы всегда рядом — для преподавателя и ученика.', tags : ['iOS', 'Android', 'Push-уведомления'], icon : IconSmartphone },
        { id : 'gamification', title : 'Геймификация интерактивных уроков', text : 'Прогресс, серии занятий, достижения и игровые механики, которые поддерживают мотивацию ученика.', tags : ['Достижения', 'XP', 'Интерактив'], icon : IconGamepad2 },
        { id : 'marketplace', title : 'Маркетплейс учебных материалов', text : 'Материалы, тесты и учебные пособия от преподавателей — с быстрым добавлением в своё пространство.', tags : ['Материалы', 'Тесты', 'Учебные пособия'], icon : IconShoppingBag }
    ] as const;

    const roadmap = [
        { label : 'Поиск и рост', title : 'Ученики и преподаватели находят друг друга', text : 'Публичные профили, поиск по целям и предметам, рекомендации и удобный первый контакт.', tags : ['Поиск', 'Профили', 'Подбор'] },
        { label : 'Умные инструменты', title : 'AI помогает готовиться к урокам', text : 'Создание планов, упражнений и адаптация материалов с учётом уровня и прогресса ученика.', tags : ['AI-помощник', 'Контент', 'Аналитика'] },
        { label : 'Новые форматы', title : 'Больше интерактива на занятии', text : 'Среда для программирования, игровые механики и новые способы совместной работы.', tags : ['IDE', 'Геймификация', 'Интерактив'] },
        { label : 'Экосистема Klick', title : 'Обучение доступно везде', text : 'Мобильное приложение и маркетплейс готовых материалов, тестов и учебных пособий.', tags : ['Mobile', 'Маркетплейс', 'Сообщество'] }
    ];

    const activeId = ref<(typeof developments)[number]['id']>('search');
    const activeDevelopment = computed(() => developments.find(item => item.id === activeId.value) ?? developments[0]);
</script>
