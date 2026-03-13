;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="75d19f48-0ee6-50ac-3d88-06dac426097f")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,330287,e=>{"use strict";var t=e.i(242882),r=e.i(234745),s=e.i(10429),a=e.i(346691);async function o({projectRef:e},t){if(!e)throw Error("Project ref is required");let{data:s,error:a}=await (0,r.get)("/platform/projects/{ref}/load-balancers",{params:{path:{ref:e}},signal:t});return a&&(0,r.handleError)(a),s}e.s(["useLoadBalancersQuery",0,({projectRef:e},{enabled:r=!0,...n}={})=>(0,t.useQuery)({queryKey:a.replicaKeys.loadBalancers(e),queryFn:({signal:t})=>o({projectRef:e},t),enabled:r&&void 0!==e&&s.IS_PLATFORM,...n})])},532480,e=>{"use strict";let t=(0,e.i(388019).default)("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);e.s(["default",()=>t])},833655,e=>{"use strict";var t=e.i(532480);e.s(["Info",()=>t.default])},250503,76257,e=>{"use strict";let t=(0,e.i(388019).default)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["default",()=>t],76257),e.s(["Lock",()=>t],250503)},388034,e=>{"use strict";let t=(0,e.i(388019).default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["default",()=>t])},61187,e=>{"use strict";var t=e.i(388034);e.s(["RefreshCw",()=>t.default])},460988,e=>{"use strict";var t=e.i(156054);e.i(128328);var r=e.i(86086),s=e.i(884892),a=e.i(55956),o=e.i(784820),n=e.i(605031),i=e.i(389959),l=e.i(285006),c=e.i(993394);let d=e=>a.default.utc(Number(e)/1e3).toISOString(),u=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},p=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(r=>{let s=t?`${t}.${r}`:r;return"object"==typeof e[r]?p(e[r],s):[s]}),m=(e,t)=>{let r=Object.keys(t),s=c.SQL_FILTER_TEMPLATES[e],a=e=>{let r=s[e],a=(0,o.default)(t,e);if(void 0!==a&&"function"==typeof r)return r(a);if(void 0===r)if("string"==typeof a)return`${e} = '${a}'`;else return`${e} = ${a}`;return void 0===a&&"function"==typeof r?null:r&&!1===a?null:r},n=r.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let r=p(t[e],e).map(a).filter(Boolean);return r.length>0?`(${r.join(" or ")})`:null}{let t=a(e);return null===t?null:`(${t})`}}).filter(Boolean).join(" and ");return n?"where "+n:""},g=e=>{switch(e){case"edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return"cross join unnest(metadata) as metadata";case"function_edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return"cross join unnest(metadata) as m";default:return""}},h=r.IS_PLATFORM?"where ( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )":"where ( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )",f=e=>{let t=e.reduce((e,t)=>{let r=_(t);return e[r]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,r)=>t[e]>t[r]?e:r)},_=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function b(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function v(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function y(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let r=t?.payload?.[0];return r&&"HS256"===r.algorithm&&"supabase"===r.issuer&&["anon","service_role"].includes(r.role)&&!r.subject?r.role:"<unrecognized>"}function S(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`}function x(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let r=t?.payload?.[0];if(r&&r.role)return r.role}function E(e){return JSON.stringify(e,null,2)}function k(e){return e.map((e,t)=>{let r=[`## Log ${t+1}`];if(e.timestamp){let t,s=Number(e.timestamp);if(isFinite(s))t=new Date(s/1e3).toISOString();else if("string"==typeof e.timestamp){let r=new Date(e.timestamp);t=isNaN(r.getTime())?e.timestamp:r.toISOString()}else t=String(e.timestamp);r.push(`**Timestamp:** ${t}`)}e.event_message&&r.push(`**Message:** ${e.event_message}`);let{id:s,timestamp:a,event_message:o,...n}=e;return Object.keys(n).length>0&&r.push("","**Details:**","```json",JSON.stringify(n,null,2),"```"),r.join("\n")}).join("\n\n---\n\n")}let w={api:"API Gateway (Edge Network)",database:"Postgres Database",functions:"Edge Functions",fn_edge:"Edge Functions (edge runtime)",auth:"Auth",realtime:"Realtime",storage:"Storage",supavisor:"Supavisor (connection pooling)",postgrest:"PostgREST",pg_upgrade:"Postgres upgrade",pg_cron:"pg_cron",pgbouncer:"PgBouncer",etl:"ETL"},C={edge_logs:"API Gateway (Edge Network)",postgres_logs:"Postgres Database",function_logs:"Edge Functions",function_edge_logs:"Edge Functions (edge runtime)",auth_logs:"Auth",auth_audit_logs:"Auth (audit)",realtime_logs:"Realtime",storage_logs:"Storage",postgrest_logs:"PostgREST",supavisor_logs:"Supavisor (connection pooling)",pgbouncer_logs:"PgBouncer",pg_upgrade_logs:"Postgres upgrade",pg_cron_logs:"pg_cron",etl_replication_logs:"ETL"};function T(e,t,r){let s,a,o=(t?w[t]:null)??(r?(s=r.match(/\bfrom\s+(\w+)/i),(a=s?.[1])?C[a]??null:null):null),n=o?` from the **${o}** service`:"",i=r?`

**Query used:**
\`\`\`sql
${r.trim()}
\`\`\``:"";return`I have ${e.length} Supabase log entr${1===e.length?"y":"ies"}${n} I'd like help debugging:

`+k(e)+i+"\n\nWhat do these logs indicate? What steps can I take to resolve it? Keep your answer very concise and actionable. Max 2 or 3 bullet points."}e.s(["apiKey",()=>S,"buildLogsPrompt",()=>T,"checkForILIKEClause",()=>v,"checkForWithClause",()=>b,"fillTimeseries",0,(e,t,r,s,o,n,i=20,l)=>{let c;if(0===e.length&&!(o&&n))return[];if(e.length>i)return e.map(e=>{let r=e[t],s=u(r)?d(r):a.default.utc(r).toISOString();return e[t]=s,e});if(e.length<=1&&!(o&&n))return e;let p=e.map(e=>a.default.utc(e[t])),m=n?a.default.utc(n):a.default.utc(Math.max.apply(null,p)),g=o?a.default.utc(o):a.default.utc(Math.min.apply(null,p)),h=e.length>0?p:[g,m],_=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(_=parseInt(e[1],10),c=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):c=f(h)}else c=f(h);0!==e.length||l||(c="minute");let b=e.map(e=>{let s=e[t],o=u(s)?d(s):a.default.utc(s).toISOString();return Array.isArray(r)&&0===r.length?{[t]:o}:(e[t]=o,e)}),v=g;for(;v.isBefore(m)||v.isSame(m);){if(!p.find(e=>e.year()===v.year()&&e.month()===v.month()&&e.date()===v.date()&&e.hour()===v.hour()&&e.minute()===v.minute()&&e.second()===v.second())){let e=("string"==typeof r?[r]:r).reduce((e,t)=>({...e,[t]:s}),{});b.push({[t]:v.toISOString(),...e})}v=v.add(_,c)}return b},"formatLogsAsJson",()=>E,"formatLogsAsMarkdown",()=>k,"genChartQuery",0,(e,t,r)=>{let s,o,n,i,l,d,[u,p]=(s=t.iso_timestamp_end?(0,a.default)(t.iso_timestamp_end):(0,a.default)(),o=t.iso_timestamp_start?(0,a.default)(t.iso_timestamp_start):(0,a.default)(),n="minute",i=360,l=s.diff(o,"minute"),d=s.diff(o,"hour"),l>720?(n="hour",i=120):d>72&&(n="day",i=7),[o.add(-i,n),n]),f=m(e,r),_=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 500";case"postgres_logs":case"pg_cron_logs":return"parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')";case"auth_logs":return"metadata.level = 'error' OR SAFE_CAST(metadata.status AS INT64) >= 400";case"function_logs":return"metadata.level IN ('error', 'fatal')";default:return"false"}}(e),b=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 400 AND response.status_code < 500";case"postgres_logs":return"parsed.error_severity IN ('WARNING')";case"auth_logs":return"metadata.level = 'warning'";case"function_logs":return"metadata.level IN ('warning')";default:return"false"}}(e);e===c.LogsTableName.PG_CRON&&(e=c.LogsTableName.POSTGRES,f=h);let v=g(e);return`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${p}) as timestamp,
  count(CASE WHEN NOT (${_} OR ${b}) THEN 1 END) as ok_count,
  count(CASE WHEN ${_} THEN 1 END) as error_count,
  count(CASE WHEN ${b} THEN 1 END) as warning_count,
FROM
  ${e} t
  ${v}
  ${f?f+` and t.timestamp > '${u.toISOString()}'`:`where t.timestamp > '${u.toISOString()}'`}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let r=m(e,t);e===c.LogsTableName.PG_CRON&&(e=c.LogsTableName.POSTGRES,r=h);let s=g(e);return`SELECT count(*) as count FROM ${e} ${s} ${r}`},"genDefaultQuery",0,(e,t,s=100)=>{let a=m(e,t),o=g(e),n="order by timestamp desc";switch(e){case"edge_logs":if(!r.IS_PLATFORM)return`
-- local dev edge_logs query
select id, edge_logs.timestamp, event_message, request.method, request.path, request.search, response.status_code
from edge_logs
${o}
${a}
${n}
limit ${s};
`;return`select id, identifier, timestamp, event_message, request.method, request.path, request.search, response.status_code
  from ${e}
  ${o}
  ${a}
  ${n}
  limit ${s}
  `;case"postgres_logs":if(!r.IS_PLATFORM)return`
select postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint
from postgres_logs
${o}
${a}
${n}
limit ${s}
  `;return`select identifier, postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint from ${e}
  ${o}
  ${a}
  ${n}
  limit ${s}
  `;case"function_logs":return`select id, ${e}.timestamp, event_message, metadata.event_type, metadata.function_id, metadata.level from ${e}
  ${o}
  ${a}
  ${n}
  limit ${s}
    `;case"auth_logs":return`select id, ${e}.timestamp, event_message, metadata.level, metadata.status, metadata.path, metadata.msg as msg, metadata.error from ${e}
  ${o}
  ${a}
  ${n}
  limit ${s}
    `;case"function_edge_logs":if(!r.IS_PLATFORM)return`
select id, function_edge_logs.timestamp, event_message
from function_edge_logs
${n}
limit ${s}
`;return`select id, ${e}.timestamp, event_message, response.status_code, request.method, m.function_id, m.execution_time_ms, m.deployment_id, m.version from ${e}
  ${o}
  ${a}
  ${n}
  limit ${s}
  `;case"supavisor_logs":return`select id, ${e}.timestamp, event_message from ${e} ${o} ${a} ${n} limit ${s}`;case"pg_upgrade_logs":return`select id, ${e}.timestamp, event_message from ${e} ${o} ${a} ${n} limit 100`;default:return`select id, ${e}.timestamp, event_message from ${e}
  ${a}
  ${n}
  limit ${s}
  `;case"pg_cron_logs":let i=a?`${h} AND ${a.substring(6)}`:h;return`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${o}
${i}
${n}
limit ${s}
`}},"genSingleLogQuery",0,(e,t)=>`select id, timestamp, event_message, metadata from ${e} where id = '${t}' limit 1`,"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,u,"jwtAPIKey",()=>y,"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,a.default)().diff((0,a.default)(e),"day"))>t,"role",()=>x,"unixMicroToIsoTimestamp",0,d,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,i.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,r,a){let o=new s.default(t,r.column-2,r.lineNumber-1);if(o.isNextDQuote())return{suggestions:[]};let i=[],c=l.default.schemas.filter(e=>o._text.includes(e.reference));if(0===c.length&&(c=l.default.schemas),o.isNextPeriod()){let t=c.flatMap(e=>e.fields).flatMap(e=>{let[t,...r]=e.path.split(".");return r}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=i.concat(t)}if("`"===a.triggerCharacter||" "===a.triggerCharacter){let t=l.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),r=c.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=(i=i.concat(r)).concat(t)}return{suggestions:(0,n.default)(i,"label")}}});return()=>{t.dispose()}}},[e])}])},993394,e=>{"use strict";var t,r=e.i(55956),s=e.i(10429);e.i(128328);var a=e.i(86086);let o=`${s.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,n=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
  p.user_name,
  count(*) as count
from postgres_logs
  left join unnest(metadata) as m on true
  left join unnest(m.parsed) as p on true
where
  regexp_contains(event_message, 'COMMIT')
group by
  p.user_name
  `,for:["database"]},{label:"Metadata IP",description:"List all IP addresses that used the Supabase API",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  h.x_real_ip
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.headers) as h on true
where h.x_real_ip is not null
`,for:["api"]},{label:"Requests by Geography",description:"List all ISO 3166-1 alpha-2 country codes that used the Supabase API",mode:"custom",searchString:`select
  cf.country,
  count(*) as count
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.cf) as cf on true
group by
  cf.country
