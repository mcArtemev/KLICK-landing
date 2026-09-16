<template>
    <section class="value-section section-pad">
        <div class="shell value-grid">
            <div class="value-copy">
                <span class="section-kicker">Сколько стоит переключение между сервисами</span>
                <h2>Покажем,<br>куда уходит время</h2>
                <p>Один урок редко начинается одним кликом. Отметьте знакомые шаги — мы покажем их реальную стоимость за неделю и месяц.</p>

                <div class="rhythm-picker" role="tablist" aria-label="Ритм работы преподавателя">
                    <button
                        v-for="rhythm in rhythms"
                        :key="rhythm.id"
                        type="button"
                        role="tab"
                        :aria-selected="activeId === rhythm.id"
                        :class="{ active: activeId === rhythm.id }"
                        @click="activeId = rhythm.id"
                    >
                        <span>{{ rhythm.label }}</span>
                        <b>{{ rhythm.lessons }}</b>
                        <small>{{ pluralizeRu(rhythm.lessons, 'урок', 'урока', 'уроков') }} в неделю</small>
                    </button>
                </div>

                <div class="calculation-note">
                    <b>Почему не просто «18 минут»?</b>
                    <p>Не каждый шаг происходит на каждом уроке. Поэтому мы учитываем не только время действия, но и то, как часто оно встречается.</p>
                </div>
                <span class="value-note">нажмите на лишние для вас шаги ↗</span>
            </div>

            <div class="time-stage">
                <span class="tape" aria-hidden="true"></span>
                <header>
                    <div><small>МАРШРУТ ОДНОГО УРОКА</small><b>Шесть мест, где прячутся минуты</b></div>
                    <button type="button" @click="selectAllTasks">Выбрать всё</button>
                </header>

                <div class="workflow-steps" aria-label="Действия преподавателя между сервисами">
                    <button
                        v-for="task in tasks"
                        :key="task.id"
                        type="button"
                        :aria-pressed="isTaskSelected(task.id)"
                        :class="{ active: isTaskSelected(task.id), risk: task.id === 'limits' }"
                        @click="toggleTask(task.id)"
                    >
                        <i><component :is="task.icon" :size="18" /></i>
                        <span><b>{{ task.title }}</b><small>{{ task.description }}</small></span>
                        <em><strong>≈ {{ task.minutes }} мин</strong><small>{{ task.frequencyLabel }}</small></em>
                    </button>
                </div>

                <div class="route-summary" aria-label="Сравнение времени одного урока">
                    <div>
                        <span><b>Между сервисами</b><small>входы, ссылки, отправка и повторы</small></span>
                        <strong>≈ {{ currentMinutesPerLesson }} мин</strong>
                        <i><em></em></i>
                    </div>
                    <div class="route-summary__klick">
                        <span><b>В Klick</b><small>урок, доска, файлы и общение уже связаны</small></span>
                        <strong>≈ {{ klickMinutesPerLesson }} мин</strong>
                        <i><em :style="{ width: `${klickRoutinePercent}%` }"></em></i>
                    </div>
                    <mark>− {{ savedMinutesPerLesson }} мин на урок</mark>
                </div>

                <div class="result-slot">
                    <Transition name="time-pop" mode="out-in">
                        <div :key="calculationKey" class="calculation-result">
                            <div class="formula">
                                <span>{{ activeRhythm.lessons }} {{ lessonLabel }}</span>
                                <i>×</i>
                                <span>4,3 недели</span>
                                <i>×</i>
                                <span>{{ savedMinutesPerLesson }} мин</span>
                            </div>
                            <small>Ориентир на месяц</small>
                            <strong><i>≈</i> {{ savedHours }} <em>{{ savedHourLabel }}</em></strong>
                            <p v-if="savedHours">Это примерно {{ freeEvenings }} {{ eveningLabel }} или {{ focusBlocks }} {{ focusBlockLabel }} по два часа без сервисной рутины.</p>
                            <p v-else>Выберите хотя бы один знакомый шаг — и здесь появится ваш ориентир.</p>
                        </div>
                    </Transition>
                </div>

                <footer>
                    <span>Время шага × частота × количество уроков</span>
                    <small>Оценочная модель по типовым сценариям. Это ориентир, а не обещание результата.</small>
                </footer>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { ClipboardCheck, FileUp, MessageCircle, Presentation, TriangleAlert, Video } from '@lucide/vue';

    const rhythms = [
        { id: 'calm', label: 'Спокойный', lessons: 12 },
        { id: 'steady', label: 'Рабочий', lessons: 24 },
        { id: 'full', label: 'Плотный', lessons: 40 }
    ] as const;

    const tasks = [
        { id: 'video', title: 'Видеозвонок', description: 'Войти, создать комнату, отправить ссылку', minutes: 4, klickMinutes: 1, frequency: 1, frequencyLabel: 'каждый урок', icon: Video },
        { id: 'board', title: 'Интерактивная доска', description: 'Войти, открыть доску, дать ученику доступ', minutes: 4, klickMinutes: 1, frequency: 0.7, frequencyLabel: 'часто', icon: Presentation },
        { id: 'materials', title: 'Снимок и файл', description: 'Сохранить, найти и отправить материалы', minutes: 3, klickMinutes: 1, frequency: 0.8, frequencyLabel: 'почти каждый урок', icon: FileUp },
        { id: 'test', title: 'Тест или практика', description: 'Найти или собрать, объяснить и отправить', minutes: 7, klickMinutes: 3, frequency: 0.45, frequencyLabel: 'примерно через урок', icon: ClipboardCheck },
        { id: 'reminder', title: 'Напоминание', description: 'Найти и повторно переслать нужную ссылку', minutes: 3, klickMinutes: 0, frequency: 0.35, frequencyLabel: 'по необходимости', icon: MessageCircle },
        { id: 'limits', title: 'Если что-то не работает', description: 'Повторный вход, лимит звонка или размера файла', minutes: 5, klickMinutes: 1, frequency: 0.15, frequencyLabel: 'иногда', icon: TriangleAlert }
    ] as const;

    type RhythmId = (typeof rhythms)[number]['id'];
    type TaskId = (typeof tasks)[number]['id'];

    const activeId = ref<RhythmId>('steady');
    const selectedTaskIds = ref<TaskId[]>(tasks.map(task => task.id));

    const pluralizeRu = (count: number, one: string, few: string, many: string) => {
        const mod100 = count % 100;
        const mod10 = count % 10;

        if (mod100 >= 11 && mod100 <= 14) return many;
        if (mod10 === 1) return one;
        if (mod10 >= 2 && mod10 <= 4) return few;
        return many;
    };

    const activeRhythm = computed(() => rhythms.find(rhythm => rhythm.id === activeId.value) ?? rhythms[1]);
    const activeTasks = computed(() => tasks.filter(task => selectedTaskIds.value.includes(task.id)));
    const currentMinutesPerLesson = computed(() => Math.round(activeTasks.value.reduce((sum, task) => sum + task.minutes * task.frequency, 0)));
    const klickMinutesPerLesson = computed(() => Math.round(activeTasks.value.reduce((sum, task) => sum + task.klickMinutes * task.frequency, 0)));
    const savedMinutesPerLesson = computed(() => Math.max(0, currentMinutesPerLesson.value - klickMinutesPerLesson.value));
    const klickRoutinePercent = computed(() => currentMinutesPerLesson.value ? Math.round((klickMinutesPerLesson.value / currentMinutesPerLesson.value) * 100) : 0);
    const savedHours = computed(() => Math.round((activeRhythm.value.lessons * 4.3 * savedMinutesPerLesson.value) / 60));
    const freeEvenings = computed(() => Math.round(savedHours.value / 4));
    const focusBlocks = computed(() => Math.round(savedHours.value / 2));
    const lessonLabel = computed(() => pluralizeRu(activeRhythm.value.lessons, 'урок', 'урока', 'уроков'));
    const savedHourLabel = computed(() => pluralizeRu(savedHours.value, 'час', 'часа', 'часов'));
    const eveningLabel = computed(() => pluralizeRu(freeEvenings.value, 'свободный вечер', 'свободных вечера', 'свободных вечеров'));
    const focusBlockLabel = computed(() => pluralizeRu(focusBlocks.value, 'окно', 'окна', 'окон'));
    const calculationKey = computed(() => `${activeId.value}-${selectedTaskIds.value.join('-')}`);

    const isTaskSelected = (taskId: TaskId) => selectedTaskIds.value.includes(taskId);
    const toggleTask = (taskId: TaskId) => {
        selectedTaskIds.value = isTaskSelected(taskId)
            ? selectedTaskIds.value.filter(id => id !== taskId)
            : [...selectedTaskIds.value, taskId];
    };
    const selectAllTasks = () => {
        selectedTaskIds.value = tasks.map(task => task.id);
    };
