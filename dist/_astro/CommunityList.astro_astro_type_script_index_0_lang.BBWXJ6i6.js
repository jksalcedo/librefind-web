import{t as e}from"./supabase.C-OP-52v.js";var t=20,n=`px-4 py-1.5 rounded-full text-sm font-medium transition border`,r=`${n} bg-blue-600 text-white border-blue-500`,i=`${n} bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-white`,a={NEW_ALTERNATIVE:`New Alternative`,NEW_PROPRIETARY:`New Proprietary`,LINKING:`Linking`},o,s=[],c=0,l=1,u=`all`,d=`newest`,f=``,p=0,m=!1,h=null,g=e=>o?.querySelector(`#${e}`)??null,_=e=>{let t=g(e);if(!t)throw Error(`Required community element #${e} was not found.`);return t},v=e=>_(e).classList.remove(`hidden`),y=e=>_(e).classList.add(`hidden`);function b(e){let t=document.createElement(`div`);return t.textContent=e==null?``:String(e),t.innerHTML}function x(e){let t=Math.floor((Date.now()-new Date(e).getTime())/1e3);for(let[e,n]of[[31536e3,`y`],[2592e3,`mo`],[86400,`d`],[3600,`h`],[60,`m`]]){let r=Math.floor(t/e);if(r>=1)return`${r}${n} ago`}return`just now`}var S;function C(e,t=`info`){let n=g(`toast`);n&&(n.className=`fixed bottom-4 right-4 z-[60] px-4 py-3 rounded-lg text-white text-sm shadow-lg ${{info:`bg-blue-600`,success:`bg-green-600`,error:`bg-red-600`}[t]}`,n.textContent=e,clearTimeout(S),S=setTimeout(()=>n.classList.add(`hidden`),4e3))}async function w(){let{data:t}=await e.auth.getSession();if(t.session)return t.session;let{data:n,error:r}=await e.auth.signInAnonymously();return r?(C(r.message,`error`),null):n.session}async function T(){let n=++p;v(`loading-spinner`),y(`submission-list`),y(`empty-state`),y(`error-state`),y(`pagination`),await w();let{data:r,error:i}=await e.rpc(`get_community_queue`,{p_filter:u,p_search:f,p_sort:d,p_limit:t,p_offset:(l-1)*t});if(n!==p)return;if(y(`loading-spinner`),i){_(`error-message`).textContent=i.message,v(`error-state`);return}let a=r??{total:0,items:[]};if(s=a.items??[],c=a.total??0,s.length===0){let[n,r]=await Promise.all([e.from(`user_submissions`).select(`id, app_name, app_package, description, submission_type, status, last_edited_by, created_at, submitter_id`).eq(`status`,`PENDING`),e.from(`user_linking_submissions`).select(`id, proprietary_package, alternatives, status, last_edited_by, created_at, submitter_id`).eq(`status`,`PENDING`)]);if(n.error)throw n.error;if(r.error)throw r.error;let i=[...(n.data??[]).map(e=>({id:e.id,source_table:`user_submissions`,kind:e.submission_type,title:e.app_name,package_name:e.app_package,replaces:null,description:e.description,submitter_id:e.submitter_id,last_edited_by:e.last_edited_by,created_at:e.created_at,username:`Guest`,avatar_url:null,badge:`Scout`,reputation_score:0,upvotes:0,downvotes:0,my_vote:null})),...(r.data??[]).map(e=>({id:e.id,source_table:`user_linking_submissions`,kind:`LINKING`,title:e.proprietary_package,package_name:e.proprietary_package,replaces:e.alternatives?.join(`, `)||null,description:null,submitter_id:e.submitter_id,last_edited_by:e.last_edited_by,created_at:e.created_at,username:`Guest`,avatar_url:null,badge:`Scout`,reputation_score:0,upvotes:0,downvotes:0,my_vote:null}))],a=f.trim().toLowerCase(),o=i.filter(e=>u!==`all`&&e.kind!==u?!1:!a||[e.title,e.package_name,e.description].some(e=>e?.toLowerCase().includes(a)));o.sort((e,t)=>d===`oldest`?new Date(e.created_at).getTime()-new Date(t.created_at).getTime():d===`most_upvoted`?t.upvotes-e.upvotes:d===`most_downvoted`?t.downvotes-e.downvotes:new Date(t.created_at).getTime()-new Date(e.created_at).getTime()),c=o.length;let p=(l-1)*t;s=o.slice(p,p+t)}s.length===0?v(`empty-state`):(E(),D(),v(`submission-list`),v(`pagination`))}function E(){let e=_(`submission-list`);e.innerHTML=s.map(e=>{let t=e.upvotes-e.downvotes,n=e.my_vote===1,r=e.my_vote===-1,i=Math.max(0,5-t);return`
                <article data-detail-card="${b(e.id)}" class="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
                    <div class="flex justify-between items-start gap-4">
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap items-center gap-2 mb-1">
                                <span class="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                                    ${b(a[e.kind]??e.kind)}
                                </span>
                                ${e.package_name?`<span class="text-xs text-zinc-500 font-mono truncate">${b(e.package_name)}</span>`:``}
                            </div>

                            <h3 class="font-bold text-lg text-white break-words">${b(e.title)}</h3>

                            <div class="flex flex-wrap items-center gap-2 mt-1 text-sm">
                                <span class="text-zinc-500">by</span>
                                <span class="text-zinc-300 font-medium">${b(e.username??`Guest`)}</span>
                                <span class="text-xs px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/30">
                                    ${b(e.badge??`Scout`)}
                                </span>
                                <span class="text-xs text-zinc-500">${b(e.reputation_score??0)} rep</span>
                            </div>

                            ${e.description?`<p class="mt-3 text-zinc-300 text-sm line-clamp-2">${b(e.description)}</p>`:``}

                            <div class="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-500">
                                <span><i class="far fa-clock mr-1" aria-hidden="true"></i>${b(x(e.created_at))}</span>
                                ${e.last_edited_by?`<span><i class="fas fa-edit mr-1" aria-hidden="true"></i>Community edited</span>`:``}
                                <span class="${t>=5?`text-green-400`:`text-zinc-500`}">
                                    ${i>0?`${i} more vote(s) to auto-approve`:`Approving…`}
                                </span>
                            </div>
                        </div>

                        <div class="flex flex-col items-center gap-1 shrink-0">
                            <button
                                type="button"
                                data-detail="${b(e.id)}"
                                class="mt-3 text-xs font-medium text-zinc-300 underline underline-offset-4 hover:text-white"
                            >
                                View full details
                            </button>

                            <button
                                type="button"
                                data-vote="1"
                                data-id="${b(e.id)}"
                                aria-pressed="${n}"
                                aria-label="Upvote"
                                class="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition ${n?`text-green-500`:`text-zinc-400 hover:text-green-500`}"
                            >
                                <i class="fas fa-arrow-up text-lg" aria-hidden="true"></i>
                                <span class="text-sm font-bold">${e.upvotes}</span>
                            </button>

                            <span class="text-xs font-mono ${t>0?`text-green-400`:t<0?`text-red-400`:`text-zinc-500`}">
                                ${t>0?`+`:``}${t}
                            </span>

                            <button
                                type="button"
                                data-vote="-1"
                                data-id="${b(e.id)}"
                                aria-pressed="${r}"
                                aria-label="Downvote"
                                class="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition ${r?`text-red-500`:`text-zinc-400 hover:text-red-500`}"
                            >
                                <i class="fas fa-arrow-down text-lg" aria-hidden="true"></i>
                                <span class="text-sm font-bold">${e.downvotes}</span>
                            </button>
                        </div>
                    </div>
                </article>
            `}).join(``)}function D(){let e=Math.max(1,Math.ceil(c/t));_(`page-info`).textContent=`Page ${l} of ${e} · ${c} pending`,_(`prev-btn`).disabled=l<=1,_(`next-btn`).disabled=l>=e}function O(){o.querySelectorAll(`[data-filter]`).forEach(e=>{let t=e.dataset.filter===u;e.className=t?r:i,e.setAttribute(`aria-pressed`,String(t))})}async function k(t){let{data:n,error:r}=await e.from(`submission_votes`).select(`vote`).match({submission_id:t.id,submission_table:t.source_table});if(r)throw r;let i=(n??[]).reduce((e,t)=>e+(Number(t.vote)===1?1:-1),0),{data:a,error:o}=await e.from(t.source_table).select(`status`).eq(`id`,t.id).maybeSingle();if(o)throw o;let s=i>=5?`APPROVED`:a?.status===`APPROVED`?`PENDING`:a?.status;if(s&&s!==a?.status){let{data:n,error:r}=await e.from(t.source_table).update({status:s}).eq(`id`,t.id).select(`status`).maybeSingle();if(r)throw r;if(!n)throw Error(`Approval update was blocked by database permissions (RLS).`)}return i}async function A(t,n,r,i){if(!m){m=!0;try{let a=await w();if(!a)return;let o={submission_id:t.id,submission_table:t.source_table,user_id:a.user.id},{data:s,error:c}=await e.from(`submission_votes`).select(`vote`).match(o).maybeSingle();if(c)throw c;let l=s?Number(s.vote):null;if(l===n){let{error:t}=await e.from(`submission_votes`).delete().match(o);if(t)throw t}else{let{error:t}=await e.from(`submission_votes`).upsert({...o,vote:n,reason:r,reason_detail:i},{onConflict:`submission_id,submission_table,user_id`});if(t)throw t}await k(t)>=5?C(`Threshold reached. Submission approved.`,`success`):l===n?C(`Vote removed.`,`info`):C(l===null?n===1?`Upvoted.`:`Downvoted.`:n===1?`Changed to upvote.`:`Changed to downvote.`,`success`),await T()}catch(e){C(e instanceof Error?e.message:String(e),`error`)}finally{m=!1}}}function j(e){let t=_(`detail-repository`);t.replaceChildren();let n=typeof e==`string`?e.trim():``;if(!n)t.textContent=`-`;else try{let e=new URL(n);if(e.protocol!==`http:`&&e.protocol!==`https:`)throw Error(`Unsupported protocol`);let r=document.createElement(`a`);r.href=e.href,r.textContent=n,r.target=`_blank`,r.rel=`noopener noreferrer`,r.className=`underline underline-offset-4 hover:text-white break-all`,t.append(r)}catch{t.textContent=n}}async function M(t){_(`detail-kind`).textContent=a[t.kind]??t.kind,_(`detail-title`).textContent=t.title,_(`detail-description`).textContent=t.description||`No description provided.`,_(`detail-package`).textContent=t.package_name||`-`,_(`detail-created`).textContent=new Date(t.created_at).toLocaleString(),_(`detail-submitter`).textContent=t.username||`Guest`,_(`detail-votes`).textContent=`${t.upvotes} upvotes · ${t.downvotes} downvotes · net ${t.upvotes-t.downvotes}`,_(`detail-category`).textContent=t.replaces||`-`,j(null),_(`detail-alternatives`).textContent=t.replaces||`-`;let n=_(`detail-dialog`);n.open||n.showModal();try{let{data:n,error:r}=await e.from(t.source_table).select(`*`).eq(`id`,t.id).maybeSingle();if(r)throw r;if(!n)return;_(`detail-description`).textContent=n.description||t.description||`No description provided.`,_(`detail-package`).textContent=n.app_package||n.proprietary_package||t.package_name||`-`,_(`detail-category`).textContent=[n.category,n.license].filter(Boolean).join(` · `)||`-`,j(n.repo_url);let i=Array.isArray(n.alternatives)?n.alternatives.join(`, `):`-`;_(`detail-alternatives`).textContent=[n.fdroid_id,i].filter(e=>e&&e!==`-`).join(` · `)||`-`}catch(e){C(e instanceof Error?e.message:`Could not load full submission details.`,`error`)}}function N(e){h=e,_(`dv-target`).textContent=e.title,_(`dv-reason`).value=`DUPLICATE`,_(`dv-detail`).value=``,F(),v(`downvote-modal`)}function P(){h=null,y(`downvote-modal`)}function F(){let e=_(`dv-reason`).value,t=e===`WRONG_CATEGORY`,n=e===`DUPLICATE`||e===`OTHER`;_(`dv-category-wrap`).classList.toggle(`hidden`,!t),_(`dv-detail-wrap`).classList.toggle(`hidden`,!n&&!t)}async function I(){if(!h)return;let e=_(`dv-reason`).value,t=_(`dv-detail`).value.trim(),n=_(`dv-category`).value,r=t||null;if(e===`WRONG_CATEGORY`&&(r=t?`Correct category: ${n} — ${t}`:`Correct category: ${n}`),(e===`DUPLICATE`||e===`OTHER`)&&!t){C(`Please add a short explanation.`,`error`);return}let i=h;P(),await A(i,-1,e,r)}function L(){if(o=document.getElementById(`community-container`),!o||o.dataset.bound===`1`)return;o.dataset.bound=`1`,O();let e=_(`sort-select`);e.value=`newest`,d=`newest`;let t;_(`search-input`).addEventListener(`input`,e=>{clearTimeout(t);let n=e.target.value.trim();t=setTimeout(()=>{f=n,l=1,T()},300)}),_(`sort-select`).addEventListener(`change`,e=>{d=e.target.value,l=1,T()}),_(`dv-reason`).addEventListener(`change`,F),_(`dv-cancel`).addEventListener(`click`,P),_(`dv-confirm`).addEventListener(`click`,I),_(`detail-close`).addEventListener(`click`,()=>{_(`detail-dialog`).close()}),_(`detail-dialog`).addEventListener(`click`,e=>{e.target===e.currentTarget&&_(`detail-dialog`).close()}),o.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-filter]`);if(n){u=n.dataset.filter,l=1,O(),T();return}let r=t.closest(`[data-page]`);if(r&&!r.disabled){l+=Number(r.dataset.page),T(),window.scrollTo({top:0,behavior:`smooth`});return}if(t.closest(`[data-retry]`)){T();return}let i=t.closest(`[data-detail]`);if(i){let e=s.find(e=>e.id===i.dataset.detail);e&&M(e);return}let a=t.closest(`[data-detail-card]`);if(a&&!t.closest(`[data-vote]`)){let e=s.find(e=>e.id===a.dataset.detailCard);e&&M(e);return}let o=t.closest(`[data-vote]`);if(o){let e=s.find(e=>e.id===o.dataset.id);if(!e)return;let t=Number(o.dataset.vote);t===-1&&e.my_vote!==-1?N(e):A(e,t,null,null)}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&h&&P()}),T()}L(),document.addEventListener(`astro:page-load`,L);