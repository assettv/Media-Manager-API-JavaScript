mediamanager="undefined"!=typeof mediamanager?mediamanager:{},function(e){var t={serialize:function(e){return Object.keys(e).reduce(function(t,n){var i=e[n],r=encodeURIComponent(n)+"="+encodeURIComponent(i);return t.push(r),t},[]).join("&")},templateReplace:function(e,t){return Object.keys(t).reduce(function(e,n){var i=t[n],r=RegExp("{\\s*"+n+"\\s*}","g");return e.replace(r,i)},e)},request:function(e,n,i){n=n||function(){},i=i||{},nanoajax.ajax({url:e+"?"+t.serialize(i),method:"GET"},function(e,t,i){var r=JSON.parse(t);return"undefined"!=typeof r.error?void console.error(r.error.message):void n(r,e,i)})},clone:function(e){var t=Object.getPrototypeOf(e),n=Object.create(t);return Object.keys(e).reduce(function(t,n){return t[n]=e[n],t},n)},extend:function(e,n){return Object.keys(n).reduce(function(e,t){return e[t]=n[t],e},t.clone(e))}},n={baseURL:"https://{shortname}.getmediamanager.com/api/v1/external",globalFilters:{},create:function(e){var t=Object.create(this);return t=Object.keys(e).reduce(function(t,n){var i=e[n];return t[n]=i,t},t),Object.freeze(t)},client:function(t){return t&&(e.sn=t),e.sn},embed:function(t,n){return"undefined"!=typeof e.embed?"undefined"!=typeof t?(e.embed(n),void ping(t,e.id)):void console.error("No templateID passed"):void console.error("Missing Media Manager smart embed!")}},i=n.create({getMostViewedVideos:function(e,n){if("undefined"==typeof e)return void console.error("Missing templateID");var i=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(i+"/template/"+e+"/videos/mostviewed",n)},getLatestVideos:function(e,n){if("undefined"==typeof e)return void console.error("Missing templateID");var i=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(i+"/template/"+e+"/videos/latest",n)},getVideo:function(e,n,i){if("undefined"==typeof n)return void console.error("Missing templateID");if("undefined"==typeof e)return void console.error("Missing videoID");var r=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(r+"/template/"+n+"/video/"+e,i)},searchVideos:function(e,n,i){if("undefined"==typeof e)return void console.error("Missing templateID");var r=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(r+"/template/"+e+"/video/search",i,{term:n})},getVideos:function(e,n){if("undefined"==typeof e)return void console.error("Missing templateID");var i=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(i+"/template/"+e+"/videos",n)},getAudios:function(e,n){if("undefined"==typeof e)return void console.error("Missing templateID");var i=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(i+"/template/"+e+"/audios",n)},recommendVideo:function(e,n,i){if("undefined"==typeof e)return void console.error("Missing templateID");if("undefined"==typeof n)return void console.error("Missing videoid");var r=t.templateReplace(this.baseURL,{shortname:this.client()});t.request(r+"/template/"+e+"/videos/recommend/"+n,i)}}),r=n.create({getVideos:function(e,n,i){if("undefined"==typeof n)return void console.error("Missing templateID");if("undefined"==typeof e)return void console.error("Missing playlistID");var r=t.templateReplace(this.baseURL,{shortname:this.client()}),o={templateID:n};t.request(r+"/playlist/"+e+"/videos",i,o)},getAudios:function(e,n,i){if("undefined"==typeof n)return void console.error("Missing templateID");if("undefined"==typeof e)return void console.error("Missing playlistID");var r=t.templateReplace(this.baseURL,{shortname:this.client()}),o={templateID:n};t.request(r+"/playlist/"+e+"/audios",i,o)},getAudio:function(e,n,i,r){if("undefined"==typeof n)return void console.error("Missing templateID");if("undefined"==typeof e)return void console.error("Missing playlistID");var o=t.templateReplace(this.baseURL,{shortname:this.client()}),s={templateID:n};t.request(o+"/playlist/"+e+"/audio/"+i,r,s)},getVideo:function(e,n,i,r){if("undefined"==typeof n)return void console.error("Missing templateID");if("undefined"==typeof e)return void console.error("Missing playlistID");var o=t.templateReplace(this.baseURL,{shortname:this.client()}),s={templateID:n};t.request(o+"/playlist/"+e+"/video/"+i,r,s)}});e.external=n.create({template:i,playlist:r,util:t})}(mediamanager);