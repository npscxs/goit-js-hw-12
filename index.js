import{a as h,S as y,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const p of e.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const E="48447542-64438fdfaeeaa1a5314542701",v="https://pixabay.com/api/",L=15,f=async(r,i=1)=>{const s=`${v}?key=${E}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${L}&page=${i}`;try{return(await h.get(s)).data}catch(o){return console.error("Error fetching images:",o),{hits:[],totalHits:0}}};let c;const g=(r,i=!1)=>{const s=document.getElementById("gallery");if(i||(s.innerHTML=""),r.length===0){l.warning({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=r.map(e=>`
        <a href="${e.largeImageURL}" class="gallery-item">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
          <div class="gallery-info">
            <div class="gallery-info-item">
              <p class="info-item-title">Likes</p>
              <p>${e.likes}</p>
            </div>
            <div class="gallery-info-item">
              <p class="info-item-title">Views</p>
              <p>${e.views}</p>
            </div>
            <div class="gallery-info-item">
              <p class="info-item-title">Comments</p>
              <p>${e.comments}</p>
            </div>
            <div class="gallery-info-item">
              <p class="info-item-title">Downloads</p>
              <p>${e.downloads}</p>
            </div>
          </div>
        </a>`).join("");s.insertAdjacentHTML("beforeend",o),c?c.refresh():c=new y(".gallery-item",{});const{height:t}=s.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})};document.addEventListener("DOMContentLoaded",()=>{c=new y(".gallery-item",{})});const u=15;let a=1,d="";const b=document.getElementById("search-form"),m=document.getElementById("loader"),n=document.createElement("button");n.textContent="Load more";n.classList.add("btn-more");n.style.display="none";document.body.appendChild(n);b.addEventListener("submit",async r=>{if(r.preventDefault(),d=document.getElementById("search-input").value.trim(),a=1,d===""){l.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});return}const s=document.getElementById("gallery");s.innerHTML="",n.style.display="none",m.style.display="block";try{const o=await f(d,a);g(o.hits),o.totalHits>u&&(n.style.display="block")}catch(o){console.error("Error fetching images:",o),l.error({title:"Error",message:"Failed to fetch images.",position:"topRight"})}finally{m.style.display="none"}});n.addEventListener("click",async()=>{a+=1,m.style.display="block";try{const r=await f(d,a);g(r.hits,!0),a*u>=r.totalHits&&(n.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(r){console.error("Error fetching images:",r),l.error({title:"Error",message:"Failed to fetch images.",position:"topRight"})}finally{m.style.display="none"}});
//# sourceMappingURL=index.js.map
