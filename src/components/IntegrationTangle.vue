<template>
    <section id="connections" class="tangle-section section-pad">
        <div class="shell">
            <div class="tangle-heading">
                <div>
                    <span class="section-kicker">Почему привычные инструменты не справляются</span>
                    <h2>Каждый сервис знает<br>только часть урока</h2>
                </div>
                <p>Расписание приходится сверять с перепиской, материалы искать в папках, а оплаты переносить в таблицу. Нажмите на инструмент — и посмотрите, что меняется в Klick.</p>
            </div>

            <div class="tangle-board">
                <svg class="tangle-threads" viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true">
                    <path v-for="tool in tools" :key="`${tool.id}-outline`" class="thread-outline" :class="{ active: activeId === tool.id }" :d="tool.path" />
                    <path v-for="tool in tools" :key="`${tool.id}-core`" class="thread-core" :class="{ active: activeId === tool.id }" :d="tool.path" />
                </svg>

                <button
                    v-for="tool in tools"
                    :key="tool.id"
                    type="button"
                    class="tool-note"
                    :class="[`tool-note--${tool.id}`, { active: activeId === tool.id }]"
                    @click="activeId = tool.id"
                >
                    <component :is="tool.icon" :size="21" />
                    <span><b>{{ tool.title }}</b><small>{{ tool.service }}</small></span>
                </button>

                <div class="yarn-ball" aria-label="Klick связывает инструменты">
                    <img src="/yarn-ball.svg" alt="" aria-hidden="true">
                    <span>Klick</span>
                </div>

                <Transition name="thread-copy" mode="out-in">
                    <article :key="activeTool.id" class="tangle-result">
                        <small>Вместо {{ activeTool.service }}</small>
                        <h3>{{ activeTool.heading }}</h3>
                        <p>{{ activeTool.text }}</p>
                        <strong>{{ activeTool.result }}</strong>
                    </article>
                </Transition>
            </div>

            <p class="tangle-summary"><span>Один ученик</span><i></i><span>один контекст</span><i></i><b>один Klick</b></p>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { CalendarDays, FolderOpen, MessageCircleMore, NotebookPen, Video, WalletCards } from '@lucide/vue';

    const tools = [
        { id : 'calendar', title : 'Календарь', service : 'отдельного календаря', heading : 'Расписание знает контекст', text : 'Урок связан с учеником, условиями, оплатой и историей переносов.', result : 'Не нужно сверять несколько расписаний', icon : CalendarDays, path : 'M470 238C407 210 361 173 302 169C231 164 191 106 120 88' },
        { id : 'video', title : 'Видеозвонок', service : 'ссылок на Zoom', heading : 'Звонок начинается внутри урока', text : 'План, участники и материалы уже рядом — внешнюю ссылку не нужно искать в чате.', result : 'Ученик всегда знает, куда подключаться', icon : Video, path : 'M535 225C607 220 645 161 711 154C780 147 822 97 888 76' },
        { id : 'files', title : 'Файлы', service : 'папок на диске', heading : 'Материалы остаются частью обучения', text : 'Файл прикреплён к предмету, теме, уроку или конкретному ученику.', result : 'Нужный материал находится из контекста', icon : FolderOpen, path : 'M464 276C393 298 354 354 288 351C215 347 165 404 96 430' },
        { id : 'chat', title : 'Переписка', service : 'общего мессенджера', heading : 'Сообщения помнят, о чём речь', text : 'Комментарии к работе и договорённости не теряются среди других диалогов.', result : 'Меньше повторных вопросов и объяснений', icon : MessageCircleMore, path : 'M540 278C615 294 656 348 727 347C799 346 843 404 910 434' },
        { id : 'notes', title : 'Заметки', service : 'личных заметок', heading : 'История ученика собрана целиком', text : 'Цели, прогресс, прошедшие занятия и следующие действия доступны в профиле.', result : 'Контекст не приходится держать в голове', icon : NotebookPen, path : 'M477 221C458 170 402 155 376 112C347 64 330 52 306 38' },
        { id : 'pay', title : 'Оплаты', service : 'таблиц и ручного учёта', heading : 'Финансы продолжают расписание', text : 'Пакеты, списания, оплаты и отмены образуют понятную историю операций.', result : 'Баланс ученика всегда актуален', icon : WalletCards, path : 'M521 292C537 340 584 351 584 401C584 447 603 478 614 506' }
    ] as const;

    const activeId = ref<(typeof tools)[number]['id']>('calendar');
    const activeTool = computed(() => tools.find(tool => tool.id === activeId.value) ?? tools[0]);
</script>

