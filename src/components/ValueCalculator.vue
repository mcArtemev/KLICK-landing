<template>
    <section class="value-section section-pad">
        <div class="shell value-grid">
            <div class="value-copy">
                <span class="section-kicker">Сколько стоит переключение между сервисами</span>
                <h2>Верните время<br>самому преподаванию</h2>
                <p>Оцените повторяющиеся действия: сверку расписания, поиск материалов, напоминания, перенос данных и учёт оплат.</p>
                <span class="value-note">подвигайте ползунки ↘</span>
            </div>
            <div class="calculator-sheet">
                <span class="tape"></span>
                <label><span>Занятий в неделю <b>{{ lessons }}</b></span><input v-model.number="lessons" type="range" min="5" max="60"></label>
                <label><span>Активных учеников <b>{{ students }}</b></span><input v-model.number="students" type="range" min="3" max="50"></label>
                <label><span>Минут рутины на занятие <b>{{ minutes }}</b></span><input v-model.number="minutes" type="range" min="5" max="40"></label>
                <div class="calculator-result"><small>Ориентир на месяц</small><strong>≈ {{ savedHours }} часов</strong><p>Можно вернуть для подготовки, отдыха или ещё <b>{{ extraLessons }} занятий</b>.</p></div>
                <em>Оценочная модель, а не гарантированный результат.</em>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    const lessons=ref(24); const students=ref(14); const minutes=ref(18);
    const savedHours=computed(()=>Math.max(1,Math.round((lessons.value*4.3*minutes.value*.55+students.value*4)/60)));
    const extraLessons=computed(()=>Math.max(1,Math.round(savedHours.value/2)));
</script>
<style scoped>
    .value-section{background:#fffaf0}.value-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:8vw;align-items:center}.value-copy h2{margin:22px 0;font-size:clamp(44px,5vw,74px);line-height:.96;letter-spacing:-.06em}.value-copy p{max-width:580px;color:rgb(33 28 26/.7);font-size:17px;line-height:1.7}.value-note{float:right;margin-top:12px;color:#6752c8;font:700 24px Caveat,cursive;transform:rotate(-3deg)}.calculator-sheet{position:relative;padding:44px;border:2px solid var(--workshop-ink);border-radius:27px 17px 31px 19px;background:#fffdf7;box-shadow:10px 11px 0 var(--workshop-ink);transform:rotate(1deg)}.tape{position:absolute;top:-17px;left:40%;width:120px;height:32px;background:rgb(183 165 255/.72);transform:rotate(-2deg)}label{display:block;margin-bottom:26px}label>span{display:flex;justify-content:space-between;margin-bottom:11px;font-size:13px;font-weight:700}label b{font-size:17px}input{width:100%;accent-color:#ff9d00}.calculator-result{margin-top:8px;padding:24px;border:2px solid var(--workshop-ink);border-radius:17px 12px 20px 14px;background:#ffd84d}.calculator-result small{font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.calculator-result strong{display:block;margin:5px 0;font-size:40px;letter-spacing:-.05em}.calculator-result p{margin:0;font-size:12px}.calculator-sheet>em{display:block;margin-top:15px;color:#817970;font-size:9px;text-align:center}.calculator-sheet:after{position:absolute;right:-42px;bottom:24px;content:'не обещание,\Aа честный ориентир';white-space:pre;color:#6752c8;font:700 17px/1 Caveat,cursive;transform:rotate(5deg)}
    @media(max-width:800px){.value-grid{grid-template-columns:1fr}.calculator-sheet:after{display:none}}@media(max-width:520px){.calculator-sheet{padding:28px 20px}}
</style>
