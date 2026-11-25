// Versions menu: a small button in the top-right corner of every version of the game.
// Tap it to see all versions and jump to another one. The start page (index.html) shows
// the same list as its main content. Add new versions to the list below.
(function(){
  const VERSIONS=[
    {path:'tilt/',   name:'Tilt',          about:'Tilt the phone to roll the black ball. Bouncy walls.'},
    {path:'classic/',name:'Classic table', about:'The first version: a pool table with green felt and wooden rails.'},
    {path:'shake/',  name:'Tilt shake',    about:'The ball is tied to the middle by an invisible string. Tilt and shake.'},
    {path:'notilt/', name:'No tilt',       about:'Zero gravity in slow motion. Grab the ball and throw it.'},
    {path:'bouncer/',name:'Bouncer',       about:'Zero gravity. Move the black ball only by hitting it with the red one.'},
    {path:'hello/',  name:'Hello',         about:'A greeting made of dots that scatter from your finger. Pick Hello, I\'m Michal. / Hello. / Hi.'},
    {path:'hello-shake/',name:'Hello shake', about:'The Hello greeting, and a strong shake of the phone sends the dots flying.'},
  ];
  const base=new URL('./',(document.currentScript||document.querySelector('script[src*="versions.js"]')).src);
  const here=location.pathname.replace(/index\.html$/,'');

  const css=document.createElement('style');
  css.textContent=`
  #vbtn{position:fixed;z-index:20;top:calc(env(safe-area-inset-top) + 10px);right:calc(env(safe-area-inset-right) + 10px);
    width:44px;height:44px;border-radius:50%;border:1.5px solid #000;background:#fff;color:#000;
    font:600 20px/1 system-ui,-apple-system,sans-serif;display:grid;place-items:center;cursor:pointer;padding:0;opacity:.75}
  #vbtn:focus-visible{outline:2px solid #000;outline-offset:3px}
  #vmenu{position:fixed;inset:0;z-index:30;background:rgba(255,255,255,.96);color:#000;overflow:auto;
    font:15px/1.4 system-ui,-apple-system,sans-serif;touch-action:pan-y;
    padding:calc(env(safe-area-inset-top) + 24px) max(20px,env(safe-area-inset-right)) calc(env(safe-area-inset-bottom) + 24px) max(20px,env(safe-area-inset-left))}
  #vmenu[hidden]{display:none}
  #vmenu h2{margin:0 0 16px;font-size:22px}
  #vmenu a,#home-list a{display:block;text-decoration:none;color:#000;border:1.5px solid #000;border-radius:14px;padding:14px 16px;margin:0 0 10px;max-width:520px}
  #vmenu a b,#home-list a b{display:block;font-size:17px}
  #vmenu a span,#home-list a span{display:block;color:#444;font-size:14px;margin-top:2px}
  #vmenu a.cur{background:#000;color:#fff}#vmenu a.cur span{color:#ccc}
  #vclose{position:absolute;top:calc(env(safe-area-inset-top) + 10px);right:calc(env(safe-area-inset-right) + 10px);
    width:44px;height:44px;border:0;background:none;font:400 30px/1 system-ui,sans-serif;color:#000;cursor:pointer}`;
  document.head.appendChild(css);

  const btn=document.createElement('button');
  btn.id='vbtn';btn.type='button';btn.setAttribute('aria-label','All versions');btn.textContent='≡';
  const menu=document.createElement('div');menu.id='vmenu';menu.hidden=true;
  const close=document.createElement('button');close.id='vclose';close.type='button';close.setAttribute('aria-label','Close');close.textContent='×';
  const h=document.createElement('h2');h.textContent='All versions';
  const list=document.getElementById('home-list');   // the start page puts the list in the page itself
  if(!list)menu.append(close,h);
  const into=list||menu;
  if(!list){const a=document.createElement('a');a.href=base.href;const b=document.createElement('b');b.textContent='Start page';a.append(b);menu.append(a);}
  for(const v of VERSIONS){
    const url=new URL(v.path,base),a=document.createElement('a');a.href=url.href;
    if(url.pathname===here)a.className='cur';
    const b=document.createElement('b');b.textContent=v.name+(a.className?' (playing now)':'');
    const s=document.createElement('span');s.textContent=v.about;
    a.append(b,s);into.append(a);
  }
  if(list)return;
  // keep taps on the menu from reaching the game underneath
  for(const el of [btn,menu])for(const t of ['pointerdown','pointermove','pointerup'])el.addEventListener(t,e=>e.stopPropagation());
  btn.addEventListener('click',()=>{menu.hidden=false;});
  close.addEventListener('click',()=>{menu.hidden=true;});
  document.body.append(btn,menu);
})();