<style scoped>
    .tangle-section{position:relative;overflow:hidden;background:#fffaf0;border-bottom:2px solid var(--workshop-ink)}
    .tangle-heading{display:grid;grid-template-columns:1.1fr .8fr;gap:9vw;align-items:end;margin-bottom:48px}.tangle-heading h2{margin:22px 0 0;font-size:clamp(42px,5vw,76px);line-height:.96;letter-spacing:-.06em}.tangle-heading p{margin:0;color:rgb(33 28 26/.7);font-size:17px;line-height:1.7}
    .tangle-board{position:relative;height:610px;overflow:hidden;border:2px solid var(--workshop-ink);border-radius:34px 22px 38px 20px;background-color:#dff2ff;background-image:radial-gradient(rgb(33 28 26/.14) 1px,transparent 1px);background-size:22px 22px;box-shadow:10px 11px 0 var(--workshop-ink)}
    .tangle-threads{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.tangle-threads path{fill:none;stroke-linecap:round;stroke-linejoin:round;transition:stroke .2s,stroke-width .2s,opacity .2s}.thread-outline{stroke:var(--workshop-ink);stroke-width:13;opacity:.92}.thread-core{stroke:#ff9d00;stroke-width:7}.thread-outline.active{stroke-width:17}.thread-core.active{stroke:#ffd84d;stroke-width:10}
    .tool-note{position:absolute;z-index:3;width:190px;display:flex;gap:11px;align-items:center;padding:13px;text-align:left;color:var(--workshop-ink);border:2px solid var(--workshop-ink);border-radius:9px 15px 8px 13px;background:#fffdf7;box-shadow:4px 4px 0 var(--workshop-ink);cursor:pointer;transition:.18s}.tool-note:hover,.tool-note.active{transform:translate(2px,2px) rotate(0)!important;box-shadow:1px 1px 0 var(--workshop-ink);background:#ffd84d}.tool-note>span{display:flex;min-width:0;flex-direction:column}.tool-note b{font-size:13px}.tool-note small{overflow:hidden;color:#716963;font-size:10px;text-overflow:ellipsis;white-space:nowrap}.tool-note--calendar{top:8%;left:5%;transform:rotate(-2deg)}.tool-note--video{top:7%;right:5%;transform:rotate(2deg)}.tool-note--files{bottom:10%;left:4%;transform:rotate(1deg)}.tool-note--chat{right:4%;bottom:9%;transform:rotate(-2deg)}.tool-note--notes{top:3%;left:35%;transform:rotate(1deg)}.tool-note--pay{left:52%;bottom:3%;transform:rotate(-1deg)}
    .yarn-ball{position:absolute;z-index:2;top:24%;left:37%;width:270px;height:270px;transform:rotate(-3deg);filter:drop-shadow(10px 11px 0 rgb(33 28 26/.92));pointer-events:none}.yarn-ball img{width:100%;height:100%;display:block;object-fit:contain}.yarn-ball span{position:absolute;top:50%;left:50%;color:#fffdf7;font:700 44px Caveat,cursive;text-shadow:2px 2px 0 var(--workshop-ink);transform:translate(-50%,-50%) rotate(3deg)}
    .tangle-result{position:absolute;z-index:4;top:29%;right:4%;width:290px;padding:22px;border:2px solid var(--workshop-ink);border-radius:18px 10px 20px 12px;background:#fffdf7;box-shadow:6px 7px 0 var(--workshop-lilac);transform:rotate(1deg)}.tangle-result small{text-transform:uppercase;letter-spacing:.08em;color:#7c6f65;font-size:9px;font-weight:800}.tangle-result h3{margin:9px 0;font-size:21px}.tangle-result p{margin:0;color:#655d57;font-size:12px;line-height:1.55}.tangle-result strong{display:block;margin-top:14px;color:#6752c8;font:700 18px/1.1 Caveat,cursive}
    .tangle-summary{display:flex;justify-content:center;align-items:center;gap:12px;margin:36px 0 0;font:700 24px Caveat,cursive}.tangle-summary i{width:75px;border-top:3px solid var(--workshop-orange);transform:rotate(-2deg)}.tangle-summary b{color:#6752c8}.thread-copy-enter-active,.thread-copy-leave-active{transition:.16s}.thread-copy-enter-from,.thread-copy-leave-to{opacity:0;transform:translateY(8px) rotate(1deg)}
    @media(max-width:900px){.tangle-heading{grid-template-columns:1fr;gap:18px}.tangle-board{height:760px}.yarn-ball{top:32%;left:32%}.tangle-result{top:62%;right:20%;width:60%}.tool-note--notes{left:38%}.tool-note--pay{left:38%}}
    @media(max-width:620px){.tangle-board{height:1000px}.tool-note{width:145px}.tool-note--calendar{top:12%;left:3%}.tool-note--video{top:12%;right:3%}.tool-note--files{left:3%}.tool-note--chat{right:3%}.tool-note--notes{top:4%;left:29%}.tool-note--pay{left:28%}.yarn-ball{top:31%;left:15%;width:245px;height:245px}.tangle-result{top:56%;right:8%;width:84%}.tangle-summary{font-size:19px}.tangle-summary i{width:25px}}
</style>
