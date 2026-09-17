<template>
    <section id="development" class="future-section section-pad">
        <div class="shell">
            <div class="future-heading"><div><span class="section-kicker">Klick развивается</span><h2>Следующие инструменты<br>уже на столе</h2></div><p>Одна дорожная карта вместо списка обещаний. Выберите направление и посмотрите, какую задачу преподавателя оно продолжит решать.</p></div>
            <div class="future-map">
                <span class="future-thread"></span>
                <div class="future-tabs" role="tablist" aria-label="Дорожная карта Klick">
                    <button v-for="(item,index) in developments" :key="item.id" type="button" role="tab" :aria-selected="activeId===item.id" :class="{active:activeId===item.id}" @click="activeId=item.id"><i>{{String(index+1).padStart(2,'0')}}</i><component :is="item.icon" :size="19"/><span><b>{{item.title}}</b><small>{{item.stage}}</small></span></button>
                </div>
                <div class="future-card-slot">
                    <Transition name="future-card" mode="out-in"><article :key="activeDevelopment.id" class="future-card"><span class="future-pin"></span><small>{{activeDevelopment.stage}}</small><h3>{{activeDevelopment.title}}</h3><p>{{activeDevelopment.text}}</p><div><i v-for="tag in activeDevelopment.tags" :key="tag">{{tag}}</i></div><strong>{{activeDevelopment.value}}</strong></article></Transition>
                </div>
            </div>
            <p class="future-disclaimer">Порядок этапов может меняться по результатам обратной связи пользователей.</p>
        </div>
    </section>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { Bot, Code2, Gamepad2, ShoppingBag, Smartphone, UserRoundSearch } from '@lucide/vue';
    const developments=[
        {id:'search',stage:'ПОИСК И РОСТ',title:'Сообщество учеников и репетиторов',text:'Общайтесь и обменивайтесь опытом.',tags:['Профили','Умный поиск','Рекомендации'],value:'Поможет хорошим преподавателям и ученикам быстрее находить друг друга.',icon:UserRoundSearch},
        {id:'ai',stage:'УМНЫЕ ИНСТРУМЕНТЫ',title:'AI инструменты',text:'Умные помощники в повседневных делах.',tags:['План урока','Упражнения','Аналитика'],value:'Сократит подготовительную рутину, сохранив решение за преподавателем.',icon:Bot},
        {id:'ide',stage:'НОВЫЕ ФОРМАТЫ',title:'IDE для преподавания программирования',text:'Совместный код, терминал, задания и комментарии внутри занятия.',tags:['Совместный код','Терминал','Задания'],value:'Перенесёт практическую часть урока программирования в общий контекст.',icon:Code2},
        {id:'game',stage:'ИНТЕРАКТИВ',title:'Геймификация и награды',text:'Достижения, серии занятий и игровые механики для поддержки мотивации.',tags:['Достижения','XP','Интерактив'],value:'Сделает прогресс ученика заметным и эмоционально приятным.',icon:Gamepad2},
        {id:'mobile',stage:'KLICK ВЕЗДЕ',title:'Мобильное приложение',text:'Расписание, сообщения, задания и материалы для преподавателя и ученика.',tags:['iOS','Android','Уведомления'],value:'Оставит важные действия рядом, даже когда нет компьютера рядом.',icon:Smartphone},
        {id:'market',stage:'ЭКОСИСТЕМА',title:'Маркетплейс материалов',text:'Материалы, тесты и учебные пособия от преподавателей с быстрым добавлением.',tags:['Материалы','Тесты','Пособия'],value:'Позволит делиться методическими наработками и получать готовую основу.',icon:ShoppingBag}
    ] as const;
    const activeId=ref<(typeof developments)[number]['id']>('search'); const activeDevelopment=computed(()=>developments.find(x=>x.id===activeId.value)??developments[0]);
</script>
<style scoped>
    .future-section{overflow:hidden;background-color:#dff2ff;background-image:linear-gradient(rgb(33 28 26/.07) 1px,transparent 1px);background-size:100% 30px;border-bottom:2px solid var(--workshop-ink)}.future-heading{display:grid;grid-template-columns:1.1fr .8fr;gap:8vw;align-items:end;margin-bottom:50px}.future-heading h2{margin:22px 0 0;font-size:clamp(43px,5vw,74px);line-height:.97;letter-spacing:-.06em}.future-heading p{color:rgb(33 28 26/.7);font-size:17px;line-height:1.7}.future-map{position:relative;display:grid;grid-template-columns:.8fr 1.2fr;gap:34px}.future-thread{position:absolute;top:-20px;bottom:-20px;left:31%;border-left:4px dashed #6752c8}.future-tabs{z-index:2;display:flex;flex-direction:column;gap:10px}.future-tabs button{display:grid;grid-template-columns:32px 26px 1fr;gap:10px;align-items:center;padding:14px;text-align:left;color:var(--workshop-ink);border:2px solid var(--workshop-ink);border-radius:13px 19px 12px 17px;background:#fffdf7;box-shadow:4px 4px 0 var(--workshop-ink);cursor:pointer}.future-tabs button.active{background:var(--workshop-lilac);transform:translateX(7px);box-shadow:7px 6px 0 var(--workshop-ink)}.future-tabs button>i{font:700 17px Caveat,cursive;font-style:normal}.future-tabs button span{display:flex;flex-direction:column;gap:3px}.future-tabs b{font-size:12px}.future-tabs small{font-size:8px;letter-spacing:.08em}.future-card-slot{display:grid;min-height:455px;align-items:start}.future-card{position:relative;min-height:425px;padding:58px;border:2px solid var(--workshop-ink);border-radius:30px 18px 28px 16px;background:#fffdf7;box-shadow:11px 12px 0 var(--workshop-ink);transform:rotate(1deg)}.future-pin{position:absolute;top:18px;left:50%;width:16px;height:16px;border:2px solid var(--workshop-ink);border-radius:50%;background:var(--workshop-orange);box-shadow:0 5px 0 var(--workshop-ink)}.future-card>small{font-size:10px;font-weight:800;letter-spacing:.13em}.future-card h3{max-width:650px;margin:18px 0;font-size:clamp(30px,4vw,51px);line-height:1;letter-spacing:-.04em}.future-card p{max-width:650px;color:#655d57;font-size:15px;line-height:1.65}.future-card div{display:flex;flex-wrap:wrap;gap:8px;margin:25px 0}.future-card div i{padding:7px 10px;border:1px solid var(--workshop-ink);border-radius:99px;background:#fff3a8;font-size:9px;font-style:normal}.future-card strong{display:block;max-width:600px;color:#6752c8;font:700 24px/1.15 Caveat,cursive}.future-disclaimer{margin:32px 0 0;color:#777069;font-size:11px;text-align:center}.future-card-enter-active,.future-card-leave-active{transition:.18s}.future-card-enter-from,.future-card-leave-to{opacity:0;transform:translateY(12px) rotate(1deg)}
    @media(max-width:800px){.future-heading,.future-map{grid-template-columns:1fr}.future-thread{display:none}.future-tabs{display:grid;grid-template-columns:1fr 1fr}.future-card-slot{min-height:420px}.future-card{min-height:390px;padding:38px}}@media(max-width:520px){.future-card-slot{min-height:500px}.future-tabs{grid-template-columns:1fr}.future-card{min-height:460px;padding:32px 22px}}
</style>
