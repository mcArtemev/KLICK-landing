<template>
    <section id="lesson-journey" class="journey-section section-pad">
        <div class="shell">
            <div class="journey-heading">
                <span class="section-kicker">Один урок — один процесс</span>
                <h2>Контекст движется<br>вместе с учеником</h2>
                <p>Выберите шаг. Каждое действие продолжает предыдущее — данные не нужно переносить между сервисами вручную.</p>
            </div>
            <div class="journey-track">
                <span class="journey-thread" aria-hidden="true"></span>
                <button v-for="(step,index) in steps" :key="step.title" type="button" :class="{ active:index===activeIndex,done:index<activeIndex }" @click="activeIndex=index"><i>{{ index+1 }}</i><component :is="step.icon" :size="20"/><span><b>{{step.title}}</b><small>{{step.short}}</small></span></button>
            </div>
            <Transition name="journey-card" mode="out-in"><article :key="activeIndex" class="journey-card"><div><small>ШАГ 0{{activeIndex+1}}</small><h3>{{activeStep.heading}}</h3><p>{{activeStep.text}}</p><strong>✓ {{activeStep.result}}</strong></div><aside><header><span>{{activeStep.uiTitle}}</span><i>•••</i></header><p v-for="(row,index) in activeStep.rows" :key="row"><em>{{index+1}}</em><span>{{row}}</span><small>{{index===0?'Готово':'Связано'}}</small></p></aside></article></Transition>
        </div>
    </section>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { Bell, ClipboardCheck, CreditCard, FileText, Presentation, Video } from '@lucide/vue';
    const steps=[
        {title:'Урок создан',short:'в календаре',heading:'Преподаватель выбирает время и ученика',text:'Klick сразу связывает занятие с профилем ученика, условиями и учебным планом.',result:'весь контекст уже прикреплён',uiTitle:'Событие календаря',rows:['Александр · Английский B1','15 сентября · 12:30','Пакет · 4 занятия'],icon:Presentation},
        {title:'Ученик уведомлён',short:'без сообщения вручную',heading:'Изменение появляется у ученика',text:'Дата, время и следующий шаг доступны в кабинете и центре уведомлений.',result:'не нужно дублировать в мессенджере',uiTitle:'Уведомления',rows:['Новый урок · 12:30','Материал прикреплён','Напоминание включено'],icon:Bell},
        {title:'Видеоурок',short:'внутри события',heading:'Звонок начинается из карточки урока',text:'Участники, демонстрация экрана, чат и интерактивная доска открываются из одного места.',result:'ссылка не потеряется',uiTitle:'Видеоурок · B1',rows:['Александр подключён','Демонстрация экрана','Доска доступна'],icon:Video},
        {title:'Материалы',short:'уже рядом',heading:'Нужные файлы открываются из урока',text:'Материалы остаются связаны с темой и доступны ученику после занятия.',result:'не нужно искать папку',uiTitle:'Материалы урока',rows:['Present Perfect.pdf','Практика.docx','Снапшот доски'],icon:FileText},
        {title:'Практика',short:'назначена ученику',heading:'Задание продолжает тему занятия',text:'Ученик сдаёт работу, преподаватель комментирует прямо в файле и фиксирует результат.',result:'обратная связь остаётся в работе',uiTitle:'Эссе «Past Simple»',rows:['Работа ученика','3 комментария','Оценка · 9 из 10'],icon:ClipboardCheck},
        {title:'Оплата',short:'учтена автоматически',heading:'Финансы продолжают расписание',text:'Проведённое занятие отражается в пакете и истории операций ученика.',result:'баланс всегда актуален',uiTitle:'История операций',rows:['Занятие проведено','Списано из пакета · 1','Осталось · 3'],icon:CreditCard}
    ];
    const activeIndex=ref(0); const activeStep=computed(()=>steps[activeIndex.value]);
</script>
<style scoped>
    .journey-section{overflow:hidden;background:var(--workshop-green);border-block:2px solid var(--workshop-ink)}.journey-heading{max-width:760px;margin-bottom:52px}.journey-heading h2{margin:22px 0;font-size:clamp(44px,5vw,76px);line-height:.96;letter-spacing:-.06em}.journey-heading p{max-width:650px;color:rgb(33 28 26/.7);font-size:17px;line-height:1.65}.journey-track{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.journey-thread{position:absolute;top:34px;right:5%;left:5%;border-top:4px dashed var(--workshop-ink)}.journey-track button{position:relative;z-index:2;min-height:145px;padding:17px 12px;color:var(--workshop-ink);border:2px solid var(--workshop-ink);border-radius:15px 22px 14px 18px;background:#fffdf7;box-shadow:4px 5px 0 var(--workshop-ink);cursor:pointer;text-align:left}.journey-track button>i{position:absolute;top:-12px;left:50%;width:25px;height:25px;display:grid;place-items:center;border:2px solid var(--workshop-ink);border-radius:50%;background:#ffd84d;font-size:11px;font-style:normal;font-weight:800}.journey-track button>svg{margin:15px 0 12px}.journey-track button span{display:flex;flex-direction:column;gap:5px}.journey-track button b{font-size:12px}.journey-track button small{color:#777069;font-size:9px}.journey-track button.active{background:var(--workshop-lilac);transform:translateY(-6px) rotate(-1deg);box-shadow:7px 8px 0 var(--workshop-ink)}.journey-track button.done>i{background:var(--workshop-orange)}
    .journey-card{width:min(880px,92%);display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;margin:34px auto 0;padding:32px;border:2px solid var(--workshop-ink);border-radius:25px 17px 29px 16px;background:#fffdf7;box-shadow:9px 10px 0 var(--workshop-ink)}.journey-card>div>small{font-size:9px;font-weight:800;letter-spacing:.12em}.journey-card h3{margin:10px 0;font-size:28px}.journey-card>div p{color:#69615b;line-height:1.6}.journey-card strong{color:#24865b;font:700 19px Caveat,cursive}.journey-card aside{padding:18px;border:2px solid var(--workshop-ink);border-radius:14px;background:#fff;transform:rotate(1deg)}.journey-card aside header{display:flex;justify-content:space-between;padding-bottom:10px;font-weight:800}.journey-card aside header i{font-style:normal}.journey-card aside p{display:grid;grid-template-columns:24px 1fr auto;align-items:center;margin:0;padding:11px 0;border-top:1px solid #e7e5e4;font-size:10px}.journey-card aside em{width:19px;height:19px;display:grid;place-items:center;border-radius:6px;background:#f5f5f4;font-style:normal}.journey-card aside small{border-radius:99px;background:#ecfdf5;padding:4px 6px;color:#047857}.journey-card-enter-active,.journey-card-leave-active{transition:.17s}.journey-card-enter-from,.journey-card-leave-to{opacity:0;transform:translateY(10px)}
    @media(max-width:900px){.journey-track{grid-template-columns:repeat(3,1fr)}.journey-thread{display:none}}@media(max-width:620px){.journey-track{grid-template-columns:1fr 1fr}.journey-card{grid-template-columns:1fr;padding:22px}}
</style>
