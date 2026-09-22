<template>
    <section id="student-space" class="roles-section section-pad">
        <div class="shell">
            <div class="roles-heading"><span class="section-kicker">Один ритм для двоих</span><h2>Один процесс.<br>Два понятных взгляда.</h2><p>Преподаватель управляет обучением, а ученик видит только то, что помогает двигаться дальше.</p><div class="role-toggle"><button type="button" :aria-pressed="role==='teacher'" :class="{active:role==='teacher'}" @click="role='teacher'">Преподаватель</button><button type="button" :aria-pressed="role==='student'" :class="{active:role==='student'}" @click="role='student'">Ученик</button></div></div>
            <div class="role-content-slot">
                <Transition name="role-card" mode="out-in">
                    <div :key="role" class="role-content">
                        <div v-if="role==='teacher'" class="role-preview teacher-preview"><header><BrandMark class="role-preview__brand" /><span>Главная</span><span>Календарь</span><span>Ученики</span><i>•••</i></header><section><small>Понедельник, 14 сентября</small><h3>Доброе утро, Анна!</h3><div class="role-metrics"><article><small>СЕГОДНЯ</small><b>4 урока</b></article><article><small>НА ПРОВЕРКЕ</small><b>3 задания</b></article><article><small>ОПЛАТЫ</small><b>Всё учтено</b></article></div><div class="role-lessons"><b>Сегодня</b><p><time>12:30</time><i></i><span><strong>Александр</strong><small>Английский · 60 мин</small></span><button type="button">Подключиться</button></p><p><time>15:00</time><i></i><span><strong>Мария</strong><small>Подготовка к экзамену</small></span><em>›</em></p></div></section></div>
                        <div v-else class="role-preview student-preview-v3"><header><BrandMark class="role-preview__brand" /><span>Главная</span><span>Календарь</span><span>Задания</span><i>•••</i></header><section><small>Добрый день, Александр!</small><h3>Что сегодня в плане</h3><div class="student-grid"><article><small>СЛЕДУЮЩИЙ УРОК</small><b>Сегодня, 12:30</b><span>Английский · Анна Смирнова</span><button type="button">Подключиться</button></article><article><small>ДОМАШНЕЕ ЗАДАНИЕ</small><b>Present Perfect</b><span>Срок: завтра, 20:00</span><em>Открыть ›</em></article></div><div class="plan-row"><span><b>Английский B1</b><small>Текущая тема: Present Perfect</small></span><strong>68%</strong><i><em></em></i></div></section></div>
                        <aside><small>{{role==='teacher'?'РАБОЧЕЕ ПРОСТРАНСТВО':'ЛИЧНЫЙ КАБИНЕТ'}}</small><h3>{{roleCopy.title}}</h3><p>{{roleCopy.text}}</p><ul><li v-for="point in roleCopy.points" :key="point">{{point}}</li></ul></aside>
                    </div>
                </Transition>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import BrandMark from './BrandMark.vue';
    const role=ref<'teacher'|'student'>('teacher');
    const roleCopy=computed(()=>role.value==='teacher'?{title:'Контроль без микроменеджмента',text:'Видно расписание, прогресс, долги и следующие действия. Контекст ученика всегда рядом.',points:['Управление расписанием','Проверка и обратная связь','Пакеты занятий и оплаты']}:{title:'Понятный следующий шаг',text:'Урок, задание, комментарий и материал находятся в одном кабинете — без поиска ссылок.',points:['Ближайший урок перед глазами','Виден маршрут и прогресс','Файлы и комментарии не теряются']});
