import{a as E,S as q,i as l}from"./assets/vendor-ByFP6YU4.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const S="https://pixabay.com/api/";function A(){const e="58027947-74515a1791412e670f2e5f1b7".trim();if(!e)throw new Error("Missing VITE_PIXABAY_API_KEY");return e}async function f(e,r){return(await E.get(S,{params:{key:A(),q:e,page:r,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const g=document.querySelector(".gallery"),c=document.querySelector(".loader-wrapper"),u=document.querySelector(".load-more-wrapper"),M=new q(".gallery a",{captionsData:"alt",captionDelay:250});function h(e){const r=e.map(({webformatURL:a,largeImageURL:s,tags:t,likes:o,views:n,comments:w,downloads:b})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${a}"
          alt="${t}"
          loading="lazy"
          width="360"
          height="200"
        />
        <ul class="gallery-text">
          <li>
            <span>Likes</span>
            <p>${o}</p>
          </li>
          <li>
            <span>Views</span>
            <p>${n}</p>
          </li>
          <li>
            <span>Comments</span>
            <p>${w}</p>
          </li>
          <li>
            <span>Downloads</span>
            <p>${b}</p>
          </li>
        </ul>
      </a>
    </li>`).join("");g.insertAdjacentHTML("beforeend",r),M.refresh()}function P(){g.innerHTML=""}function y(){c.classList.remove("is-hidden"),c.setAttribute("aria-hidden","false")}function m(){c.classList.add("is-hidden"),c.setAttribute("aria-hidden","true")}function v(){u.classList.remove("is-hidden"),u.setAttribute("aria-hidden","false")}function d(){u.classList.add("is-hidden"),u.setAttribute("aria-hidden","true")}const B=15,R=document.querySelector(".form"),p=document.querySelector(".load-more-btn"),i={query:"",page:1};R.addEventListener("submit",_);p.addEventListener("click",$);function L(e,r){return e*B<r}async function _(e){e.preventDefault();const r=e.currentTarget.elements["search-text"].value.trim();if(r){i.query=r,i.page=1,P(),d(),y();try{const a=await f(i.query,i.page);if(!a.hits||a.hits.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(a.hits),L(i.page,a.totalHits)&&v()}catch{l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{m()}}}async function $(){y(),p.disabled=!0,i.page+=1;try{const e=await f(i.query,i.page);if(!e.hits||e.hits.length===0){d();return}h(e.hits),L(i.page,e.totalHits)||(d(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),x()}catch{i.page-=1,l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{p.disabled=!1,m()}}function x(){const e=document.querySelector(".gallery-item");if(!e)return;const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