order by
  count desc
`,for:["api"]},{label:"Slow Response Time",mode:"custom",description:"List all Supabase API requests that are slow",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.origin_time
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.origin_time > 1000
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"500 Request Codes",description:"List all Supabase API requests that responded witha 5XX status code",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.status_code
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.status_code >= 500
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Top Paths",description:"List the most requested Supabase API paths",mode:"custom",searchString:`select
  r.path as path,
  r.search as params,
  count(timestamp) as c
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
group by
  path,
  params
order by
  c desc
limit 100
`,for:["api"]},{label:"REST Requests",description:"List all PostgREST requests",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
where
  path like '%rest/v1%'
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Errors",description:"List all Postgres error messages with ERROR, FATAL, or PANIC severity",mode:"custom",searchString:`select
  cast(t.timestamp as datetime) as timestamp,
  p.error_severity,
  event_message
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
order by
  timestamp desc
limit 100
`,for:["database"]},{label:"Error Count by User",description:"Count of errors by users",mode:"custom",searchString:`select
  count(t.timestamp) as count,
  p.user_name,
  p.error_severity
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
group by
  p.user_name,
  p.error_severity
order by
  count desc
limit 100
`,for:["database"]},{label:"Auth Endpoint Events",description:"Endpoint events filtered by path",mode:"custom",searchString:`select
  t.timestamp,
  event_message
