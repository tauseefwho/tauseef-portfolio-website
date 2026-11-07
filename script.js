(function(){
var Q=function(s){return[].slice.call(document.querySelectorAll(s))};
var sleep=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
var still=matchMedia('(prefers-reduced-motion: reduce)').matches,items=Q('[data-b]');
var sc=document.getElementById('scene');
if(!still&&matchMedia('(pointer:fine)').matches)addEventListener('mousemove',function(e){
  var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
  sc.style.transform='perspective(1100px) rotateY('+x*8+'deg) rotateX('+(-y*6)+'deg)'});
if(still||!('IntersectionObserver' in window)){items.forEach(function(e){e.classList.add('on')});return}
var layer=document.createElement('div');layer.className='layer';document.body.appendChild(layer);
var ARROW='<svg width="20" height="20" viewBox="0 0 18 18"><path d="M2 1l13 7-6 1.8L6.5 16z" fill="currentColor" stroke="#fff" stroke-width="1.4"/></svg>';
var cs=[['Tauseef','#fff'],['Editor','#ffd23f'],['Dev','#f3f0e6']].map(function(p,i){
  var e=document.createElement('div');e.className='cur';
  e.innerHTML=ARROW+'<b style="background:'+p[1]+'">'+p[0]+'</b>';
  e.style.transform='translate('+(40+i*70)+'px,-40px)';layer.appendChild(e);return e});
async function build(item,i){
  await sleep(i*380);
  var r=item.getBoundingClientRect(),X=r.left+scrollX,Y=r.top+scrollY,c=cs[i%3];
  c.style.opacity=1;c.style.transform='translate('+(X+r.width-8)+'px,'+(Y+r.height-4)+'px)';
  await sleep(700);
  var b=document.createElement('div');b.className='sel';
  b.style.cssText='left:'+X+'px;top:'+Y+'px;width:'+r.width+'px;height:'+r.height+'px';
  b.innerHTML='<i></i><i></i><i></i><i></i>';layer.appendChild(b);
  await sleep(450);item.classList.add('on');await sleep(500);b.remove();
}
async function run(sec){
  await Promise.all(Q('[data-b]').filter(function(e){return sec.contains(e)}).map(build));
  await sleep(300);cs.forEach(function(c){c.style.opacity=0});
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);run(e.target)}})},{threshold:.2});
setTimeout(function(){Q('header,.stks,section').forEach(function(s){io.observe(s)})},300);
})();
