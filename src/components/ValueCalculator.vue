<template>
    <section class="value-section section-pad">
        <div class="shell value-grid">
            <div class="value-copy">
                <span class="section-kicker">Сколько стоит переключение между сервисами</span>
                <h2>Один клик —<br>и время снова ваше</h2>
                <p>Не нужно считать каждую минуту. Выберите неделю, похожую на вашу, — Klick сразу покажет, сколько рутины можно убрать.</p>

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
                <span class="value-note">один выбор вместо трёх ползунков ↗</span>
            </div>

            <div class="time-stage">
                <span class="tape" aria-hidden="true"></span>
                <header>
                    <div><small>ВАША НЕДЕЛЯ</small><b>{{ activeRhythm.label }}</b></div>
                    <span>{{ activeRhythm.lessons }} {{ lessonLabel }} · {{ activeRhythm.students }} {{ studentLabel }}</span>
                </header>

                <div class="time-result-slot">
                    <Transition name="time-pop" mode="out-in">
                        <div :key="activeId" class="time-result">
                            <small>Ориентир на месяц</small>
                            <strong><i>≈</i> {{ savedHours }} <em>часов</em></strong>
                            <p>возвращаются из расписания, переписок, поиска файлов и ручного учёта.</p>
                        </div>
                    </Transition>
                </div>

                <div class="routine-compare" aria-label="Сравнение времени на рутину">
                    <div>
                        <span><b>Сейчас</b><small>между разными сервисами</small></span>
                        <strong>≈ {{ routineHoursNow }} ч</strong>
                        <i><em></em></i>
                    </div>
                    <div class="routine-compare__klick">
                        <span><b>С Klick</b><small>в одном рабочем пространстве</small></span>
                        <strong>≈ {{ routineHoursWithKlick }} ч</strong>
                        <i><em :style="{ width: `${routinePercentWithKlick}%` }"></em></i>
                    </div>
                    <mark>− {{ savedPerWeek }} ч каждую неделю</mark>
                </div>

                <div class="time-outcomes">
                    <article><b>{{ freeEvenings }}</b><span>свободных<br>{{ eveningLabel }} в месяц</span></article>
                    <article><b>{{ extraLessons }}</b><span>окон по два часа<br>для важных дел</span></article>
                    <article><b>{{ savedPerWeek }}</b><span>{{ hourLabel }} спокойствия<br>каждую неделю</span></article>
                </div>

                <footer>Оценочная модель по типовым повторяющимся действиям, а не обещание результата.</footer>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    const rhythms = [
        { id: 'calm', label: 'Спокойный', lessons: 12, students: 7 },
        { id: 'steady', label: 'Рабочий', lessons: 24, students: 14 },
        { id: 'full', label: 'Плотный', lessons: 40, students: 24 }
    ] as const;

    type RhythmId = (typeof rhythms)[number]['id'];

    const activeId = ref<RhythmId>('steady');
    const activeRhythm = computed(() => rhythms.find(rhythm => rhythm.id === activeId.value) ?? rhythms[1]);
    const pluralizeRu = (count: number, one: string, few: string, many: string) => {
        const mod100 = count % 100;
        const mod10 = count % 10;

        if (mod100 >= 11 && mod100 <= 14) return many;
        if (mod10 === 1) return one;
        if (mod10 >= 2 && mod10 <= 4) return few;
        return many;
    };
    const savedHours = computed(() => Math.max(1, Math.round((activeRhythm.value.lessons * 4.3 * 18 * 0.55 + activeRhythm.value.students * 4) / 60)));
    const routineHoursNow = computed(() => Math.max(savedHours.value + 1, Math.round(savedHours.value / 0.55)));
    const routineHoursWithKlick = computed(() => routineHoursNow.value - savedHours.value);
    const routinePercentWithKlick = computed(() => Math.round((routineHoursWithKlick.value / routineHoursNow.value) * 100));
    const savedPerWeek = computed(() => Math.max(1, Math.round(savedHours.value / 4.3)));
    const freeEvenings = computed(() => Math.max(1, Math.round(savedHours.value / 4)));
    const extraLessons = computed(() => Math.max(1, Math.round(savedHours.value / 2)));
    const lessonLabel = computed(() => pluralizeRu(activeRhythm.value.lessons, 'урок', 'урока', 'уроков'));
    const studentLabel = computed(() => pluralizeRu(activeRhythm.value.students, 'ученик', 'ученика', 'учеников'));
    const eveningLabel = computed(() => pluralizeRu(freeEvenings.value, 'вечер', 'вечера', 'вечеров'));
    const hourLabel = computed(() => pluralizeRu(savedPerWeek.value, 'час', 'часа', 'часов'));
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
        grid-template-columns: 0.82fr 1.18fr;
        gap: clamp(56px, 8vw, 120px);
        align-items: center;
    }

    .value-copy h2 {
        margin: 22px 0;
        font-size: clamp(44px, 5vw, 74px);
        line-height: 0.96;
        letter-spacing: -0.06em;
    }

    .value-copy > p {
        max-width: 580px;
        color: rgb(33 28 26 / 0.7);
        font-size: 17px;
        line-height: 1.7;
    }

    .rhythm-picker {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 11px;
        margin-top: 32px;
    }

    .rhythm-picker button {
        position: relative;
        display: grid;
        min-width: 0;
        min-height: 118px;
        align-content: center;
        gap: 3px;
        padding: 15px 12px;
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
    .rhythm-picker span { overflow: hidden; font-size: 11px; font-weight: 800; text-overflow: ellipsis; }
    .rhythm-picker b { font-size: 30px; line-height: 1; }
    .rhythm-picker small { color: #756e67; font-size: 8px; }

    .value-note {
        display: block;
        margin-top: 20px;
        color: #6752c8;
        font: 700 22px Caveat, cursive;
        text-align: right;
        transform: rotate(-2deg);
    }

    .time-stage {
        position: relative;
        padding: 42px;
        border: 2px solid var(--workshop-ink);
        border-radius: 27px 17px 31px 19px;
        background: #fffdf7;
        box-shadow: 11px 12px 0 var(--workshop-ink);
        transform: rotate(0.7deg);
    }

    .tape {
        position: absolute;
        top: -17px;
        left: 40%;
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

    .time-stage > header div { display: flex; flex-direction: column; gap: 4px; }
    .time-stage > header small { font-size: 9px; font-weight: 800; letter-spacing: 0.12em; }
    .time-stage > header b { font-size: 19px; }
    .time-stage > header > span { color: #716961; font-size: 11px; }

    .time-result-slot { display: grid; min-height: 194px; align-items: start; }

    .time-result {
        margin-top: 22px;
        padding: 22px 25px;
        border: 2px solid var(--workshop-ink);
        border-radius: 17px 12px 20px 14px;
        background: #ffd84d;
        box-shadow: 5px 6px 0 var(--workshop-ink);
    }

    .time-result > small { font-size: 9px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
    .time-result strong { display: flex; align-items: baseline; gap: 8px; margin: 4px 0; font-size: clamp(48px, 5vw, 72px); line-height: 0.95; letter-spacing: -0.06em; }
    .time-result strong i { font: 700 28px Caveat, cursive; letter-spacing: 0; }
    .time-result strong em { font-size: 22px; font-style: normal; letter-spacing: -0.03em; }
    .time-result p { max-width: 520px; margin: 10px 0 0; color: rgb(33 28 26 / 0.72); font-size: 12px; line-height: 1.5; }

    .routine-compare { position: relative; display: grid; gap: 13px; margin-top: 25px; padding: 22px; border: 2px solid var(--workshop-ink); border-radius: 16px 22px 14px 19px; background: #fff; }
    .routine-compare > div { display: grid; grid-template-columns: 1fr auto; gap: 5px 15px; align-items: center; }
    .routine-compare span { display: flex; flex-direction: column; }
    .routine-compare b { font-size: 12px; }
    .routine-compare small { color: #837b74; font-size: 8px; }
    .routine-compare strong { font-size: 13px; }
    .routine-compare div > i { grid-column: 1 / 3; height: 14px; overflow: hidden; border: 2px solid var(--workshop-ink); border-radius: 99px; background: #f1ede7; }
    .routine-compare div > i em { display: block; width: 100%; height: 100%; border-radius: inherit; background: var(--workshop-orange); transition: width 320ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .routine-compare__klick > i em { background: var(--workshop-green); }
    .routine-compare mark { position: absolute; right: -20px; bottom: -19px; padding: 7px 12px; color: var(--workshop-ink); border: 2px solid var(--workshop-ink); background: var(--workshop-green); font: 700 18px Caveat, cursive; transform: rotate(-3deg); }

    .time-outcomes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 11px; margin-top: 34px; }
    .time-outcomes article { display: flex; min-height: 86px; align-items: center; gap: 10px; padding: 13px; border: 2px solid var(--workshop-ink); border-radius: 13px 18px 12px 16px; background: #e8e3ff; }
    .time-outcomes article:nth-child(2) { background: #dff2ff; transform: rotate(-1deg); }
    .time-outcomes article:nth-child(3) { background: #daf5e7; transform: rotate(1deg); }
    .time-outcomes b { font-size: 30px; line-height: 1; }
    .time-outcomes span { font-size: 8px; font-weight: 700; line-height: 1.35; }

    .time-stage > footer { margin-top: 18px; color: #817970; font-size: 9px; text-align: center; }

    .time-pop-enter-active,
    .time-pop-leave-active { transition: opacity 150ms ease, transform 150ms ease; }
    .time-pop-enter-from { opacity: 0; transform: translateY(8px) rotate(-1deg); }
    .time-pop-leave-to { opacity: 0; transform: translateY(-5px) rotate(1deg); }

    @media (max-width: 980px) {
        .value-grid { grid-template-columns: 1fr; }
        .value-copy { max-width: 760px; }
        .rhythm-picker { max-width: 620px; }
        .value-note { max-width: 620px; }
    }

    @media (max-width: 620px) {
        .rhythm-picker { grid-template-columns: 1fr; }
        .rhythm-picker button { min-height: 78px; grid-template-columns: 1fr auto; align-items: center; }
        .rhythm-picker button span { font-size: 13px; }
        .rhythm-picker button b { grid-row: 1 / 3; grid-column: 2; font-size: 34px; }
        .time-stage { padding: 30px 20px; }
        .time-stage > header { align-items: flex-start; flex-direction: column; gap: 8px; }
        .time-result-slot { min-height: 218px; }
        .time-result strong { flex-wrap: wrap; }
        .time-outcomes { grid-template-columns: 1fr; }
        .time-outcomes article { min-height: 72px; }
        .routine-compare mark { right: 8px; }
    }

    @media (prefers-reduced-motion: reduce) {
        .rhythm-picker button,
        .routine-compare div > i em,
        .time-pop-enter-active,
        .time-pop-leave-active { transition: none; }
    }
</style>
