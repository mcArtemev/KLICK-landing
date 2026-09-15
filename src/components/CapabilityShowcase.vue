<template>
    <div class="capability-showcase">
        <div class="capability-groups" role="tablist" aria-label="Группы возможностей Klick">
            <button
                v-for="group in capabilityGroups"
                :key="group.id"
                type="button"
                role="tab"
                :aria-selected="activeGroup === group.id"
                :class="{ 'capability-group--active' : activeGroup === group.id }"
                @click="selectGroup(group.id)"
            >
                <span>{{ group.marker }}</span>
                <b>{{ group.title }}</b>
                <small>{{ group.subtitle }}</small>
            </button>
        </div>

        <div class="capability-tabs" role="tablist" aria-label="Дополнительные возможности Klick">
            <button
                v-for="item in filteredCapabilities"
                :key="item.id"
                type="button"
                role="tab"
                class="capability-tab"
                :class="{ 'capability-tab--active' : activeId === item.id }"
                :aria-selected="activeId === item.id"
                :aria-controls="`capability-${item.id}`"
                @click="activeId = item.id"
            >
                <span class="capability-tab__icon"><component :is="item.icon" :size="20" /></span>
                <span><b>{{ item.title }}</b><small>{{ item.text }}</small></span>
                <IconChevronRight class="capability-tab__arrow" :size="17" />
            </button>
        </div>

        <Transition name="capability-fade" mode="out-in">
            <article
                :id="`capability-${activeCapability.id}`"
                :key="activeCapability.id"
                class="capability-detail"
                role="tabpanel"
            >
                <div class="capability-detail__copy">
                    <span class="section-kicker">{{ activeCapability.kicker }}</span>
                    <h3>{{ activeCapability.heading }}</h3>
                    <p>{{ activeCapability.description }}</p>
                    <ul>
                        <li v-for="point in activeCapability.points" :key="point">
                            <IconCheck :size="15" /> {{ point }}
                        </li>
                    </ul>
                </div>

                <div class="capability-detail__preview" aria-hidden="true">
                    <div class="showcase-window__bar">
                        <span></span><span></span><span></span>
                        <small>{{ activeCapability.windowTitle }}</small>
                    </div>

                    <div v-if="activeId === 'calendar'" class="showcase-core-calendar">
                        <div class="showcase-toolbar"><b>Сентябрь 2026</b><span>Сегодня · Неделя</span><em>+ Создать событие</em></div>
                        <div class="showcase-core-calendar__grid">
                            <header><span></span><span>ПН<b>14</b></span><span class="is-today">ВТ<b>15</b></span><span>СР<b>16</b></span><span>ЧТ<b>17</b></span><span>ПТ<b>18</b></span></header>
                            <aside><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></aside>
                            <section><i class="calendar-day-focus"></i><em class="calendar-offtime">Нерабочее время</em><article class="event-one"><b>Павел Петров</b><small>12:30 · Урок</small></article><article class="event-two"><b>Иван Ивановов</b><small>16:00 · Урок</small></article></section>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'homework'" class="showcase-core-homework">
                        <div class="showcase-toolbar"><b>Домашние задания</b><span>Ученик · Предмет · Статус</span><em>+ Создать задание</em></div>
                        <div class="showcase-homework-grid">
                            <article><header><span>Английский язык</span><em>На проверке</em></header><b>Эссе «Past Simple»</b><small>Павел Петров · PDF</small><footer><span><IconCalendarDays :size="12" /> До 14 сентября, 20:00</span><strong>Открыть ›</strong></footer></article>
                            <article><header><span>Английский язык</span><em class="tone-success">Сдано</em></header><b>Present Perfect</b><small>Иван Ивановов · DOCX</small><footer><span><IconCalendarDays :size="12" /> До 12 сентября, 18:00</span><strong>Открыть ›</strong></footer></article>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'learning-plan'" class="showcase-core-plan">
                        <div class="showcase-toolbar"><b>Учебные планы</b><span>Предмет · Уровень</span><em>+ Создать план</em></div>
                        <div class="showcase-plan-card">
                            <header><span>B1</span><div><b>Английский язык — B1</b><small>Английский · 4 темы · 8 материалов · 3 теста · 2 ученика</small></div><em>⌃</em></header>
                            <section><article><i>1</i><div><b>Знакомство и цели</b><p>Определяем текущий уровень и задачи обучения</p><small>2 материала · 1 тест · 2 занятия</small></div><span>⋮</span></article><article><i>2</i><div><b>Past Simple</b><p>Правила, маркеры времени и практика</p><small>3 материала · 1 тест · 4 занятия</small></div><span>⋮</span></article><article class="is-final"><i><IconClipboardCheck :size="12" /></i><div><em>ИТОГОВЫЙ ТЕСТ · Вопросов: 12</em><b>Проверка уровня B1</b><small>Английский язык · B1</small></div><span>⋮</span></article></section>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'student-profile'" class="showcase-core-profile">
                        <header><span>АВ</span><div><b>Павел Петров <em>Активен</em></b><small>Английский язык — A1 · alexandr@myklick.ru · С нами с 11 сентября</small></div><i>•••</i></header>
                        <nav><span class="active">Обзор</span><span>Заметки</span><span>Пакет занятий</span><span>Домашние задания</span><span>Материалы</span></nav>
                        <section><article><i><IconCalendarDays :size="17" /></i><div><small>БЛИЖАЙШИЙ УРОК</small><b>Английский язык</b><em>вт, 15 сентября, 12:30 · 60 минут</em></div><strong>›</strong></article><aside><small>ПАКЕТ ЗАНЯТИЙ</small><b>4 <em>из 16 занятий</em></b><span><i></i></span><button>Управлять пакетом</button></aside></section>
                    </div>

                    <div v-else-if="activeId === 'tests'" class="showcase-tests">
                        <div class="showcase-toolbar"><b>Тесты</b><span>Предмет · Уровень</span><em>+ Создать тест</em></div>
                        <div class="showcase-entity-grid">
                            <article>
                                <header><i><IconClipboardCheck :size="16" /></i><span>•••</span></header>
                                <b>Итоговый тест уровня B1</b><small>B1</small>
                                <em class="tone-success">Готов</em>
                                <footer><span>12 вопросов</span><span>45 минут</span></footer>
                            </article>
                            <article>
                                <header><i><IconClipboardCheck :size="16" /></i><span>•••</span></header>
                                <b>Present Perfect</b><small>B1</small>
                                <em>Черновик</em>
                                <footer><span>8 вопросов</span><span>Без ограничения</span></footer>
                            </article>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'materials'" class="showcase-materials">
                        <div class="showcase-toolbar"><b>Материалы</b><span>Поиск · Все категории</span><em>+ Добавить</em></div>
                        <div class="showcase-material-grid">
                            <article><header><i class="file-red"><IconFileText :size="17" /></i><span>•••</span></header><b>Present Perfect — схема</b><small>Грамматика · 12 сентября</small><div><em>английский</em><em>B1</em></div><footer>2,4 МБ</footer></article>
                            <article><header><i class="file-blue"><IconFileText :size="17" /></i><span>•••</span></header><b>Неправильные глаголы</b><small>Практика · 10 сентября</small><div><em>упражнения</em></div><footer>860 КБ</footer></article>
                            <article><header><i class="file-orange"><IconPresentation :size="17" /></i><span>•••</span></header><b>Вводный урок B1</b><small>Презентации · 8 сентября</small><div><em>урок</em></div><footer>4,1 МБ</footer></article>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'payments'" class="showcase-payments">
                        <div class="showcase-toolbar"><b>Пакет занятий</b><span>Павел Петров</span><em>Записать оплату</em></div>
                        <div class="showcase-tuition-summary">
                            <span class="is-due"><small>К оплате</small><b>1 500 ₽</b><em>Текущая задолженность</em></span>
                            <span class="is-advance"><small>Аванс</small><b>3 000 ₽</b><em>Можно зачесть в оплату</em></span>
                            <span><small>Доступно занятий</small><b>4</b><em>Не проведено и не запланировано</em></span>
                        </div>
                        <div class="showcase-package">
                            <span><small>Осталось занятий</small><b>4 из 16</b></span>
                            <div><i></i><i></i><i></i></div>
                            <em>12 проведено · 2 запланировано · 2 свободно</em>
                        </div>
                        <div class="showcase-payment"><span><IconArrowDownLeft :size="17" /><b>Оплата пакета</b></span><small>12 сентября, 14:30</small><strong>+ 16 000 ₽</strong></div>
                        <div class="showcase-payment"><span><IconCalendarCheck :size="17" /><b>Проведено занятие</b></span><small>11 сентября, 12:30</small><strong>− 1 занятие</strong></div>
                    </div>

                    <div v-else-if="activeId === 'notifications'" class="showcase-notifications">
                        <div class="showcase-toolbar"><b>Уведомления</b><span>Только непрочитанные</span><em>Прочитать все</em></div>
                        <div class="showcase-notice showcase-notice--new"><i></i><span>ММ</span><div><b>Запрос на перенос урока <em>Календарь</em></b><p>Иван предложил другое время: 15 сентября, 16:00</p><button>Посмотреть запрос</button></div></div>
                        <div class="showcase-notice"><i></i><span>АС</span><div><b>Домашнее задание выполнено <em>Задания</em></b><p>Эссе «Past Simple» ожидает проверки</p></div></div>
                    </div>

                    <div v-else-if="activeId === 'video-calls'" class="current-tool-preview">
                        <div class="future-video">
                            <div class="future-video__main">
                                <span class="future-avatar future-avatar--teacher">АС</span>
                                <b>Анна Смирнова</b>
                                <small>Преподаватель</small>
                            </div>
                            <div class="future-video__students">
                                <span><i>ММ</i><small>Иван</small></span>
                                <span><i>ЕВ</i><small>Елена</small></span>
                                <span><i>АК</i><small>Алексей</small></span>
                            </div>
                            <div class="future-video__controls">
                                <span><IconMic :size="13" /></span>
                                <span><IconVideo :size="13" /></span>
                                <span><IconMonitorUp :size="13" /></span>
                                <span class="future-video__hangup"><IconPhoneOff :size="13" /></span>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'messenger'" class="current-tool-preview">
                        <div class="future-chat">
                            <header><span class="future-avatar">ММ</span><div><b>Иван Ивановов</b><small>В сети</small></div><IconMoreHorizontal :size="16" /></header>
                            <div class="future-chat__messages">
                                <span class="future-chat__message">Здравствуйте! Подскажите, что повторить к уроку?<small>14:24</small></span>
                                <span class="future-chat__message future-chat__message--own">Повтори Present Perfect. Материал уже добавила в план.<small>14:26 · ✓✓</small></span>
                                <span class="future-chat__file"><IconFileText :size="17" /><b>Present Perfect.pdf</b><small>2,4 МБ</small></span>
                            </div>
                            <footer><IconPaperclip :size="15" /><span>Сообщение…</span><i><IconSend :size="13" /></i></footer>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'whiteboard'" class="current-tool-preview">
                        <div class="future-board">
                            <div class="future-board__tools">
                                <span class="active"><IconMousePointer2 :size="13" /></span>
                                <span><IconPenTool :size="13" /></span>
                                <span><IconType :size="13" /></span>
                                <span><IconShapes :size="13" /></span>
                                <span><IconStickyNote :size="13" /></span>
                            </div>
                            <div class="future-board__canvas">
                                <span class="board-note">Present Perfect<br><small>have / has + V3</small></span>
                                <span class="board-example">She <u>has finished</u> her homework.</span>
                                <svg viewBox="0 0 240 120" fill="none">
                                    <path d="M40 90C75 35 128 32 184 64" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" />
                                    <path d="M174 55L187 65L171 71" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <i class="board-cursor board-cursor--one"><IconMousePointer2 :size="12" /> Анна</i>
                                <i class="board-cursor board-cursor--two"><IconMousePointer2 :size="12" /> Иван</i>
                            </div>
                            <div class="future-board__bottom"><span><IconUsers :size="13" /> 3 участника</span><em><IconCamera :size="13" /> Сделать снэпшот</em></div>
                        </div>
                    </div>

                    <div v-else-if="activeId === 'test-builder'" class="showcase-builder-shell">
                        <header><span>←</span><b>Итоговый тест B1</b><em>Конструктор</em><i>Предпросмотр</i><button>Сохранить</button></header>
                        <div class="showcase-builder">
                            <section>
                            <div><small>ВОПРОС 1</small><b>Выберите правильный вариант</b><em>2 балла</em></div>
                            <p>Какое предложение составлено правильно?</p>
                            <label><i></i> She has finished her homework.</label>
                            <label><i></i> She have finish her homework.</label>
                            <label><i></i> She finished has her homework.</label>
                            </section>
                            <aside><b>Добавить вопрос</b><span class="active">◉ <small>Один вариант</small></span><span>☑ <small>Несколько вариантов</small></span><span>↔ <small>Сопоставление</small></span><span>_ <small>Заполнить пропуск</small></span></aside>
                        </div>
                    </div>

                    <div v-else class="showcase-review">
                        <div class="showcase-review__tools"><span>↖</span><span>✎</span><span class="active"><IconMessageSquareText :size="15" /></span><span>▱</span></div>
                        <section>
                            <nav><b>Вложения</b><span class="active"><IconFileText :size="12" /> essay.docx</span><span><IconFileText :size="12" /> task.pdf</span><em>+ Добавить файл</em></nav>
                            <div class="showcase-document">
                                <small>Эссе «Past Simple»</small>
                                <b>My last summer holiday</b>
                                <p>Last summer I <mark>went to the seaside</mark> with my family. We stayed there for two weeks and visited many interesting places.</p>
                                <i class="review-pin"><IconMessageSquareText :size="12" /></i>
                            </div>
                            <aside>
                                <b>Комментарии</b>
                                <div><span>АС</span><p><b>Анна Смирнова</b>Отличное начало! Проверь форму глагола.</p></div>
                                <label>Общий комментарий</label>
                                <em>Написать комментарий…</em>
                            </aside>
                        </section>
                    </div>
                </div>
            </article>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import {
        ArrowDownLeft as IconArrowDownLeft,
        Bell as IconBell,
        BookOpen as IconBookOpen,
        Camera as IconCamera,
        CalendarCheck as IconCalendarCheck,
        CalendarDays as IconCalendarDays,
        Check as IconCheck,
        ChevronRight as IconChevronRight,
        ClipboardCheck as IconClipboardCheck,
        FileCheck2 as IconFileCheck2,
        FileText as IconFileText,
        MessageSquareText as IconMessageSquareText,
        Mic as IconMic,
        MonitorUp as IconMonitorUp,
        MoreHorizontal as IconMoreHorizontal,
        MousePointer2 as IconMousePointer2,
        Paperclip as IconPaperclip,
        PenTool as IconPenTool,
        PhoneOff as IconPhoneOff,
        Presentation as IconPresentation,
        Route as IconRoute,
        Send as IconSend,
        Shapes as IconShapes,
        StickyNote as IconStickyNote,
        Type as IconType,
        Users as IconUsers,
        Video as IconVideo,
        WalletCards as IconWalletCards
    } from '@lucide/vue';
    import { computed, ref } from 'vue';

    const capabilities = [
        {
            id          : 'calendar',
            title       : 'Календарь',
            text        : 'Расписание со всем контекстом',
            icon        : IconCalendarDays,
            kicker      : 'Календарь, который знает контекст',
            heading     : 'Расписание связано с учениками и оплатами',
            description : 'Уроки, переносы, статусы и быстрый переход к ученику — без ручной сверки расписания.',
            points      : ['День, неделя и месяц', 'Переносы с проверкой свободного времени', 'Переход к ученику, оплате и условиям урока'],
            windowTitle : 'Календарь · неделя'
        },
        {
            id          : 'homework',
            title       : 'Домашние задания',
            text        : 'Назначение и понятная проверка',
            icon        : IconFileCheck2,
            kicker      : 'Задания с понятной проверкой',
            heading     : 'Весь цикл задания остаётся в Klick',
            description : 'Создавайте шаблоны, назначайте работы и оставляйте комментарии прямо в файлах ученика.',
            points      : ['Шаблоны и быстрое создание', 'Статусы, версии и доработка', 'Комментарии и оценка результата'],
            windowTitle : 'Домашние задания'
        },
        {
            id          : 'learning-plan',
            title       : 'Учебные планы',
            text        : 'Маршрут из тем, тестов и материалов',
            icon        : IconRoute,
            kicker      : 'Учебный план, а не список тем',
            heading     : 'Покажите ученику путь до цели',
            description : 'Связывайте темы с материалами и тестами, чтобы ученик видел маршрут и свой прогресс.',
            points      : ['Дерево тем и итоговых тестов', 'Материалы и задания внутри темы', 'Прогресс каждого ученика'],
            windowTitle : 'Учебный план · Английский B1'
        },
        {
            id          : 'student-profile',
            title       : 'Профиль ученика',
            text        : 'Полная история обучения',
            icon        : IconUsers,
            kicker      : 'Профиль ученика без пробелов',
            heading     : 'Весь контекст ученика на одной странице',
            description : 'Заметки, занятия, задания, материалы и оплаты собраны в одной последовательной истории.',
            points      : ['Ближайшие уроки и активность', 'Пакеты занятий и оплаты', 'Планы, тесты и материалы'],
            windowTitle : 'Профиль ученика'
        },
        {
            id          : 'tests',
            title       : 'Тесты',
            text        : 'Результаты и прогресс',
            icon        : IconClipboardCheck,
            kicker      : 'Результат виден сразу',
            heading     : 'Тесты показывают не только балл',
            description : 'Назначайте проверку знаний, следите за результатами и быстро находите темы, к которым стоит вернуться.',
            points      : ['Разные типы вопросов', 'Результаты по каждому ученику', 'Связь с темами учебного плана'],
            windowTitle : 'Тесты · результаты'
        },
        {
            id          : 'materials',
            title       : 'Материалы',
            text        : 'Файлы всегда под рукой',
            icon        : IconBookOpen,
            kicker      : 'Единая библиотека',
            heading     : 'Материалы не теряются в переписке',
            description : 'Храните файлы по предметам и темам, открывайте их на занятии и делитесь с учениками из одного места.',
            points      : ['Папки и быстрый поиск', 'PDF, DOCX, PPTX, XLSX и TXT', 'Общие и персональные материалы'],
            windowTitle : 'Библиотека материалов'
        },
        {
            id          : 'payments',
            title       : 'Оплаты',
            text        : 'От счёта до выплаты',
            icon        : IconWalletCards,
            kicker      : 'Финансы без ручных операций',
            heading     : 'Весь путь оплаты связан с занятиями',
            description : 'Принимайте оплату, автоматически выставляйте счета и рассчитывайте начисления по занятиям и пакетам.',
            points      : ['Эквайринг и автоматические счета', 'Пакеты, оплаты и история списаний', 'Начисления преподавателям и отчётность'],
            windowTitle : 'Пакет занятий'
        },
        {
            id          : 'notifications',
            title       : 'Уведомления',
            text        : 'Важное не теряется',
            icon        : IconBell,
            kicker      : 'Всё важное рядом',
            heading     : 'Изменения не проходят незаметно',
            description : 'Переносы, новые работы, комментарии и оплаты собираются в понятную ленту уведомлений.',
            points      : ['Один центр уведомлений', 'Переход сразу к нужному действию', 'Отдельный кабинет ученика'],
            windowTitle : 'Центр уведомлений'
        },
        {
            id          : 'video-calls',
            title       : 'Видеозвонки',
            text        : 'Уроки и конференции',
            icon        : IconVideo,
            kicker      : 'Урок без внешних ссылок',
            heading     : 'Видеозвонки уже внутри Klick',
            description : 'Проводите индивидуальные и групповые занятия в том же пространстве, где хранится контекст ученика.',
            points      : ['Конференции для нескольких учеников', 'Демонстрация экрана и управление участниками', 'Чат, реакции и запись важных моментов'],
            windowTitle : 'Видеоурок · Английский B1'
        },
        {
            id          : 'messenger',
            title       : 'Мессенджер',
            text        : 'Общение в контексте обучения',
            icon        : IconMessageSquareText,
            kicker      : 'Переписка рядом с уроками',
            heading     : 'Общайтесь, не покидая Klick',
            description : 'Личные и групповые чаты сохраняют сообщения, материалы и договорённости рядом с учебным процессом.',
            points      : ['Личные и групповые чаты', 'Файлы, голосовые сообщения и реакции', 'Поиск, ответы, упоминания и статусы прочтения'],
            windowTitle : 'Мессенджер · Иван Ивановов'
        },
        {
            id          : 'whiteboard',
            title       : 'Интерактивная доска',
            text        : 'Совместная работа на уроке',
            icon        : IconPresentation,
            kicker      : 'Объясняйте вместе',
            heading     : 'Доска, к которой подключается ученик',
            description : 'Работайте на общей доске в реальном времени и сохраняйте результат занятия для ученика.',
            points      : ['Одновременная работа всех участников', 'Текст, фигуры, стикеры, рисунки и файлы', 'Снэпшоты доски после урока'],
            windowTitle : 'Интерактивная доска'
        },
        {
            id          : 'test-builder',
            title       : 'Конструктор тестов',
            text        : 'Проверка под вашу методику',
            icon        : IconClipboardCheck,
            kicker      : 'Гибкая проверка знаний',
            heading     : 'Соберите тест под конкретную цель',
            description : 'Комбинируйте форматы вопросов, настройте баллы и используйте один тест в заданиях и учебных планах.',
            points      : ['Несколько форматов вопросов', 'Гибкая система баллов', 'Предпросмотр перед публикацией'],
            windowTitle : 'Конструктор тестов'
        },
        {
            id          : 'homework-review',
            title       : 'Инструмент проверки домашнего задания',
            text        : 'Пометки прямо в работе',
            icon        : IconFileCheck2,
            kicker      : 'Обратная связь в контексте',
            heading     : 'Комментируйте прямо в файле ученика',
            description : 'Оставляйте точечные пометки, выделяйте текст и добавляйте общий комментарий, не переключаясь между приложениями.',
            points      : ['Комментарии с привязкой к месту', 'Работа с разными форматами файлов', 'История версий и доработка'],
            windowTitle : 'Проверка домашнего задания'
        }
    ] as const;

    const activeId = ref<(typeof capabilities)[number]['id']>('calendar');
    const capabilityGroups = [
        { id : 'organize', marker : '01', title : 'Организация', subtitle : 'Расписание и ученики', items : ['calendar', 'student-profile', 'notifications'] },
        { id : 'teach', marker : '02', title : 'Обучение', subtitle : 'Планы и материалы', items : ['learning-plan', 'materials', 'whiteboard'] },
        { id : 'practice', marker : '03', title : 'Практика', subtitle : 'Задания и проверка', items : ['homework', 'homework-review', 'tests', 'test-builder'] },
        { id : 'connect', marker : '04', title : 'Общение и финансы', subtitle : 'Урок и оплата', items : ['video-calls', 'messenger', 'payments'] }
    ] as const;
    const activeGroup = ref<(typeof capabilityGroups)[number]['id']>('organize');
    const filteredCapabilities = computed(() => {
        const ids = capabilityGroups.find(group => group.id === activeGroup.value)?.items ?? capabilityGroups[0].items;
        return capabilities.filter(item => (ids as readonly string[]).includes(item.id));
    });
    const activeCapability = computed(() => capabilities.find(item => item.id === activeId.value) ?? capabilities[0]);
    const selectGroup = (groupId : (typeof capabilityGroups)[number]['id']) => {
        activeGroup.value = groupId;
        const firstId = capabilityGroups.find(group => group.id === groupId)?.items[0] ?? 'calendar';
        activeId.value = firstId as (typeof capabilities)[number]['id'];
    };
</script>