</script>

<style scoped>
    .value-section {
        overflow: hidden;
        background:
            radial-gradient(circle at 9px 9px, rgb(33 28 26 / 0.08) 1.2px, transparent 1.4px) 0 0 / 22px 22px,
            #fffaf0;
    }

    .value-grid {
        display: grid;
        grid-template-columns: 0.72fr 1.28fr;
        gap: clamp(52px, 7vw, 110px);
        align-items: center;
    }

    .value-copy h2 {
        margin: 22px 0;
        font-size: clamp(44px, 5vw, 74px);
        line-height: 0.96;
        letter-spacing: -0.06em;
    }

    .value-copy > p {
        max-width: 560px;
        color: rgb(33 28 26 / 0.7);
        font-size: 17px;
        line-height: 1.7;
    }

    .rhythm-picker {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-top: 30px;
    }

    .rhythm-picker button {
        display: grid;
        min-width: 0;
        min-height: 110px;
        align-content: center;
        gap: 3px;
        padding: 14px 11px;
        color: var(--workshop-ink);
        border: 2px solid var(--workshop-ink);
        border-radius: 15px 21px 13px 18px;
        background: #fffdf7;
        box-shadow: 4px 5px 0 var(--workshop-ink);
        cursor: pointer;
        text-align: left;
        transition: transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
    }

    .rhythm-picker button:nth-child(2) { transform: rotate(-1deg); }
    .rhythm-picker button:nth-child(3) { transform: rotate(1deg); }
    .rhythm-picker button:hover { transform: translateY(-3px) rotate(0); }
    .rhythm-picker button.active { background: var(--workshop-lilac); box-shadow: 7px 8px 0 var(--workshop-ink); transform: translateY(-5px) rotate(-1deg); }
    .rhythm-picker span { overflow: hidden; font-size: 12px; font-weight: 800; text-overflow: ellipsis; }
    .rhythm-picker b { font-size: 30px; line-height: 1; }
    .rhythm-picker small { color: #756e67; font-size: 10px; }

    .calculation-note {
        margin-top: 32px;
        padding: 20px;
        border: 2px solid var(--workshop-ink);
        border-radius: 14px 19px 13px 17px;
        background: #dff2ff;
        box-shadow: 5px 6px 0 var(--workshop-ink);
        transform: rotate(-1deg);
    }

    .calculation-note b { font-size: 13px; }
    .calculation-note p { margin: 8px 0 0; color: #625b55; font-size: 12px; line-height: 1.55; }

    .value-note {
        display: block;
        margin-top: 20px;
        color: #6752c8;
        font: 700 21px Caveat, cursive;
        text-align: right;
        transform: rotate(-2deg);
    }

    .time-stage {
        position: relative;
        padding: 38px;
        border: 2px solid var(--workshop-ink);
        border-radius: 27px 17px 31px 19px;
        background: #fffdf7;
        box-shadow: 11px 12px 0 var(--workshop-ink);
        transform: rotate(0.5deg);
    }

    .tape {
        position: absolute;
        top: -17px;
        left: 42%;
        width: 120px;
        height: 32px;
        background: rgb(183 165 255 / 0.72);
        transform: rotate(-2deg);
    }

    .time-stage > header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 2px dashed rgb(33 28 26 / 0.26);
    }

    .time-stage > header div { display: flex; flex-direction: column; gap: 5px; }
    .time-stage > header small { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; }
    .time-stage > header b { font-size: 19px; }
    .time-stage > header button { padding: 8px 11px; color: var(--workshop-ink); border: 2px solid var(--workshop-ink); border-radius: 99px; background: #fff3a8; cursor: pointer; font-size: 10px; font-weight: 800; }

    .workflow-steps { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; margin-top: 23px; }
    .workflow-steps > button { display: grid; min-height: 126px; grid-template-columns: 38px 1fr auto; gap: 10px; align-items: start; padding: 16px 14px; color: var(--workshop-ink); border: 2px solid var(--workshop-ink); border-radius: 13px 18px 12px 16px; background: #f2eee8; cursor: pointer; text-align: left; opacity: 0.56; transition: opacity 150ms ease, background-color 150ms ease, transform 150ms ease; }
    .workflow-steps > button.active { background: #fff; opacity: 1; }
    .workflow-steps > button.active:nth-child(2n) { transform: rotate(-0.6deg); }
    .workflow-steps > button.risk.active { background: #fff3a8; }
    .workflow-steps > button > i { display: grid; width: 36px; height: 36px; place-items: center; border: 2px solid var(--workshop-ink); border-radius: 11px 15px 10px 13px; background: var(--workshop-lilac); font-style: normal; }
    .workflow-steps > button.risk > i { background: var(--workshop-orange); }
    .workflow-steps > button > span { display: flex; min-width: 0; flex-direction: column; gap: 6px; }
    .workflow-steps > button > span b { font-size: 14px; line-height: 1.2; }
    .workflow-steps > button > span small { color: #756e67; font-size: 11px; line-height: 1.4; }
    .workflow-steps > button > em { display: flex; align-items: flex-end; flex-direction: column; gap: 5px; font-style: normal; text-align: right; }
    .workflow-steps > button > em strong { white-space: nowrap; font-size: 13px; }
    .workflow-steps > button > em small { color: #877f77; font-size: 10px; white-space: nowrap; }

    .route-summary { position: relative; display: grid; gap: 13px; margin-top: 24px; padding: 21px; border: 2px solid var(--workshop-ink); border-radius: 16px 22px 14px 19px; background: #fff; }
    .route-summary > div { display: grid; grid-template-columns: 1fr auto; gap: 5px 15px; align-items: center; }
    .route-summary span { display: flex; flex-direction: column; }
    .route-summary b { font-size: 14px; }
    .route-summary small { color: #837b74; font-size: 11px; }
    .route-summary strong { font-size: 15px; }
    .route-summary div > i { grid-column: 1 / 3; height: 14px; overflow: hidden; border: 2px solid var(--workshop-ink); border-radius: 99px; background: #f1ede7; }
    .route-summary div > i em { display: block; width: 100%; height: 100%; border-radius: inherit; background: var(--workshop-orange); transition: width 320ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .route-summary__klick > i em { background: var(--workshop-green); }
    .route-summary mark { position: absolute; right: -18px; bottom: -19px; padding: 7px 12px; color: var(--workshop-ink); border: 2px solid var(--workshop-ink); background: var(--workshop-green); font: 700 18px Caveat, cursive; transform: rotate(-3deg); }

    .result-slot { display: grid; min-height: 252px; align-items: start; }
    .calculation-result { margin-top: 33px; padding: 22px 25px; border: 2px solid var(--workshop-ink); border-radius: 17px 12px 20px 14px; background: #ffd84d; box-shadow: 5px 6px 0 var(--workshop-ink); }
    .formula { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; margin-bottom: 15px; }
    .formula span { padding: 5px 8px; border: 1px solid var(--workshop-ink); border-radius: 99px; background: #fffdf7; font-size: 10px; font-weight: 800; }
    .formula > i { font: 700 19px Caveat, cursive; }
    .calculation-result > small { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
    .calculation-result > strong { display: flex; align-items: baseline; gap: 8px; margin: 5px 0; font-size: clamp(48px, 5vw, 70px); line-height: 0.95; letter-spacing: -0.06em; }
    .calculation-result > strong i { font: 700 28px Caveat, cursive; letter-spacing: 0; }
    .calculation-result > strong em { font-size: 21px; font-style: normal; letter-spacing: -0.03em; }
    .calculation-result > p { margin: 11px 0 0; color: rgb(33 28 26 / 0.72); font-size: 13px; line-height: 1.5; }

    .time-stage > footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 18px; color: #817970; }
    .time-stage > footer span { font: 700 17px Caveat, cursive; }
    .time-stage > footer small { max-width: 380px; font-size: 10px; line-height: 1.45; text-align: right; }

    .time-pop-enter-active,
    .time-pop-leave-active { transition: opacity 150ms ease, transform 150ms ease; }
    .time-pop-enter-from { opacity: 0; transform: translateY(8px) rotate(-1deg); }
    .time-pop-leave-to { opacity: 0; transform: translateY(-5px) rotate(1deg); }

    @media (max-width: 1120px) {
        .value-grid { grid-template-columns: 1fr; }
        .value-copy { max-width: 780px; }
        .rhythm-picker { max-width: 620px; }
        .calculation-note { max-width: 620px; }
        .value-note { max-width: 620px; }
    }

    @media (max-width: 680px) {
        .rhythm-picker { grid-template-columns: 1fr; }
        .rhythm-picker button { min-height: 76px; grid-template-columns: 1fr auto; align-items: center; }
        .rhythm-picker button span { font-size: 13px; }
        .rhythm-picker button b { grid-row: 1 / 3; grid-column: 2; font-size: 34px; }
        .time-stage { padding: 30px 20px; }
        .time-stage > header { align-items: flex-start; flex-direction: column; gap: 12px; }
        .workflow-steps { grid-template-columns: 1fr; }
        .workflow-steps > button { min-height: 104px; }
        .result-slot { min-height: 285px; }
        .calculation-result > strong { flex-wrap: wrap; }
        .time-stage > footer { align-items: flex-start; flex-direction: column; }
        .time-stage > footer small { text-align: left; }
        .route-summary mark { right: 7px; }
    }

    @media (prefers-reduced-motion: reduce) {
        .rhythm-picker button,
        .workflow-steps > button,
        .route-summary div > i em,
        .time-pop-enter-active,
        .time-pop-leave-active { transition: none; }
    }
</style>
