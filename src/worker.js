const ORIGIN='https://chandrimaudyan.com';
const errors=new Set(['/404','/404/','/404.html']);
async function errorPage(request,env){
 const url=new URL(request.url);
 let path='/404',response;
 // Assets may canonicalize an existing error file. Follow only its same-origin error URL,
 // then remove Location before returning a real error status and body.
 for(let i=0;i<3;i++){
  response=await env.ASSETS.fetch(new Request(new URL(path,url.origin),{method:'GET'}));
  if(![301,302,307,308].includes(response.status))break;
  const next=new URL(response.headers.get('Location')||path,url.origin);
  if(next.origin!==url.origin||!errors.has(next.pathname))break;
  path=next.pathname+next.search;
 }
 const headers=new Headers(response?.headers);headers.delete('Location');headers.delete('Content-Length');headers.delete('Content-Encoding');headers.set('X-Robots-Tag','noindex');headers.set('Cache-Control','no-store');headers.set('Content-Type','text/html; charset=utf-8');
 const body=response&&!([301,302,307,308].includes(response.status))?await response.text():'';
 return new Response(request.method==='HEAD'?null:body||'<!doctype html><title>404</title><h1>পাতাটি পাওয়া যায়নি</h1><a href="/">চন্দ্রিমা উদ্যান</a>',{status:404,headers});
}
export default{async fetch(request,env){
 const url=new URL(request.url);
 if(['chandrimaudyan.com','www.chandrimaudyan.com'].includes(url.hostname)&&(url.protocol==='http:'||url.hostname.startsWith('www.'))){const target=new URL(url);target.protocol='https:';target.hostname=new URL(ORIGIN).hostname;return Response.redirect(target.href,308);}
 if(errors.has(url.pathname))return errorPage(request,env);
 const response=await env.ASSETS.fetch(request);
 if(response.status===404)return errorPage(request,env);
 return request.method==='HEAD'?new Response(null,{status:response.status,statusText:response.statusText,headers:response.headers}):response;
}};
