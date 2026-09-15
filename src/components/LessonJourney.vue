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
            <div class="journey-card-slot">
                <Transition name="journey-card" mode="out-in"><article :key="activeIndex" class="journey-card"><div><small>ШАГ 0{{activeIndex+1}}</small><h3>{{activeStep.heading}}</h3><p>{{activeStep.text}}</p><strong>✓ {{activeStep.result}}</strong></div><aside><header><span>{{activeStep.uiTitle}}</span><i>•••</i></header><p v-for="(row,index) in activeStep.rows" :key="row"><em>{{index+1}}</em><span>{{row}}</span><small>{{index===0?'Готово':'Связано'}}</small></p></aside></article></Transition>
            </div>
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
    .journey-section{overflow:hidden;background:var(--workshop-green);border-block:2px solid var(--workshop-ink)}.journey-heading{max-width:760px;margin-bottom:52px}.journey-heading h2{margin:22px 0;font-size:clamp(44px,5vw,76px);line-height:.96;letter-spacing:-.06em}.journey-heading p{max-width:650px;color:rgb(33 28 26/.7);font-size:17px;line-height:1.65}.journey-track{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.journey-thread{position:absolute;top:34px;right:5%;left:5%;border-top:4px dashed var(--workshop-ink)}.journey-track button{position:relative;z-index:2;min-height:165px;padding:20px 14px;color:var(--workshop-ink);border:2px solid var(--workshop-ink);border-radius:15px 22px 14px 18px;background:#fffdf7;box-shadow:4px 5px 0 var(--workshop-ink);cursor:pointer;text-align:left}.journey-track button>i{position:absolute;top:-12px;left:50%;width:28px;height:28px;display:grid;place-items:center;border:2px solid var(--workshop-ink);border-radius:50%;background:#ffd84d;font-size:13px;font-style:normal;font-weight:800}.journey-track button>svg{width:23px;height:23px;margin:17px 0 13px}.journey-track button span{display:flex;flex-direction:column;gap:7px}.journey-track button b{font-size:15px;line-height:1.2}.journey-track button small{color:#655f59;font-size:12px;line-height:1.35}.journey-track button.active{background:var(--workshop-lilac);transform:translateY(-6px) rotate(-1deg);box-shadow:7px 8px 0 var(--workshop-ink)}.journey-track button.done>i{background:var(--workshop-orange)}
    .journey-card-slot{display:grid;min-height:400px;align-items:start}.journey-card{width:min(980px,96%);min-height:330px;display:grid;grid-template-columns:.9fr 1.1fr;gap:42px;margin:38px auto 0;padding:38px;border:2px solid var(--workshop-ink);border-radius:25px 17px 29px 16px;background:#fffdf7;box-shadow:9px 10px 0 var(--workshop-ink)}.journey-card>div>small{font-size:11px;font-weight:800;letter-spacing:.12em}.journey-card h3{margin:12px 0;font-size:32px;line-height:1.1}.journey-card>div p{color:#69615b;font-size:17px;line-height:1.6}.journey-card strong{color:#24865b;font:700 23px Caveat,cursive}.journey-card aside{padding:22px;border:2px solid var(--workshop-ink);border-radius:14px;background:#fff;transform:rotate(1deg)}.journey-card aside header{display:flex;justify-content:space-between;padding-bottom:12px;font-size:18px;font-weight:800}.journey-card aside header i{font-style:normal}.journey-card aside p{display:grid;grid-template-columns:28px 1fr auto;align-items:center;margin:0;padding:13px 0;border-top:1px solid #e7e5e4;font-size:13px}.journey-card aside em{width:23px;height:23px;display:grid;place-items:center;border-radius:6px;background:#f5f5f4;font-style:normal}.journey-card aside small{border-radius:99px;background:#ecfdf5;padding:5px 8px;color:#047857;font-size:11px}.journey-card-enter-active,.journey-card-leave-active{transition:.17s}.journey-card-enter-from,.journey-card-leave-to{opacity:0;transform:translateY(10px)}
    @media(max-width:900px){.journey-track{grid-template-columns:repeat(3,1fr)}.journey-thread{display:none}}@media(max-width:620px){.journey-track{grid-template-columns:1fr 1fr}.journey-card-slot{min-height:650px}.journey-card{min-height:610px;grid-template-columns:1fr;padding:22px}}
</style>
