import{a as w,S as L,i as m}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/";async function f({q:t="",key:r="44778676-049b64250b69e7d3e774d3724",image_type:s="photo",orientation:i="horizontal",safesearch:e=!0,page:o=1,per_page:l=15}){try{return(await w.get(v,{params:{q:t,key:r,image_type:s,orientation:i,safesearch:e,page:o,per_page:l}})).data}catch(c){throw c.response?new Error(`Error: ${c.response.status} - ${c.response.data}`):new Error(c.message)}}let C=new L(".gallery a",{captions:!0,captionType:"attr",captionPosition:"bottom",captionDelay:250,captionsData:"alt"});function p(t){if(t.length===0)return S();const r=t.map(({webformatURL:s,tags:i,likes:e,views:o,comments:l,downloads:c,largeImageURL:b})=>`<li class="gallery-item">
  <a class="gallery-link" href=${b} onclick="event.preventDefault()">
    <img
      class="gallery-image"
      src=${s}
      alt=${i} /></a>
      <div class="list-info">
      <ul class="info-items">
  <li class="item-info">
    <h3  class="item-title">Likes</h3>
    <p class="item-text">${e}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Views</h3>
    <p class="item-text">${o}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Comments</h3>
    <p class="item-text">${l}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Downloads</h3>
    <p class="item-text">${c}</p>
  </li>
</ul>
      </div>
</li>`).join("");h.insertAdjacentHTML("beforeend",r),C.refresh()}function S(){m.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"red",position:"topRight"})}const P=document.querySelector(".js-form"),d=document.querySelector(".js-loader"),n=document.querySelector(".js-loadmore"),g="is-hidden",h=document.querySelector(".gallery");P.addEventListener("submit",$);n.addEventListener("click",y);u(n);const a={q:"",page:1,per_page:15,max_Page:0};function q(){return m.show({message:"Please enter your request.",messageColor:"#fff",backgroundColor:"red",position:"topRight"})}function x(){m.show({message:"Something went wrong, please try again",messageColor:"#fff",backgroundColor:"red",position:"topRight"})}function E(){m.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"red",position:"topRight"})}async function $(t){t.preventDefault(),u(n),a.page=1,h.innerHTML="";const r=t.currentTarget;a.q=r.elements.search.value.toLowerCase().trim(),d.classList.add("loader");try{if(!a.q){r.reset(),q();return}const{hits:s,total:i}=await f(a);a.max_Page=Math.ceil(i/a.per_page),p(s),s.length>0&&a.page<a.max_Page?M(n):u(n)}catch(s){console.error(s)}finally{r.reset(),d.classList.remove("loader")}}function u(t){t.classList.add(g)}function M(t){t.classList.remove(g)}function O(t){t.disabled=!0}function _(t){t.disabled=!1}async function y(){a.page+=1,O(n),d.classList.add("loader");try{const{hits:t}=await f(a);p(t);const s=document.querySelector(".gallery-item").getBoundingClientRect().height;console.log(typeof(s*2)),window.scrollBy({top:s*2,behavior:"smooth"})}catch{x()}finally{_(n),d.classList.remove("loader"),a.page===a.max_Page&&(E(),n.removeEventListener("click",y))}}
//# sourceMappingURL=commonHelpers.js.map