from auth_logs as t
where
  regexp_contains(event_message,"level.{3}(info|warning||error|fatal)")
  -- and regexp_contains(event_message,"path.{3}(/token|/recover|/signup|/otp)")
limit 100
`,for:["database"]},{label:"Auth Audit Logs",description:"Audit logs for auth events",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message, metadata 
from auth_audit_logs 
limit 10
`,for:["database"]},{label:"Storage Object Requests",description:"Number of requests done on Storage Objects",mode:"custom",searchString:`select
  r.method as http_verb,
  r.path as filepath,
  count(*) as num_requests
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) AS r
  cross join unnest(r.headers) AS h
where
  path like '%storage/v1/object/%'
group by
  r.path, r.method
order by
  num_requests desc
limit 100
`,for:["api"]},{label:"Storage Egress Requests",description:"Check the number of requests done on Storage Affecting Egress",mode:"custom",searchString:`select
  request.method as http_verb,
  request.path as filepath,
  (responseHeaders.cf_cache_status = 'HIT') as cached,
  count(*) as num_requests
from
  edge_logs
  cross join unnest(metadata) as metadata
  cross join unnest(metadata.request) as request
  cross join unnest(metadata.response) as response
  cross join unnest(response.headers) as responseHeaders
where
  (path like '%storage/v1/object/%' or path like '%storage/v1/render/%')
  and request.method = 'GET'
group by 1, 2, 3
order by num_requests desc
limit 100;
`,for:["api"]},{label:"Storage Top Cache Misses",description:"The top Storage requests that miss caching",mode:"custom",searchString:`select
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
group by path, search
order by count desc
limit 100;
`,for:["api"]}],i={search_query:e=>`regexp_contains(event_message, '${e}')`},l={postgres_logs:{...i,database:e=>`identifier = '${e}'`,"severity.error":"parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')","severity.noError":"parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')","severity.log":"parsed.error_severity = 'LOG'"},edge_logs:{...i,database:e=>`identifier = '${e}'`,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499","product.database":"request.path like '/rest/%' or request.path like '/graphql/%'","product.storage":"request.path like '/storage/%'","product.auth":"request.path like '/auth/%'","product.realtime":"request.path like '/realtime/%'","method.get":"request.method = 'GET'","method.post":"request.method = 'POST'","method.put":"request.method = 'PUT'","method.patch":"request.method = 'PATCH'","method.delete":"request.method = 'DELETE'","method.options":"request.method = 'OPTIONS'"},function_edge_logs:{...i,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499"},function_logs:{...i,"severity.error":"metadata.level = 'error'","severity.notError":"metadata.level != 'error'","severity.log":"metadata.level = 'log'","severity.info":"metadata.level = 'info'","severity.debug":"metadata.level = 'debug'","severity.warn":"metadata.level = 'warn'"},auth_logs:{...i,"severity.error":"metadata.level = 'error' or metadata.level = 'fatal'","severity.warning":"metadata.level = 'warning'","severity.info":"metadata.level = 'info'","status_code.server_error":"cast(metadata.status as int64) between 500 and 599","status_code.client_error":"cast(metadata.status as int64) between 400 and 499","status_code.redirection":"cast(metadata.status as int64) between 300 and 399","status_code.success":"cast(metadata.status as int64) between 200 and 299","endpoints.admin":'REGEXP_CONTAINS(metadata.path, "/admin")',"endpoints.signup":'REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")',"endpoints.authentication":'REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")',"endpoints.recover":'REGEXP_CONTAINS(metadata.path, "/recover")',"endpoints.user":'REGEXP_CONTAINS(metadata.path, "/user")',"endpoints.logout":'REGEXP_CONTAINS(metadata.path, "/logout")'},realtime_logs:{...i},storage_logs:{...i},postgrest_logs:{...i,database:e=>`identifier = '${e}'`},pgbouncer_logs:{...i},supavisor_logs:{...i,database:e=>`m.project like '${e}%'`},pg_upgrade_logs:{...i},pg_cron_logs:{...i},etl_replication_logs:{...i,pipeline_id:e=>`pipeline_id = ${e}`}};var c=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t);let d={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...a.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},u=[{text:"Last 15 minutes",calcFrom:()=>(0,r.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,r.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,r.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,r.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,r.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],p=[{text:"Last hour",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,r.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,r.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["EXPLORER_DATEPICKER_HELPERS",0,p,"FILTER_OPTIONS",0,d,"LOGS_EXPLORER_DOCS_URL",0,o,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>c,"PREVIEWER_DATEPICKER_HELPERS",0,u,"SQL_FILTER_TEMPLATES",0,l,"TEMPLATES",0,n,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0]])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,r){this.model=e,this.offset=t,this.lineNumber=r,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[r]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,r=0,s=0;for(;this.hasNext();){let a=this.next();switch(a){case 40:if(--e<0)return s;break;case 41:e++;break;case 123:r--;break;case 125:r++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&a!==this.next(););break;case 44:!e&&!t&&!r&&s++}}return -1}readIdent(){let e=!1,t=!1,r="";for(;this.hasNext();){let s=this.peekNext();if(e&&!t&&!this._isIdentPart(s))break;if(s=this.next(),!e&&t&&34===s){e=!0;continue}if(e||32!==s&&9!==s&&10!=s){if(!e&&(34===s||this._isIdentPart(s)))e=!0,t=34===s,r=String.fromCharCode(s)+r;else if(e)if(t){if(0===s||(r=String.fromCharCode(s)+r,34===s))break}else r=String.fromCharCode(s)+r}}return r}readIdents(e){let t=[];for(;e>0;){e--;let r=this.readIdent();if(!r||(t.push(r),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},30772,e=>{"use strict";var t=e.i(948610),r=e.i(151675),s=e.i(214765),a=e.i(941327),o=e.i(451711),n=(0,t.generateCategoricalChart)({chartName:"BarChart",GraphicalChild:r.Bar,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:s.XAxis},{axisType:"yAxis",AxisComp:a.YAxis}],formatAxisMap:o.formatAxisMap});e.s(["BarChart",()=>n])},520124,e=>{"use strict";var t=e.i(460988),r=e.i(389959);e.s(["useFillTimeseriesSorted",0,e=>{let{data:s,timestampKey:a,valueKey:o,defaultValue:n,startDate:i,endDate:l,minPointsToFill:c=20,interval:d}=e;return(0,r.useMemo)(()=>{var e;if(!s[0]?.[a])return{data:s,error:null,isError:!1};try{return{data:(e=(0,t.fillTimeseries)(s,a,o,n,i,l,c,d),[...e].sort((e,t)=>new Date(e[a]).getTime()-new Date(t[a]).getTime())),error:null,isError:!1}}catch(e){return{data:[],error:e instanceof Error?e:Error(String(e)),isError:!0}}},[JSON.stringify(s),a,JSON.stringify(o),n,i,l,c,d])}])},462273,e=>{"use strict";var t=e.i(478902),r=e.i(389959),s=e.i(751883),a=e.i(625198),o=e.i(831266),n=e.i(843778);let i={light:"",dark:".dark"},l=r.createContext(null);function c(){let e=r.useContext(l);if(!e)throw Error("useChart must be used within a <ChartContainer />");return e}let d=r.forwardRef(({id:e,className:a,children:o,config:i={},...c},d)=>{let p=r.useId(),m=`chart-${e||p.replace(/:/g,"")}`;return(0,t.jsx)(l.Provider,{value:{config:i},children:(0,t.jsxs)("div",{"data-chart":m,ref:d,className:(0,n.cn)("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-foreground-muted [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",a),...c,children:[(0,t.jsx)(u,{id:m,config:i}),(0,t.jsx)(s.ResponsiveContainer,{children:o})]})})});d.displayName="Chart";let u=({id:e,config:r})=>{let s=Object.entries(r).filter(([e,t])=>t.theme||t.color);return s.length?(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:Object.entries(i).map(([t,r])=>`
${r} [data-chart=${e}] {
${s.map(([e,r])=>{let s=r.theme?.[t]||r.color;return s?`  --color-${e}: ${s};`:null}).join("\n")}
}
`).join("\n")}}):null},p=a.Tooltip,m=r.forwardRef(({active:e,payload:s,className:a,indicator:o="dot",hideLabel:i=!1,hideIndicator:l=!1,label:d,labelFormatter:u,labelSuffix:p,labelClassName:m,formatter:g,color:h,nameKey:_,labelKey:b},v)=>{let{config:y}=c(),S=r.useMemo(()=>{if(i||!s?.length)return null;let[e]=s,r=`${b||e.dataKey||e.name||"value"}`,a=f(y,e,r),o=b||"string"!=typeof d?a?.label:y[d]?.label||d;return u?(0,t.jsx)("div",{className:(0,n.cn)("font-medium",m),children:u(o,s)}):o?(0,t.jsx)("div",{className:(0,n.cn)("font-medium",m),children:o}):null},[d,u,s,i,m,y,b]);if(!e||!s?.length)return null;let x=1===s.length&&"dot"!==o;return(0,t.jsxs)("div",{ref:v,className:(0,n.cn)("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg px-2.5 py-1.5 text-xs shadow-xl",a),children:[x?null:S,(0,t.jsx)("div",{className:"grid gap-1.5",children:s.map((e,r)=>{let s=`${_||e.name||e.dataKey||"value"}`,a=f(y,e,s),i=h||e.payload.fill||e.color;return(0,t.jsx)("div",{className:(0,n.cn)("flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-foreground-muted","dot"===o&&"items-center"),children:g&&e?.value!==void 0&&e.name?g(e.value,e.name,e,r,e.payload):(0,t.jsxs)(t.Fragment,{children:[a?.icon?(0,t.jsx)(a.icon,{}):!l&&(0,t.jsx)("div",{className:(0,n.cn)("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",{"h-2.5 w-2.5":"dot"===o,"w-1":"line"===o,"w-0 border-[1.5px] border-dashed bg-transparent":"dashed"===o,"my-0.5":x&&"dashed"===o}),style:{"--color-bg":i,"--color-border":i}}),(0,t.jsxs)("div",{className:(0,n.cn)("flex flex-1 justify-between leading-none",x?"items-end":"items-center"),children:[(0,t.jsxs)("div",{className:"grid gap-1.5",children:[x?S:null,(0,t.jsx)("span",{className:"text-foreground-light",children:a?.label||e.name})]}),e.value&&(0,t.jsxs)("span",{className:"font-mono font-medium tabular-nums text-foreground",children:[e.value.toLocaleString(),p]})]})]})},e.dataKey)})})]})});m.displayName="ChartTooltip";let g=o.Legend,h=r.forwardRef(({className:e,hideIcon:r=!1,payload:s,verticalAlign:a="bottom",nameKey:o},i)=>{let{config:l}=c();return s?.length?(0,t.jsx)("div",{ref:i,className:(0,n.cn)("flex items-center justify-center gap-4","top"===a?"pb-3":"pt-3",e),children:s.map(e=>{let s=`${o||e.dataKey||"value"}`,a=f(l,e,s);return(0,t.jsxs)("div",{className:(0,n.cn)("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-foreground-muted"),children:[a?.icon&&!r?(0,t.jsx)(a.icon,{}):(0,t.jsx)("div",{className:"h-2 w-2 shrink-0 rounded-[2px]",style:{backgroundColor:e.color}}),a?.label]},e.value)})}):null});function f(e,t,r){if("object"!=typeof t||null===t)return;let s="payload"in t&&"object"==typeof t.payload&&null!==t.payload?t.payload:void 0,a=r;return r in t&&"string"==typeof t[r]?a=t[r]:s&&r in s&&"string"==typeof s[r]&&(a=s[r]),a in e?e[a]:e[r]}h.displayName="ChartLegend",e.s(["ChartContainer",()=>d,"ChartLegend",()=>g,"ChartLegendContent",()=>h,"ChartStyle",()=>u,"ChartTooltip",()=>p,"ChartTooltipContent",()=>m])},238921,e=>{"use strict";var t=e.i(478902),r=e.i(55956),s=e.i(389959),a=e.i(151675),o=e.i(942032),n=e.i(30772),i=e.i(214765),l=e.i(941327),c=e.i(462273),d=e.i(843778);let u="hsl(var(--background-overlay-hover))",p="hsl(var(--brand-default))",m="hsl(var(--destructive-default))",g="hsl(var(--warning-default))";e.s(["LogsBarChart",0,({data:e,onBarClick:h,EmptyState:f,DateTimeFormat:_="MMM D, YYYY, hh:mma",isFullHeight:b=!1,chartConfig:v,hideZeroValues:y=!1})=>{let[S,x]=(0,s.useState)(null);if(0===e.length)return f||null;let E=(0,r.default)(e[0].timestamp).format(_),k=(0,r.default)(e[e?.length-1]?.timestamp).format(_);return(0,t.jsxs)("div",{"data-testid":"logs-bar-chart",className:(0,d.cn)("flex flex-col gap-y-3",b?"h-full":"h-24"),children:[(0,t.jsx)(c.ChartContainer,{className:"h-full",config:v??{error_count:{label:"Errors"},ok_count:{label:"Ok"},warning_count:{label:"Warnings"}},children:(0,t.jsxs)(n.BarChart,{data:e,onMouseMove:e=>{e.activeTooltipIndex!==S&&x(e.activeTooltipIndex)},onMouseLeave:()=>x(null),onClick:e=>{let t=e?.activePayload?.[0]?.payload;h&&h(t,e)},children:[(0,t.jsx)(l.YAxis,{tick:!1,width:0,axisLine:{stroke:u},tickLine:{stroke:u}}),(0,t.jsx)(i.XAxis,{dataKey:"timestamp",interval:e.length-2,tick:!1,axisLine:{stroke:u},tickLine:{stroke:u}}),(0,t.jsx)(c.ChartTooltip,{animationDuration:0,position:{y:16},content:e=>{if(!e.active||!e.payload||0===e.payload.length)return null;let s=y?e.payload.filter(e=>0!==Number(e.value)):e.payload;return 0===s.length?null:(0,t.jsx)(c.ChartTooltipContent,{active:e.active,payload:s,label:e.label,className:"text-foreground-light -mt-5 !transition-none",labelFormatter:e=>(0,r.default)(e).format(_)})}}),(0,t.jsx)(a.Bar,{dataKey:"error_count",fill:m,maxBarSize:24,stackId:"stack",children:e?.map((e,r)=>(0,t.jsx)(o.Cell,{className:"cursor-pointer transition-colors",fill:S===r||null===S?m:"hsl(var(--destructive-500))"},`error-${r}`))}),(0,t.jsx)(a.Bar,{dataKey:"warning_count",fill:g,maxBarSize:24,stackId:"stack",children:e?.map((e,r)=>(0,t.jsx)(o.Cell,{className:"cursor-pointer transition-colors",fill:S===r||null===S?g:"hsl(var(--warning-500))"},`warning-${r}`))}),(0,t.jsx)(a.Bar,{dataKey:"ok_count",fill:p,maxBarSize:24,stackId:"stack",children:e?.map((e,r)=>(0,t.jsx)(o.Cell,{className:"cursor-pointer transition-colors",fill:S===r||null===S?p:"hsl(var(--brand-500))"},`success-${r}`))})]})}),e&&(0,t.jsxs)("div",{className:"text-foreground-lighter -mt-10 flex items-center justify-between text-[10px] font-mono",children:[(0,t.jsx)("span",{children:E}),(0,t.jsx)("span",{children:k})]})]})}])},543851,e=>{"use strict";let t=(0,e.i(388019).default)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);e.s(["Eye",()=>t],543851)},237002,e=>{"use strict";var t=e.i(478902),r=e.i(459323),s=e.i(389959),a=e.i(639786),o=e.i(837491),n=e.i(515689),i=e.i(871115),l=e.i(801574),c=e.i(298032),d=e.i(43341),u=e.i(57352);let p="Checkbox",[m,g]=(0,o.createContextScope)(p),[h,f]=m(p),_=(0,s.forwardRef)((e,t)=>{let{__scopeCheckbox:o,name:l,checked:c,defaultChecked:d,required:p,disabled:m,value:g="on",onCheckedChange:f,..._}=e,[b,x]=(0,s.useState)(null),E=(0,a.useComposedRefs)(t,e=>x(e)),k=(0,s.useRef)(!1),w=!b||!!b.closest("form"),[C=!1,T]=(0,i.useControllableState)({prop:c,defaultProp:d,onChange:f}),j=(0,s.useRef)(C);return(0,s.useEffect)(()=>{let e=null==b?void 0:b.form;if(e){let t=()=>T(j.current);return e.addEventListener("reset",t),()=>e.removeEventListener("reset",t)}},[b,T]),(0,s.createElement)(h,{scope:o,state:C,disabled:m},(0,s.createElement)(u.Primitive.button,(0,r.default)({type:"button",role:"checkbox","aria-checked":y(C)?"mixed":C,"aria-required":p,"data-state":S(C),"data-disabled":m?"":void 0,disabled:m,value:g},_,{ref:E,onKeyDown:(0,n.composeEventHandlers)(e.onKeyDown,e=>{"Enter"===e.key&&e.preventDefault()}),onClick:(0,n.composeEventHandlers)(e.onClick,e=>{T(e=>!!y(e)||!e),w&&(k.current=e.isPropagationStopped(),k.current||e.stopPropagation())})})),w&&(0,s.createElement)(v,{control:b,bubbles:!k.current,name:l,value:g,checked:C,required:p,disabled:m,style:{transform:"translateX(-100%)"}}))}),b=(0,s.forwardRef)((e,t)=>{let{__scopeCheckbox:a,forceMount:o,...n}=e,i=f("CheckboxIndicator",a);return(0,s.createElement)(d.Presence,{present:o||y(i.state)||!0===i.state},(0,s.createElement)(u.Primitive.span,(0,r.default)({"data-state":S(i.state),"data-disabled":i.disabled?"":void 0},n,{ref:t,style:{pointerEvents:"none",...e.style}})))}),v=e=>{let{control:t,checked:a,bubbles:o=!0,...n}=e,i=(0,s.useRef)(null),d=(0,l.usePrevious)(a),u=(0,c.useSize)(t);return(0,s.useEffect)(()=>{let e=i.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(d!==a&&t){let r=new Event("click",{bubbles:o});e.indeterminate=y(a),t.call(e,!y(a)&&a),e.dispatchEvent(r)}},[d,a,o]),(0,s.createElement)("input",(0,r.default)({type:"checkbox","aria-hidden":!0,defaultChecked:!y(a)&&a},n,{tabIndex:-1,ref:i,style:{...e.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function y(e){return"indeterminate"===e}function S(e){return y(e)?"indeterminate":e?"checked":"unchecked"}var x=e.i(370410),E=e.i(843778);let k=s.forwardRef(({className:e,...r},s)=>(0,t.jsx)(_,{ref:s,className:(0,E.cn)("peer flex items-center justify-center h-4 w-4 shrink-0 rounded border border-control bg-control/25 ring-offset-background","transition-colors duration-150 ease-in-out","hover:border-strong","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2","disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=checked]:text-background",e),...r,children:(0,t.jsx)(b,{className:(0,E.cn)("flex items-center justify-center text-current"),children:(0,t.jsx)(x.Check,{className:"h-3 w-3 text-background",strokeWidth:4})})}));k.displayName=_.displayName,e.s(["Checkbox",()=>k],237002)},34411,e=>{"use strict";var t=e.i(237002);e.s(["Checkbox_Shadcn_",()=>t.Checkbox])},867987,e=>{"use strict";var t=e.i(478902);e.i(481541);var r=e.i(337394),r=r,s=e.i(102220),s=s,a=e.i(967052),o=e.i(370410),n=e.i(88816),i=e.i(816467),l=e.i(389959),c=e.i(602089),d=e.i(837710),u=e.i(843778),p=e.i(375761),m=e.i(874311),g=e.i(613580);let h=[{label:"Ask ChatGPT",url:"https://chatgpt.com/",promptParam:"q",icon:r.default},{label:"Ask Claude",url:"https://claude.ai/new",promptParam:"q",icon:s.default}];function f({buildPrompt:e,label:r,iconOnly:s=!1,onOpenAssistant:f,telemetrySource:_,size:b="tiny",type:v="default",disabled:y=!1,loading:S=!1,className:x,tooltip:E,copyLabel:k="Copy prompt",showExternalAI:w=!1,extraDropdownItems:C,additionalDropdownItems:T}){let j=(0,a.useTrack)(),[N,P]=(0,l.useState)(!1),[R,I]=(0,l.useState)(!1);(0,l.useEffect)(()=>{if(!N)return;let e=setTimeout(()=>P(!1),2e3);return()=>clearTimeout(e)},[N]);let A=(0,t.jsxs)("div",{className:(0,u.cn)("flex items-center","gap-0"),children:[(0,t.jsx)(d.Button,{type:v,size:b,disabled:y,onClick:()=>{f()},icon:(0,t.jsx)(c.AiIconAnimation,{size:s?16:14,loading:S}),className:(0,u.cn)("rounded-r-none border-r-0",s&&"px-1.5",x),children:!s&&r}),(0,t.jsxs)(m.DropdownMenu,{open:R,onOpenChange:I,children:[(0,t.jsx)(m.DropdownMenuTrigger,{asChild:!0,children:(0,t.jsx)(d.Button,{type:v,size:b,disabled:y,className:(0,u.cn)("rounded-l-none px-1",s&&"px-1"),icon:(0,t.jsx)(n.ChevronDown,{size:12})})}),(0,t.jsxs)(m.DropdownMenuContent,{align:"end",className:"w-44",children:[C,(0,t.jsxs)(m.DropdownMenuItem,{onClick:()=>{let t=e();(0,p.copyToClipboard)(t),P(!0),I(!1),_&&j("ai_prompt_copied",{source:_})},className:"gap-2",children:[N?(0,t.jsx)(o.Check,{size:14,className:"text-brand"}):(0,t.jsx)(i.Copy,{size:14}),N?"Copied!":k]}),w&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m.DropdownMenuSeparator,{}),h.map(r=>(0,t.jsxs)(m.DropdownMenuItem,{className:"gap-2",onClick:()=>{let t;return t=e(),void window.open(`${r.url}?${r.promptParam}=${encodeURIComponent(t)}`,"_blank","noreferrer")},children:[(0,t.jsx)(r.icon,{size:14}),r.label]},r.url))]}),T&&T.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m.DropdownMenuSeparator,{}),T.map((e,r)=>(0,t.jsxs)(m.DropdownMenuItem,{onClick:e.onClick,className:"gap-2",children:[e.icon,e.label]},r))]})]})]})]});return s&&E?(0,t.jsxs)(g.Tooltip,{children:[(0,t.jsx)(g.TooltipTrigger,{asChild:!0,children:(0,t.jsx)("div",{className:"inline-flex",children:A})}),(0,t.jsx)(g.TooltipContent,{side:"bottom",children:E})]}):A}e.s(["AiAssistantDropdown",()=>f],867987)},71049,e=>{"use strict";var t,r=e.i(478902),s=e.i(389959),a=e.i(174617),o=e.i(274664),n=e.i(826524),i=e.i(678001),l=e.i(940051),c=e.i(839518),d=e.i(889251),u=e.i(546595),p=e.i(735343),m="HoverCard",[g,h]=(0,o.createContextScope)(m,[l.createPopperScope]),f=(0,l.createPopperScope)(),[_,b]=g(m),v=e=>{let{__scopeHoverCard:t,children:a,open:o,defaultOpen:i,onOpenChange:c,openDelay:d=700,closeDelay:u=300}=e,p=f(t),g=s.useRef(0),h=s.useRef(0),b=s.useRef(!1),v=s.useRef(!1),[y,S]=(0,n.useControllableState)({prop:o,defaultProp:i??!1,onChange:c,caller:m}),x=s.useCallback(()=>{clearTimeout(h.current),g.current=window.setTimeout(()=>S(!0),d)},[d,S]),E=s.useCallback(()=>{clearTimeout(g.current),b.current||v.current||(h.current=window.setTimeout(()=>S(!1),u))},[u,S]),k=s.useCallback(()=>S(!1),[S]);return s.useEffect(()=>()=>{clearTimeout(g.current),clearTimeout(h.current)},[]),(0,r.jsx)(_,{scope:t,open:y,onOpenChange:S,onOpen:x,onClose:E,onDismiss:k,hasSelectionRef:b,isPointerDownOnContentRef:v,children:(0,r.jsx)(l.Root,{...p,children:a})})};v.displayName=m;var y="HoverCardTrigger",S=s.forwardRef((e,t)=>{let{__scopeHoverCard:s,...o}=e,n=b(y,s),i=f(s);return(0,r.jsx)(l.Anchor,{asChild:!0,...i,children:(0,r.jsx)(u.Primitive.a,{"data-state":n.open?"open":"closed",...o,ref:t,onPointerEnter:(0,a.composeEventHandlers)(e.onPointerEnter,N(n.onOpen)),onPointerLeave:(0,a.composeEventHandlers)(e.onPointerLeave,N(n.onClose)),onFocus:(0,a.composeEventHandlers)(e.onFocus,n.onOpen),onBlur:(0,a.composeEventHandlers)(e.onBlur,n.onClose),onTouchStart:(0,a.composeEventHandlers)(e.onTouchStart,e=>e.preventDefault())})})});S.displayName=y;var x="HoverCardPortal",[E,k]=g(x,{forceMount:void 0}),w=e=>{let{__scopeHoverCard:t,forceMount:s,children:a,container:o}=e,n=b(x,t);return(0,r.jsx)(E,{scope:t,forceMount:s,children:(0,r.jsx)(d.Presence,{present:s||n.open,children:(0,r.jsx)(c.Portal,{asChild:!0,container:o,children:a})})})};w.displayName=x;var C="HoverCardContent",T=s.forwardRef((e,t)=>{let s=k(C,e.__scopeHoverCard),{forceMount:o=s.forceMount,...n}=e,i=b(C,e.__scopeHoverCard);return(0,r.jsx)(d.Presence,{present:o||i.open,children:(0,r.jsx)(j,{"data-state":i.open?"open":"closed",...n,onPointerEnter:(0,a.composeEventHandlers)(e.onPointerEnter,N(i.onOpen)),onPointerLeave:(0,a.composeEventHandlers)(e.onPointerLeave,N(i.onClose)),ref:t})})});T.displayName=C;var j=s.forwardRef((e,o)=>{let{__scopeHoverCard:n,onEscapeKeyDown:c,onPointerDownOutside:d,onFocusOutside:u,onInteractOutside:m,...g}=e,h=b(C,n),_=f(n),v=s.useRef(null),y=(0,i.useComposedRefs)(o,v),[S,x]=s.useState(!1);return s.useEffect(()=>{if(S){let e=document.body;return t=e.style.userSelect||e.style.webkitUserSelect,e.style.userSelect="none",e.style.webkitUserSelect="none",()=>{e.style.userSelect=t,e.style.webkitUserSelect=t}}},[S]),s.useEffect(()=>{if(v.current){let e=()=>{x(!1),h.isPointerDownOnContentRef.current=!1,setTimeout(()=>{document.getSelection()?.toString()!==""&&(h.hasSelectionRef.current=!0)})};return document.addEventListener("pointerup",e),()=>{document.removeEventListener("pointerup",e),h.hasSelectionRef.current=!1,h.isPointerDownOnContentRef.current=!1}}},[h.isPointerDownOnContentRef,h.hasSelectionRef]),s.useEffect(()=>{v.current&&(function(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});for(;r.nextNode();)t.push(r.currentNode);return t})(v.current).forEach(e=>e.setAttribute("tabindex","-1"))}),(0,r.jsx)(p.DismissableLayer,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:m,onEscapeKeyDown:c,onPointerDownOutside:d,onFocusOutside:(0,a.composeEventHandlers)(u,e=>{e.preventDefault()}),onDismiss:h.onDismiss,children:(0,r.jsx)(l.Content,{..._,...g,onPointerDown:(0,a.composeEventHandlers)(g.onPointerDown,e=>{e.currentTarget.contains(e.target)&&x(!0),h.hasSelectionRef.current=!1,h.isPointerDownOnContentRef.current=!0}),ref:y,style:{...g.style,userSelect:S?"text":void 0,WebkitUserSelect:S?"text":void 0,"--radix-hover-card-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-hover-card-content-available-width":"var(--radix-popper-available-width)","--radix-hover-card-content-available-height":"var(--radix-popper-available-height)","--radix-hover-card-trigger-width":"var(--radix-popper-anchor-width)","--radix-hover-card-trigger-height":"var(--radix-popper-anchor-height)"}})})});function N(e){return t=>"touch"===t.pointerType?void 0:e()}s.forwardRef((e,t)=>{let{__scopeHoverCard:s,...a}=e,o=f(s);return(0,r.jsx)(l.Arrow,{...o,...a,ref:t})}).displayName="HoverCardArrow";var P=e.i(843778);let R=s.forwardRef(({className:e,align:t="center",animate:s="zoom-in",sideOffset:a=4,...o},n)=>(0,r.jsx)(w,{children:(0,r.jsx)(T,{ref:n,align:t,sideOffset:a,className:(0,P.cn)("z-50 w-64 rounded-md border bg-overlay p-4 text-popover-foreground shadow-md outline-none","zoom-in"===s?"animate-in zoom-in-[99%]":"animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",e),...o})}));R.displayName=T.displayName,e.s(["HoverCard",()=>v,"HoverCardContent",()=>R,"HoverCardTrigger",()=>S],71049)},388298,e=>{"use strict";let t=(0,e.i(388019).default)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);e.s(["Play",()=>t],388298)}]);

//# debugId=75d19f48-0ee6-50ac-3d88-06dac426097f
//# sourceMappingURL=cbf9ab74cdafebc4.js.map