</script>
<style scoped>
    .roles-section{background:#e8e3ff;border-bottom:2px solid var(--workshop-ink)}.roles-heading{max-width:51.25rem;margin:0 auto 45px;text-align:center}.roles-heading h2{margin:22px 0;font-size:clamp(2.75rem,5vw,4.75rem);line-height:.96;letter-spacing:-.06em}.roles-heading>p{color:rgb(33 28 26/.7);font-size:1.0625rem;line-height:1.65}.role-toggle{display:inline-flex;margin-top:20px;padding:5px;border:2px solid var(--workshop-ink);border-radius:16px 22px 15px 20px;background:#fffdf7;box-shadow:4px 4px 0 var(--workshop-ink)}.role-toggle button{padding:11px 18px;border:0;border-radius:13px 18px 11px 16px;background:transparent;cursor:pointer;font-weight:800}.role-toggle button.active{background:#ffd84d}.role-content-slot{display:grid;min-height:470px;align-items:start}.role-content{min-height:410px;display:grid;grid-template-columns:1.35fr .65fr;gap:28px;align-items:center}.role-preview{overflow:hidden;border:2px solid var(--workshop-ink);border-radius:24px 16px 28px 18px;background:#fffdf7;box-shadow:8px 9px 0 var(--workshop-ink);transform:rotate(-1deg)}.role-preview>header{display:flex;gap:25px;align-items:center;padding:17px 22px;border-bottom:2px solid var(--workshop-ink);font-size:0.625rem}.role-preview>header .role-preview__brand{font-size:2.125rem}.role-preview>header i{margin-left:auto;font-style:normal}.role-preview>section{padding:28px}.role-preview section>small{color:#8b837b;font-size:0.5625rem}.role-preview h3{margin:7px 0 20px;font-size:1.4375rem}.role-metrics,.student-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.role-metrics article,.student-grid article{display:flex;flex-direction:column;gap:6px;padding:15px;border:1px solid #e7e5e4;border-radius:12px;background:#fff}.role-metrics small,.student-grid small{font-size:0.4375rem;color:#8d857d}.role-metrics b{font-size:0.75rem}.role-lessons{margin-top:15px;padding:15px;border:1px solid #e7e5e4;border-radius:13px}.role-lessons>b{font-size:0.6875rem}.role-lessons p{display:grid;grid-template-columns:45px 3px 1fr auto;gap:10px;align-items:center;margin:0;padding:12px 0;border-top:1px solid #eee}.role-lessons time,.role-lessons small{font-size:0.5rem;color:#8d857d}.role-lessons p>i{height:30px;background:#ff9d00}.role-lessons p>span{display:flex;flex-direction:column;font-size:0.625rem}.role-lessons button,.student-grid button{padding:8px;border:0;border-radius:8px;background:#ff9d00;font-size:0.5rem;font-weight:800}.role-lessons em{font-style:normal}.student-grid{grid-template-columns:1fr 1fr}.student-grid article{min-height:145px}.student-grid b{font-size:0.875rem}.student-grid span{font-size:0.5625rem;color:#777}.student-grid button,.student-grid em{align-self:flex-start;margin-top:auto}.student-grid em{font-size:0.5625rem;font-style:normal;color:#6752c8;font-weight:800}.plan-row{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:12px;padding:16px;border:1px solid #e7e5e4;border-radius:12px}.plan-row>span{display:flex;flex-direction:column;font-size:0.6875rem}.plan-row small{font-size:0.5rem;color:#888}.plan-row>i{grid-column:1/3;height:6px;border-radius:99px;background:#eee}.plan-row>i em{display:block;width:68%;height:100%;border-radius:inherit;background:#ff9d00}.role-content>aside{padding:31px;border:2px solid var(--workshop-ink);border-radius:18px 27px 16px 24px;background:#fffdf7;box-shadow:7px 8px 0 var(--workshop-orange);transform:rotate(1deg)}.role-content>aside small{font-size:0.5625rem;font-weight:800;letter-spacing:.12em}.role-content>aside h3{font-size:1.8125rem;margin:12px 0}.role-content>aside p{color:#665e58;line-height:1.6}.role-content>aside ul{padding:0;list-style:none}.role-content>aside li{margin:11px 0;font-size:0.75rem}.role-content>aside li:before{content:'';display:inline-block;width:9px;height:9px;margin-right:9px;border:2px solid var(--workshop-ink);border-radius:50%;background:var(--workshop-green)}.role-card-enter-active,.role-card-leave-active{transition:.18s}.role-card-enter-from,.role-card-leave-to{opacity:0;transform:translateY(9px)}
    @media(min-width:851px) and (max-height:1080px){.roles-heading{max-width:68.75rem;margin-bottom:24px}.roles-heading h2{margin:12px 0;font-size:clamp(2.625rem,4vw,3.625rem)}.roles-heading>p{font-size:0.9375rem;line-height:1.5}.role-toggle{margin-top:12px}.role-content-slot{min-height:400px}.role-content{min-height:360px}.role-preview>header{padding:13px 18px}.role-preview>section{padding:20px}.role-preview h3{margin-bottom:14px}.role-content>aside{padding:24px}.role-content>aside h3{font-size:1.625rem}.role-content>aside li{margin:8px 0}}
    @media(min-width:851px) and (max-height:850px){.roles-heading{margin-bottom:17px}.roles-heading h2{font-size:2.75rem}.roles-heading>p{font-size:0.875rem}.role-toggle{margin-top:8px;padding:3px}.role-toggle button{padding:8px 14px}.role-content-slot{min-height:335px}.role-content{min-height:315px}.role-preview>section{padding:16px}.role-metrics article,.student-grid article{padding:11px}.student-grid article{min-height:120px}.role-lessons{margin-top:10px;padding:10px}.role-lessons p{padding:8px 0}.plan-row{padding:12px}.role-content>aside{padding:19px}.role-content>aside h3{margin:8px 0;font-size:1.4375rem}.role-content>aside p{font-size:0.8125rem}.role-content>aside li{margin:6px 0}}
    @media(max-width:850px){.roles-heading{margin-bottom:38px}.role-content-slot{min-height:760px}.role-content{min-height:720px;grid-template-columns:1fr;gap:28px}.role-metrics{grid-template-columns:1fr 1fr}.role-metrics article:last-child{display:none}.role-content>aside{width:100%}}
    @media(max-width:540px){
        .roles-heading{margin-bottom:32px}
        .roles-heading h2{margin:18px 0;font-size:clamp(2.75rem,14vw,3.5rem)}
        .roles-heading>p{font-size:1rem;line-height:1.6}
        .role-toggle{width:100%;margin-top:16px}
        .role-toggle button{flex:1;padding-inline:10px}
        .role-content-slot{min-height:790px}
        .role-content{width:100%;min-width:0;min-height:750px;gap:22px}
        .role-preview,.role-content>aside{width:100%;min-width:0;transform:none}
        .role-preview>header{gap:12px;padding:13px 16px}
        .role-preview>header span{display:none}
        .role-preview>section{padding:18px 16px}
        .role-preview h3{font-size:1.25rem}
        .role-metrics article{padding:12px 10px}
        .role-lessons{padding:12px 10px}
        .role-lessons p{grid-template-columns:38px 3px minmax(0,1fr);gap:7px}
        .role-lessons p>button,.role-lessons p>em{grid-column:3;justify-self:start}
        .student-grid{grid-template-columns:1fr}
        .student-grid article{min-height:118px;padding:13px}
        .role-content>aside{padding:24px 22px}
        .role-content>aside h3{font-size:1.625rem}
    }
    @media(max-width:360px){
        .role-toggle button{font-size:.8125rem}
        .role-content-slot{min-height:820px}
        .role-content{min-height:780px}
        .role-lessons p>span{min-width:0}
        .role-lessons p>span strong,.role-lessons p>span small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    }
</style>
