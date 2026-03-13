;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b7395924-43f3-28d0-c8c9-8550264f28d5")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,503256,e=>{"use strict";var t=e.i(389959);let s=t.forwardRef(function({title:e,titleId:s,...a},r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":s},a),e?t.createElement("title",{id:s},e):null,t.createElement("path",{fillRule:"evenodd",d:"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z",clipRule:"evenodd"}))});e.s(["InformationCircleIcon",0,s],503256)},849368,48202,e=>{"use strict";var t=e.i(242882),s=e.i(97429),a=e.i(714403),r=e.i(246230),n=e.i(760255);let i=s.z.object({errors:s.z.array(s.z.string()),index_statements:s.z.array(s.z.string()),startup_cost_before:s.z.number(),startup_cost_after:s.z.number(),total_cost_before:s.z.number(),total_cost_after:s.z.number()});async function o({projectRef:e,connectionString:t,query:s}){if(!e)throw Error("Project ref is required");let r=s.replace(/'/g,"''"),{result:o}=await (0,a.executeSql)({projectRef:e,connectionString:t,sql:`set search_path to public, extensions; select * from index_advisor('${r}');`});if(!o||0===o.length)return console.error("[index_advisor > getIndexAdvisorResult] No results from index_advisor"),null;let l=i.safeParse(o[0]);if(!l.success){let e=l.error.errors[0],t=e.path.length>0?` at path: ${e.path.join(".")}`:"";return console.error(`Invalid index advisor response${t}: ${e.message}. Received: ${JSON.stringify(o[0])}`),null}return(0,n.filterProtectedSchemaIndexAdvisorResult)(l.data)}async function l({projectRef:e,connectionString:t,query:s}){if(!e)throw Error("Project ref is required");try{var r;let n,{result:i}=await (0,a.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-explain-query"],sql:`
        create or replace function pg_temp.explain_query(query text) returns jsonb
        language plpgsql
        as $$
        declare
            explain_result jsonb;
            prepared_statement_name text := 'query_to_explain';
            explain_plan_statement text;
            n_args int;
        begin
            -- Remove comment lines (its common that they contain semicolons)
            query := trim(
                regexp_replace(
                    regexp_replace(
                        regexp_replace(query,'\\/\\*.+\\*\\/', '', 'g'),
                    '--[^\\r\\n]*', ' ', 'g'),
                '\\s+', ' ', 'g')
            );
      
            -- Remove trailing semicolon
            query := regexp_replace(query, ';\\s*$', '');

            -- Disallow multiple statements
            if query ilike '%;%' then
                raise exception 'Query must not contain a semicolon';
            end if;
        
            -- Hack to support PostgREST because the prepared statement for args incorrectly defaults to text
            query := replace(query, 'WITH pgrst_payload AS (SELECT $1 AS json_data)', 
                                    'WITH pgrst_payload AS (SELECT $1::json AS json_data)');
        
            -- Create a prepared statement for the given query
            deallocate all;
            execute format('prepare %I as %s', prepared_statement_name, query);
        
            -- Detect how many arguments are present in the prepared statement
            n_args = (
                select
                    coalesce(array_length(parameter_types, 1), 0)
                from
                    pg_prepared_statements
                where
                    name = prepared_statement_name
                limit
                    1
            );
        
            -- Create a SQL statement that can be executed to collect the explain plan
            explain_plan_statement = format(
                'set local plan_cache_mode = force_generic_plan; explain (format json) execute %I%s',
                prepared_statement_name,
                case
                    when n_args = 0 then ''
                    else format(
                        '(%s)', array_to_string(array_fill('null'::text, array[n_args]), ',')
                    )
                end
            );
        
            -- Execute the explain plan statement and get the result
            execute explain_plan_statement into explain_result;
        
            -- Clean up the prepared statement
            deallocate all;
        
            -- Return the explain result
            return explain_result;
        end;
        $$;

        select pg_temp.explain_query('${s}') as plans;
      `}),o=(r=i,n=[],!function e(t){null!==t&&"object"==typeof t&&("Index Name"in t&&n.push(t["Index Name"]),Object.values(t).forEach(t=>e(t)))}(r),n);if(o.length<=0)return[];let{result:l}=await (0,a.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-names"],sql:`select schemaname as schema, tablename as table, indexname as name from pg_indexes where indexname in (${o.map(e=>`'${e}'`).join(", ")});`});return l}catch(e){return[]}}e.s(["useGetIndexAdvisorResult",0,({projectRef:e,connectionString:s,query:a},{enabled:n=!0,...i}={})=>(0,t.useQuery)({queryKey:r.databaseKeys.indexAdvisorFromQuery(e,a),queryFn:()=>o({projectRef:e,connectionString:s,query:a}),retry:!1,enabled:n&&void 0!==e&&void 0!==a&&(a.startsWith("select")||a.startsWith("SELECT"))||"string"==typeof a&&a.trim().toLowerCase().startsWith("with pgrst_source"),...i})],849368),e.s(["useGetIndexesFromSelectQuery",0,({projectRef:e,connectionString:s,query:a},{enabled:n=!0,...i}={})=>{let o=(a??"").trim().toLowerCase(),c=o.startsWith("select")||o.startsWith("with pgrst_source")||o.startsWith("with pgrst_payload");return(0,t.useQuery)({queryKey:r.databaseKeys.indexesFromQuery(e,a),queryFn:()=>l({projectRef:e,connectionString:s,query:a}),retry:!1,enabled:n&&void 0!==e&&void 0!==a&&c,...i})}],48202)},494031,e=>{"use strict";var t=e.i(749199),s=e.i(820308),a=e.i(775159);e.s(["useQueryPerformanceQuery",0,({preset:e,orderBy:r,searchQuery:n="",roles:i,runIndexAdvisor:o=!1,minCalls:l,minTotalTime:c,filterIndexAdvisor:d=!1})=>{let u=s.PRESET_CONFIG[a.Presets.QUERY_PERFORMANCE].queries[e],m=[void 0!==i&&i.length>0?`auth.rolname in (${i.map(e=>`'${e}'`).join(", ")})`:"",n.length>0?`statements.query ~* '${n}'`:"","number"==typeof l&&l>0?`statements.calls >= ${l}`:"","number"==typeof c&&c>0?`(statements.total_exec_time + statements.total_plan_time) >= ${c}`:""].filter(e=>e.length>0).join(" AND "),p=r&&`ORDER BY ${r.column} ${r.order}`,h=u.sql([],m.length>0?`WHERE ${m}`:void 0,p,o,d);return(0,t.default)({sql:h,params:void 0,where:m,orderBy:p})}])},764275,e=>{"use strict";e.s(["QUERY_PERFORMANCE_CHART_TABS",0,[{id:"query_latency",label:"Query latency"},{id:"rows_read",label:"Rows read"},{id:"calls",label:"Calls"},{id:"cache_hits",label:"Cache hits"}],"QUERY_PERFORMANCE_COLUMNS",0,[{id:"query",name:"Query",description:void 0,minWidth:500},{id:"prop_total_time",name:"Time consumed",description:void 0,minWidth:150},{id:"calls",name:"Calls",description:void 0,minWidth:100},{id:"max_time",name:"Max time",description:void 0,minWidth:100},{id:"mean_time",name:"Mean time",description:void 0,minWidth:100},{id:"min_time",name:"Min time",description:void 0,minWidth:100},{id:"rows_read",name:"Rows processed",description:void 0,minWidth:130},{id:"cache_hit_rate",name:"Cache hit rate",description:void 0,minWidth:130},{id:"rolname",name:"Role",description:void 0,minWidth:200},{id:"application_name",name:"Application",description:void 0,minWidth:150}],"QUERY_PERFORMANCE_PRESET_MAP",0,{most_time_consuming:"mostTimeConsuming",most_frequent:"mostFrequentlyInvoked",slowest_execution:"slowestExecutionTime",unified:"unified"},"QUERY_PERFORMANCE_ROLE_DESCRIPTION",0,[{name:"postgres",description:"The default Postgres role. This has admin privileges."},{name:"anon",description:"For unauthenticated, public access. This is the role which the API (PostgREST) will use when a user is not logged in."},{name:"authenticator",description:'A special role for the API (PostgREST). It has very limited access, and is used to validate a JWT and then "change into" another role determined by the JWT verification.'},{name:"authenticated",description:'For "authenticated access." This is the role which the API (PostgREST) will use when a user is logged in.'},{name:"service_role",description:"For elevated access. This role is used by the API (PostgREST) to bypass Row Level Security."},{name:"supabase_auth_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the auth schema."},{name:"supabase_storage_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the storage schema."},{name:"dashboard_user",description:"For running commands via the Supabase UI."},{name:"supabase_admin",description:"An internal role Supabase uses for administrative tasks, such as running upgrades and automations."},{name:"pgbouncer",description:"PgBouncer is a lightweight connection pooler for PostgreSQL. Available on paid plans only."}],"getSupamonitorLogsQuery",0,(e,t)=>`
select
  TIMESTAMP_TRUNC(sml.timestamp, MINUTE) as timestamp,
  CAST(sml_parsed.application_name AS STRING) as application_name,
  SUM(sml_parsed.calls) as calls,
  CAST(sml_parsed.database_name AS STRING) as database_name,
  CAST(sml_parsed.query AS STRING) as query,
  sml_parsed.query_id as query_id,
  SUM(sml_parsed.total_exec_time) as total_exec_time,
  SUM(sml_parsed.total_plan_time) as total_plan_time,
  CAST(sml_parsed.user_name AS STRING) as user_name,
  CASE WHEN SUM(sml_parsed.calls) > 0
    THEN SUM(sml_parsed.total_exec_time) / SUM(sml_parsed.calls)
    ELSE 0
  END as mean_exec_time,
  MIN(NULLIF(sml_parsed.total_exec_time, 0)) as min_exec_time,
  MAX(sml_parsed.total_exec_time) as max_exec_time,
  CASE WHEN SUM(sml_parsed.calls) > 0
    THEN SUM(sml_parsed.total_plan_time) / SUM(sml_parsed.calls)
    ELSE 0
  END as mean_plan_time,
  MIN(NULLIF(sml_parsed.total_plan_time, 0)) as min_plan_time,
  MAX(sml_parsed.total_plan_time) as max_plan_time,
  APPROX_QUANTILES(sml_parsed.total_exec_time, 100)[OFFSET(50)] as p50_exec_time,
  APPROX_QUANTILES(sml_parsed.total_exec_time, 100)[OFFSET(95)] as p95_exec_time,
  APPROX_QUANTILES(sml_parsed.total_plan_time, 100)[OFFSET(50)] as p50_plan_time,
  APPROX_QUANTILES(sml_parsed.total_plan_time, 100)[OFFSET(95)] as p95_plan_time
from supamonitor_logs as sml
cross join unnest(sml.metadata) as sml_metadata
cross join unnest(sml_metadata.supamonitor) as sml_parsed
WHERE sml.event_message = 'log'
  AND sml.timestamp >= CAST('${e}' AS TIMESTAMP)
  AND sml.timestamp <= CAST('${t}' AS TIMESTAMP)
GROUP BY timestamp, user_name, database_name, application_name, query_id, query
ORDER BY timestamp DESC
`.trim()])},908942,e=>{"use strict";e.s(["useIndexInvalidation",()=>m]);var t=e.i(356003),s=e.i(435798),a=e.i(449024),r=e.i(389959),n=e.i(494031),i=e.i(937357),o=e.i(246230),l=e.i(635494),c=e.i(764275),d=e.i(888525),u=e.i(826843);function m(){let e=(0,s.useRouter)(),m=(0,t.useQueryClient)(),{data:p}=(0,l.useSelectedProjectQuery)(),{isIndexAdvisorEnabled:h}=(0,d.useIndexAdvisorStatus)(),[{preset:f,search:_,order:y,sort:x}]=(0,a.useQueryStates)({sort:a.parseAsString,search:a.parseAsString.withDefault(""),order:a.parseAsString,preset:a.parseAsString.withDefault("unified")}),{invalidate:g}=(0,u.useTableIndexAdvisor)(),b=c.QUERY_PERFORMANCE_PRESET_MAP[f],v=e?.query?.roles??[],j=(0,n.useQueryPerformanceQuery)({searchQuery:_,orderBy:x?{column:x,order:y}:void 0,preset:b,roles:"string"==typeof v?[v]:v,runIndexAdvisor:h});return(0,r.useCallback)(()=>{j.runQuery(),m.invalidateQueries({queryKey:o.databaseKeys.indexAdvisorFromQuery(p?.ref,"")}),m.invalidateQueries({queryKey:i.databaseIndexesKeys.list(p?.ref)}),g()},[j,m,p?.ref,g])}},961563,e=>{"use strict";var t=e.i(478902),s=e.i(896088),a=e.i(355901);e.i(128328);var r=e.i(158639),n=e.i(513826),i=e.i(610144),o=e.i(450972),l=e.i(635494),c=e.i(10429),d=e.i(206413),u=e.i(592360),m=e.i(178527),p=e.i(837710),h=e.i(592383),f=e.i(760255);e.s(["IndexAdvisorDisabledState",0,()=>{let{ref:e}=(0,r.useParams)(),{data:_}=(0,l.useSelectedProjectQuery)(),{data:y}=(0,o.useDatabaseExtensionsQuery)({projectRef:_?.ref,connectionString:_?.connectionString}),{hypopg:x,indexAdvisor:g}=(0,f.getIndexAdvisorExtensions)(y),{mutateAsync:b,isPending:v}=(0,i.useDatabaseExtensionEnableMutation)(),j=async()=>{if(void 0===_)return console.error("Project is required");try{x?.installed_version===null&&await b({projectRef:_?.ref,connectionString:_?.connectionString,name:x.name,schema:x?.schema??"extensions",version:x.default_version}),g?.installed_version===null&&await b({projectRef:_?.ref,connectionString:_?.connectionString,name:g.name,schema:g?.schema??"extensions",version:g.default_version}),a.toast.success("Successfully enabled index advisor!")}catch(e){a.toast.error(`Failed to enable index advisor: ${e.message}`)}};return(0,t.jsxs)(m.Alert_Shadcn_,{className:"mb-6",children:[(0,t.jsx)(u.AlertTitle_Shadcn_,{children:(0,t.jsx)(h.Markdown,{className:"text-foreground",content:void 0===g?"Newer version of Postgres required":"Postgres extensions `index_advisor` and `hypopg` required"})}),(0,t.jsx)(d.AlertDescription_Shadcn_,{children:(0,t.jsx)(h.Markdown,{content:void 0===g?"Upgrade to the latest version of Postgres to get recommendations on indexes for your queries":"These extensions can help in recommending database indexes to reduce the costs of your query."})}),(0,t.jsx)(d.AlertDescription_Shadcn_,{className:"mt-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[void 0===g?(0,t.jsx)(p.Button,{asChild:!0,type:"default",children:(0,t.jsx)(s.default,{href:`/project/${e}/settings/infrastructure`,children:"Upgrade Postgres version"})}):(0,t.jsx)(p.Button,{type:"default",disabled:v,loading:v,onClick:()=>j(),children:"Enable extensions"}),(0,t.jsx)(n.DocsButton,{href:`${c.DOCS_URL}/guides/database/extensions/index_advisor`})]})})]})}])},593977,770235,e=>{"use strict";var t=e.i(478902),s=e.i(843778),a=e.i(760255);e.s(["IndexImprovementText",0,({indexStatements:e,totalCostBefore:r,totalCostAfter:n,className:i,...o})=>{let l=(0,a.calculateImprovement)(r,n);return(0,t.jsxs)("p",{className:(0,s.cn)("text-sm text-foreground-light mb-3",i),...o,children:["Query's performance can be improved by"," ",(0,t.jsxs)("span",{className:"text-brand",children:[l.toFixed(2),"%"]})," by creating this"," ",e.length>1?"indexes":"index",":"]})}],593977);var r=e.i(503256),n=e.i(177948),i=e.i(749844),o=e.i(613580);e.s(["QueryPanelContainer",0,({children:e,className:a})=>(0,t.jsx)("div",{className:(0,s.cn)("flex flex-col gap-y-0 py-4",a),children:e}),"QueryPanelScoreSection",0,({className:e,name:a,description:l,before:c,after:d,hideArrowMarkers:u=!1})=>(0,t.jsxs)("div",{className:(0,s.cn)("py-4 px-4 flex",e),children:[(0,t.jsxs)("div",{className:"flex gap-x-2 w-48",children:[(0,t.jsx)("span",{className:"text-sm",children:a}),(0,t.jsxs)(o.Tooltip,{children:[(0,t.jsx)(o.TooltipTrigger,{asChild:!0,className:"mt-1",children:(0,t.jsx)(r.InformationCircleIcon,{className:"transition text-foreground-muted w-3 h-3 data-[state=delayed-open]:text-foreground-light"})}),(0,t.jsx)(o.TooltipContent,{side:"top",className:"w-52 text-center",children:l})]})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsxs)("div",{className:"flex gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"Currently:"}),(0,t.jsx)("span",{className:(0,s.cn)("font-mono",void 0!==c&&void 0!==d&&c!==d?"text-foreground-light":""),children:c})]}),void 0!==c&&void 0!==d&&c!==d&&(0,t.jsxs)("div",{className:"flex items-center gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"With index:"}),(0,t.jsx)("span",{className:"font-mono",children:d}),void 0!==c&&!u&&(0,t.jsxs)("div",{className:"flex items-center gap-x-1",children:[d>c?(0,t.jsx)(i.ArrowUp,{size:14,className:"text-warning"}):(0,t.jsx)(n.ArrowDown,{size:14,className:"text-brand"}),"number"==typeof c&&0!==c&&!isNaN(c)&&isFinite(c)&&(0,t.jsxs)("span",{className:(0,s.cn)("font-mono tracking-tighter",d>c?"text-warning":"text-brand"),children:[((c-d)/c*100).toFixed(2),"%"]})]})]})]})]}),"QueryPanelSection",0,({children:e,className:a})=>(0,t.jsx)("div",{className:(0,s.cn)("px-6 flex flex-col gap-y-0",a),children:e})],770235)},826843,331906,e=>{"use strict";e.s(["TableIndexAdvisorProvider",()=>U,"useColumnHasIndexSuggestion",()=>K,"useTableIndexAdvisor",()=>Y],826843);var t=e.i(478902),s=e.i(356003),a=e.i(389959);e.s(["QueryIndexes",()=>L],331906);var r=e.i(370410),n=e.i(219195),i=e.i(350046),o=e.i(888525),l=e.i(567558),c=e.i(513826),d=e.i(710483),u=e.i(450972),m=e.i(849368),p=e.i(48202),h=e.i(635494),f=e.i(10429),_=e.i(967052),y=e.i(31227),x=e.i(154225),g=e.i(350341),b=e.i(206413),v=e.i(592360),j=e.i(178527),S=e.i(837710),w=e.i(672044),E=e.i(774234),N=e.i(554855),T=e.i(925282),A=e.i(843778),q=e.i(108151),C=e.i(908942),R=e.i(284399),k=e.i(760255),P=e.i(961563),I=e.i(593977),O=e.i(770235);let L=({selectedRow:e,columnName:s,suggestedSelectQuery:L,onClose:M})=>{let{data:$}=(0,h.useSelectedProjectQuery)(),[D,F]=(0,a.useState)(!1),[Q,z]=(0,a.useState)(!1),U=(0,_.useTrack)(),[Y,K]=(0,a.useState)(!1),{data:H,isSuccess:W,isPending:B,isError:G,error:V}=(0,p.useGetIndexesFromSelectQuery)({projectRef:$?.ref,connectionString:$?.connectionString,query:e?.query}),{data:X,isPending:J}=(0,u.useDatabaseExtensionsQuery)({projectRef:$?.ref,connectionString:$?.connectionString}),{isIndexAdvisorEnabled:Z}=(0,o.useIndexAdvisorStatus)(),{data:ee,error:et,refetch:es,isError:ea,isSuccess:er,isLoading:en}=(0,m.useGetIndexAdvisorResult)({projectRef:$?.ref,connectionString:$?.connectionString,query:e?.query},{enabled:Z}),{index_statements:ei,startup_cost_after:eo,startup_cost_before:el,total_cost_after:ec,total_cost_before:ed}=ee??{index_statements:[],total_cost_after:0,total_cost_before:0},eu=(0,k.hasIndexRecommendations)(ee,er);(0,k.calculateImprovement)(ed,ec);let em=(0,C.useIndexInvalidation)();(0,a.useEffect)(()=>{en||Y||(U("index_advisor_tab_clicked",{hasRecommendations:eu,isIndexAdvisorEnabled:Z}),K(!0))},[en,eu,Y,U,Z]);let ep=async()=>{if(0!==ei.length){z(!0),U("index_advisor_create_indexes_button_clicked");try{await (0,k.createIndexes)({projectRef:$?.ref,connectionString:$?.connectionString,indexStatements:ei,onSuccess:()=>es()}),em()}catch(e){console.error("Failed to create index:",e),z(!1)}finally{z(!1),M?.()}}};return J||Z?(0,t.jsxs)(O.QueryPanelContainer,{className:"h-full overflow-y-auto py-0 pt-4",children:[(s||L)&&(0,t.jsx)(O.QueryPanelSection,{className:"pt-2 pb-6 border-b",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-2",children:"Recommendation reason"}),s&&(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["Recommendation for column: ",(0,t.jsx)("span",{className:"font-mono",children:s})]})]}),L&&(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Based on the following query:"}),(0,t.jsx)(w.CodeBlock,{hideLineNumbers:!0,value:L,language:"sql",className:(0,A.cn)("max-w-full max-h-[200px]","!py-2 !px-2.5 prose dark:prose-dark","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")})]})]})}),(0,t.jsxs)(O.QueryPanelSection,{className:"pt-2 mb-6",children:[(0,t.jsxs)("div",{className:"mb-4 flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Indexes in use"}),(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["This query is using the following index",(H??[]).length>1?"s":"",":"]})]}),B&&(0,t.jsx)(q.GenericSkeletonLoader,{}),G&&(0,t.jsx)(l.default,{projectRef:$?.ref,error:V,subject:"Failed to retrieve indexes in use"}),W&&(0,t.jsxs)("div",{children:[0===H.length&&(0,t.jsxs)("div",{className:"border rounded border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"No indexes are involved in this query"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter",children:"Indexes may not necessarily be used if they incur a higher cost when executing the query"})]}),H.map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-x-4 bg-surface-100 border first:rounded-tl first:rounded-tr border-b-0 last:border-b last:rounded-b px-2 py-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(n.Table2,{size:14,className:"text-foreground-light"}),(0,t.jsxs)("span",{className:"text-xs font-mono text-foreground-light",children:[e.schema,".",e.table]})]}),(0,t.jsx)("span",{className:"text-xs font-mono",children:e.name})]},e.name))]})]}),(0,t.jsx)(O.QueryPanelSection,{className:"flex flex-col gap-y-6 py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(!er||null!==ee)&&(0,t.jsx)("h4",{className:"mb-2",children:"New index recommendations"}),J?(0,t.jsx)(q.GenericSkeletonLoader,{}):Z?(0,t.jsxs)(t.Fragment,{children:[en&&(0,t.jsx)(q.GenericSkeletonLoader,{}),ea&&(0,t.jsx)(l.default,{projectRef:$?.ref,error:et,subject:"Failed to retrieve result from index advisor"}),er&&(0,t.jsx)(t.Fragment,{children:null===ee?(0,t.jsx)(d.Admonition,{type:"default",showIcon:!0,title:"Index recommendations not available",description:"Index advisor could not analyze this query. This can happen if the query references tables, functions, or extensions that no longer exist or were deleted."}):0===(ei??[]).length?(0,t.jsxs)(j.Alert_Shadcn_,{className:"[&>svg]:rounded-full",children:[(0,t.jsx)(r.Check,{}),(0,t.jsx)(v.AlertTitle_Shadcn_,{children:"This query is optimized"}),(0,t.jsx)(b.AlertDescription_Shadcn_,{children:"Recommendations for indexes will show here"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I.IndexImprovementText,{indexStatements:ei,totalCostBefore:ed,totalCostAfter:ec,className:"text-sm text-foreground-light"}),(0,t.jsx)(w.CodeBlock,{hideLineNumbers:!0,value:ei.join(";\n")+";",language:"sql",className:(0,A.cn)("max-w-full max-h-[310px]","!py-3 !px-3.5 prose dark:prose-dark transition","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")}),(0,t.jsx)("p",{className:"text-sm text-foreground-light mt-3",children:"This recommendation serves to prevent your queries from slowing down as your application grows, and hence the index may not be used immediately after it's created (e.g If your table is still small at this time)."})]})})]}):(0,t.jsx)(P.IndexAdvisorDisabledState,{})]})}),Z&&eu&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(O.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Query costs"}),(0,t.jsxs)("div",{className:"border rounded-md flex flex-col bg-surface-100",children:[(0,t.jsx)(O.QueryPanelScoreSection,{name:"Total cost of query",description:"An estimate of how long it will take to return all the rows (Includes start up cost)",before:ed,after:ec}),(0,t.jsxs)(T.Collapsible_Shadcn_,{open:D,onOpenChange:F,children:[(0,t.jsx)(E.CollapsibleContent_Shadcn_,{asChild:!0,className:"pb-3",children:(0,t.jsx)(O.QueryPanelScoreSection,{hideArrowMarkers:!0,className:"border-t",name:"Start up cost",description:"An estimate of how long it will take to fetch the first row",before:el,after:eo})}),(0,t.jsxs)(N.CollapsibleTrigger_Shadcn_,{className:"text-xs py-1.5 border-t text-foreground-light bg-studio w-full rounded-b-md",children:["View ",D?"less":"more"]})]})]})]})}),(0,t.jsx)(O.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,t.jsx)("h4",{className:"mb-2",children:"FAQ"}),(0,t.jsxs)(g.Accordion_Shadcn_,{collapsible:!0,type:"single",className:"border rounded-md",children:[(0,t.jsxs)(x.AccordionItem_Shadcn_,{value:"1",children:[(0,t.jsx)(i.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition [&[data-state=open]]:text-foreground",children:"What units are cost in?"}),(0,t.jsx)(y.AccordionContent_Shadcn_,{className:"px-4 text-foreground-light",children:"Costs are in an arbitrary unit, and do not represent a unit of time. The units are anchored (by default) to a single sequential page read costing 1.0 units. They do, however, serve as a predictor of higher execution times."})]}),(0,t.jsxs)(x.AccordionItem_Shadcn_,{value:"2",className:"border-b-0",children:[(0,t.jsx)(i.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition [&[data-state=open]]:text-foreground",children:"How should I prioritize start up and total cost?"}),(0,t.jsxs)(y.AccordionContent_Shadcn_,{className:"px-4 text-foreground-light [&>div]:space-y-2",children:[(0,t.jsx)("p",{children:"This depends on the expected size of the result set from the query."}),(0,t.jsx)("p",{children:"For queries that return a small number or rows, the startup cost is more critical and minimizing startup cost can lead to faster response times, especially in interactive applications."}),(0,t.jsx)("p",{children:"For queries that return a large number of rows, the total cost becomes more important, and optimizing it will help in efficiently using resources and reducing overall query execution time."})]})]})]})]})})]}),Z&&eu&&(0,t.jsxs)("div",{className:"bg-studio sticky bottom-0 border-t py-3 flex items-center justify-between px-5",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-y-0.5 text-xs",children:[(0,t.jsx)("span",{children:"Apply index to database"}),(0,t.jsx)("span",{className:"text-xs text-foreground-light",children:"This will run the SQL that is shown above"})]}),(0,t.jsx)(S.Button,{disabled:Q,loading:Q,type:"primary",onClick:()=>ep(),children:"Create index"})]})]}):(0,t.jsx)(O.QueryPanelContainer,{className:"h-full",children:(0,t.jsx)(O.QueryPanelSection,{className:"pt-2",children:(0,t.jsxs)("div",{className:"border rounded border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Enable Index Advisor"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter mb-2",children:"Recommends indexes to improve query performance."}),(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(c.DocsButton,{href:`${f.DOCS_URL}/guides/database/extensions/index_advisor`}),(0,t.jsx)(R.EnableIndexAdvisorButton,{})]})]})})})};var M=e.i(246230),$=e.i(242882),D=e.i(714403);async function F({projectRef:e,connectionString:t,schema:s,table:a}){let r,n;if(!e)throw Error("Project ref is required");if(!s)throw Error("Schema is required");if(!a)throw Error("Table is required");let i=(r=s.replace(/'/g,"''"),n=a.replace(/'/g,"''"),`
-- Get top 5 SELECT queries involving this table and run through index_advisor
set search_path to public, extensions;

with top_queries as (
  select
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  where 
    -- Filter for SELECT queries only (index_advisor only works with SELECT)
    (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
    -- Filter for queries involving our table (handles schema.table and just table references)
    and (
      lower(statements.query) like '%${r.toLowerCase()}.${n.toLowerCase()}%'
      or lower(statements.query) like '%from ${n.toLowerCase()}%'
      or lower(statements.query) like '%join ${n.toLowerCase()}%'
    )
    -- Exclude system queries
    and statements.query not like '%pg_catalog%'
    and statements.query not like '%information_schema%'
  order by statements.calls desc
  limit 5
)
select
  tq.query,
  tq.calls,
  tq.total_time,
  tq.mean_time,
  coalesce(ia.index_statements, '{}') as index_statements,
  coalesce((ia.startup_cost_before)::numeric, 0) as startup_cost_before,
  coalesce((ia.startup_cost_after)::numeric, 0) as startup_cost_after,
  coalesce((ia.total_cost_before)::numeric, 0) as total_cost_before,
  coalesce((ia.total_cost_after)::numeric, 0) as total_cost_after
from top_queries tq
left join lateral (
  select * from index_advisor(tq.query)
) ia on true;
`.trim()),{result:o}=await (0,D.executeSql)({projectRef:e,connectionString:t,sql:i}),l=(o||[]).filter(e=>e.index_statements&&e.index_statements.length>0).map(e=>{let t=(0,k.filterProtectedSchemaIndexStatements)(e.index_statements);if(0===t.length)return null;let s=e.total_cost_before>0?(e.total_cost_before-e.total_cost_after)/e.total_cost_before*100:0;return{query:e.query,calls:e.calls,total_time:e.total_time,mean_time:e.mean_time,index_statements:t,startup_cost_before:e.startup_cost_before,startup_cost_after:e.startup_cost_after,total_cost_before:e.total_cost_before,total_cost_after:e.total_cost_after,improvement_percentage:Math.round(100*s)/100}}).filter(e=>null!==e),c=function(e){let t=new Set;for(let s of e){let e=s.match(/USING\s+\w+\s*\(([^)]+)\)/i);e&&e[1].split(",").forEach(e=>{let s=e.trim().replace(/^"(.+)"$/,"$1");s&&t.add(s)})}return Array.from(t)}(l.flatMap(e=>e.index_statements));return{suggestions:l,columnsWithSuggestions:c}}var Q=e.i(725137);let z=(0,a.createContext)({isLoading:!1,isAvailable:!1,isEnabled:!1,columnsWithSuggestions:[],suggestions:[],openSheet:()=>{},getSuggestionsForColumn:()=>[],invalidate:async()=>{}});function U({children:e,schema:r,table:n}){let{data:i}=(0,h.useSelectedProjectQuery)(),{isIndexAdvisorAvailable:l,isIndexAdvisorEnabled:c}=(0,o.useIndexAdvisorStatus)(),d=(0,s.useQueryClient)(),[u,m]=(0,a.useState)(!1),[p,f]=(0,a.useState)(void 0),{data:_,isLoading:y}=function({projectRef:e,connectionString:t,schema:s,table:a},{enabled:r=!0,...n}={}){return(0,$.useQuery)({queryKey:M.databaseKeys.tableIndexAdvisor(e,s,a),queryFn:()=>F({projectRef:e,connectionString:t,schema:s,table:a}),enabled:r&&void 0!==e&&!!s&&!!a,retry:!1,staleTime:3e5,...n})}({projectRef:i?.ref,connectionString:i?.connectionString,schema:r,table:n},{enabled:c&&!!r&&!!n}),x=(0,a.useCallback)(e=>{f(e),m(!0)},[]),g=(0,a.useCallback)(()=>{m(!1),f(void 0)},[]),b=(0,a.useCallback)(e=>_?.suggestions?_.suggestions.filter(t=>t.index_statements.some(t=>{let s=t.match(/USING\s+\w+\s*\(([^)]+)\)/i);return!!s&&s[1].split(",").map(e=>e.trim().replace(/^"(.+)"$/,"$1")).includes(e)})):[],[_?.suggestions]),v=(0,a.useCallback)(async()=>{i?.ref&&r&&n&&await d.invalidateQueries({queryKey:M.databaseKeys.tableIndexAdvisor(i.ref,r,n)})},[d,i?.ref,r,n]),j=p?b(p)[0]:null,S={isLoading:y,isAvailable:l,isEnabled:c,columnsWithSuggestions:_?.columnsWithSuggestions??[],suggestions:_?.suggestions??[],openSheet:x,getSuggestionsForColumn:b,invalidate:v};return(0,t.jsxs)(z.Provider,{value:S,children:[e,(0,t.jsx)(Q.Sheet,{open:u,onOpenChange:e=>!e&&g(),children:(0,t.jsxs)(Q.SheetContent,{className:"flex flex-col gap-0 p-0 sm:max-w-[500px]",children:[(0,t.jsx)(Q.SheetHeader,{className:"border-b px-5 py-3",children:(0,t.jsx)(Q.SheetTitle,{children:"Index Recommendation"})}),j&&(0,t.jsx)(L,{selectedRow:{query:j.query},columnName:p,suggestedSelectQuery:j.query,onClose:g})]})})]})}function Y(){return(0,a.useContext)(z)}function K(e){let{columnsWithSuggestions:t}=Y();return t.includes(e)}},194576,e=>{"use strict";var t=e.i(478902),s=e.i(221287),a=e.i(938933);let r=({open:e,children:a,className:r,...n})=>(0,t.jsx)(s.Root,{asChild:n.asChild,defaultOpen:n.defaultOpen,open:e,onOpenChange:n.onOpenChange,disabled:n.disabled,className:r,children:a});r.Trigger=function({children:e,asChild:a}){return(0,t.jsx)(s.Trigger,{asChild:a,children:e})},r.Content=function({asChild:e,children:r,className:n}){let i=(0,a.default)("collapsible");return(0,t.jsx)(s.Content,{asChild:e,className:[i.content,n].join(" "),children:r})},e.s(["default",0,r])},58359,e=>{"use strict";var t=e.i(194576);e.s(["Collapsible",()=>t.default])},698175,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(753515),r=e.i(440401),n=e.i(701823),i=e.i(938933),o=e.i(140449);function l({autoComplete:e,autofocus:l,children:c,className:d,descriptionText:u,disabled:m,error:p,icon:h,id:f="",inputRef:_,label:y,afterLabel:x,beforeLabel:g,labelOptional:b,layout:v,name:j="",onChange:S,onBlur:w,placeholder:E,required:N,value:T,defaultValue:A,style:q,size:C="medium",borderless:R=!1,validation:k,...P}){let{formContextOnChange:I,values:O,errors:L,handleBlur:M,touched:$,fieldLevelValidation:D}=(0,o.useFormContext)();O&&!T&&(T=O[f]),p||(L&&!p&&(p=L[f||j]),p=$&&$[f||j]?p:void 0),(0,s.useEffect)(()=>{k&&D(f,k(T))},[]);let F=(0,i.default)("select"),Q=[F.container];d&&Q.push(d);let z=[F.base];return p&&z.push(F.variants.error),p||z.push(F.variants.standard),h&&z.push(F.with_icon[C]),C&&z.push(F.size[C]),m&&z.push(F.disabled),(0,t.jsx)(a.FormLayout,{label:y,afterLabel:x,beforeLabel:g,labelOptional:b,layout:v,id:f,error:p,descriptionText:u,className:d,style:q,size:C,children:(0,t.jsxs)("div",{className:F.container,children:[(0,t.jsx)("select",{id:f,name:j,"data-size":C,defaultValue:A,autoComplete:e,autoFocus:l,className:z.join(" "),onChange:function(e){S&&S(e),I&&I(e),k&&D(f,k(e.target.value))},onBlur:function(e){M&&M(e),w&&w(e)},ref:_,value:T,disabled:m,required:N,placeholder:E,...P,children:c}),h&&(0,t.jsx)(n.default,{size:C,icon:h}),p&&(0,t.jsx)("div",{className:F.actions_container,children:p&&(0,t.jsx)(r.default,{size:C})}),(0,t.jsx)("span",{className:F.chevron_container,children:(0,t.jsx)("svg",{className:F.chevron,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})})}l.Option=function({value:e,children:s,selected:a}){return(0,t.jsx)("option",{value:e,selected:a,children:s})},l.OptGroup=function({label:e,children:s}){return(0,t.jsx)("optgroup",{label:e,children:s})},e.s(["default",0,l])},888525,760255,284399,e=>{"use strict";var t=e.i(355901),s=e.i(714403),a=e.i(392491);function r(e=[]){return{hypopg:e.find(e=>"hypopg"===e.name),indexAdvisor:e.find(e=>"index_advisor"===e.name)}}function n(e,t){return void 0===e||void 0===t||e<=0||e<=t?0:(e-t)/e*100}async function i({projectRef:e,connectionString:a,indexStatements:r,onSuccess:n,onError:i}){if(!e){let e=Error("Project ref is required");return i&&i(e),Promise.reject(e)}if(0===r.length){let e=Error("No index statements provided");return i&&i(e),Promise.reject(e)}try{return await (0,s.executeSql)({projectRef:e,connectionString:a,sql:r.join(";\n")+";"}),t.toast.success("Successfully created index"),n&&n(),Promise.resolve()}catch(e){return t.toast.error(`Failed to create index: ${e.message}`),i&&i(e),Promise.reject(e)}}function o(e,t){return!!(t&&e?.index_statements&&e.index_statements.length>0)}function l(e){return e&&0!==e.length?e.filter(e=>{let t=e.match(/ON\s+(?:"?(\w+)"?\.|(\w+)\.)/i);if(!t)return!0;let s=t[1]||t[2];return!s||!a.INTERNAL_SCHEMAS.includes(s.toLowerCase())}):[]}function c(e){if(!e||!e.index_statements)return e??null;let t=l(e.index_statements);return 0===t.length?null:{...e,index_statements:t}}function d(e){if(!e)return!1;let t=e.toLowerCase();return a.INTERNAL_SCHEMAS.some(e=>RegExp(`(?:from|join|update|insert\\s+into|delete\\s+from)\\s+(?:${e}\\.|"${e}"\\.)`,"i").test(t))}e.s(["calculateImprovement",()=>n,"createIndexes",()=>i,"filterProtectedSchemaIndexAdvisorResult",()=>c,"filterProtectedSchemaIndexStatements",()=>l,"getIndexAdvisorExtensions",()=>r,"hasIndexRecommendations",()=>o,"queryInvolvesProtectedSchemas",()=>d],760255);var u=e.i(450972),m=e.i(635494);function p(){let{data:e}=(0,m.useSelectedProjectQuery)(),{data:t}=(0,u.useDatabaseExtensionsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{hypopg:s,indexAdvisor:a}=r(t??[]),n=!!s&&!!a,i=n&&null!==s.installed_version&&null!==a.installed_version;return{isIndexAdvisorAvailable:n,isIndexAdvisorEnabled:i}}e.s(["useIndexAdvisorStatus",()=>p],888525);var h=e.i(478902),f=e.i(389959),_=e.i(610144),y=e.i(967052),x=e.i(232520),g=e.i(837710);e.s(["EnableIndexAdvisorButton",0,()=>{let e=(0,y.useTrack)(),{data:s}=(0,m.useSelectedProjectQuery)(),[a,n]=(0,f.useState)(!1),{data:i}=(0,u.useDatabaseExtensionsQuery)({projectRef:s?.ref,connectionString:s?.connectionString}),{hypopg:o,indexAdvisor:l}=r(i),{mutateAsync:c,isPending:d}=(0,_.useDatabaseExtensionEnableMutation)(),p=async()=>{if(void 0===s)return t.toast.error("Project is required");try{o?.installed_version===null&&await c({projectRef:s?.ref,connectionString:s?.connectionString,name:o.name,schema:o?.schema??"extensions",version:o.default_version}),l?.installed_version===null&&await c({projectRef:s?.ref,connectionString:s?.connectionString,name:l.name,schema:l?.schema??"extensions",version:l.default_version}),t.toast.success("Successfully enabled Index Advisor!"),n(!1)}catch(e){t.toast.error(`Failed to enable Index Advisor: ${e.message}`)}};return(0,h.jsxs)(x.AlertDialog,{open:a,onOpenChange:()=>n(!a),children:[(0,h.jsx)(x.AlertDialogTrigger,{asChild:!0,children:(0,h.jsx)(g.Button,{type:"primary",onClick:()=>e("index_advisor_banner_enable_button_clicked"),children:"Enable"})}),(0,h.jsxs)(x.AlertDialogContent,{children:[(0,h.jsxs)(x.AlertDialogHeader,{children:[(0,h.jsx)(x.AlertDialogTitle,{children:"Enable Index Advisor"}),(0,h.jsxs)(x.AlertDialogDescription,{children:["This will enable the ",(0,h.jsx)("code",{className:"text-code-inline",children:"index_advisor"})," and"," ",(0,h.jsx)("code",{className:"text-code-inline",children:"hypopg"})," Postgres extensions so Index Advisor can analyse queries and suggest performance-improving indexes."]})]}),(0,h.jsxs)(x.AlertDialogFooter,{children:[(0,h.jsx)(x.AlertDialogCancel,{children:"Cancel"}),(0,h.jsx)(x.AlertDialogAction,{onClick:t=>{t.preventDefault(),p(),e("index_advisor_dialog_enable_button_clicked")},disabled:d,children:d?"Enabling...":"Enable"})]})]})]})}],284399)},298625,e=>{"use strict";var t=e.i(242882),s=e.i(714403),a=e.i(584258);async function r({projectRef:e,connectionString:t},a){let r=`
    select
      s.oid as "id",
      w.fdwname as "name",
      s.srvname as "server_name",
      s.srvoptions as "server_options",
      c.proname as "handler",
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', c.oid::bigint,
            'schema', relnamespace::regnamespace::text,
            'name', c.relname,
            'columns', (
              select jsonb_agg(
                jsonb_build_object(
                  'name', a.attname,
                  'type', pg_catalog.format_type(a.atttypid, a.atttypmod)
                )
              )
              from pg_catalog.pg_attribute a
              where a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
            ),
            'options', t.ftoptions
          )
        )
        from pg_catalog.pg_class c
        join pg_catalog.pg_foreign_table t on c.oid = t.ftrelid
        where c.oid = any (select t.ftrelid from pg_catalog.pg_foreign_table t where t.ftserver = s.oid)
      ) as "tables"
    from pg_catalog.pg_foreign_server s
    join pg_catalog.pg_foreign_data_wrapper w on s.srvfdw = w.oid
    join pg_catalog.pg_proc c on w.fdwhandler = c.oid;
  `,{result:n}=await (0,s.executeSql)({projectRef:e,connectionString:t,sql:r,queryKey:["fdws"]},a);return n}e.s(["getFDWs",()=>r,"useFDWsQuery",0,({projectRef:e,connectionString:s},{enabled:n=!0,...i}={})=>(0,t.useQuery)({queryKey:a.fdwKeys.list(e),queryFn:({signal:t})=>r({projectRef:e,connectionString:s},t),enabled:n&&void 0!==e,...i})])},667286,e=>{"use strict";e.s(["databaseExtensionsKeys",0,{list:e=>["projects",e,"database-extensions"],defaultSchema:(e,t)=>["projects",e,"database-extensions",t,"default-schema"]}])},450972,e=>{"use strict";var t=e.i(248593),s=e.i(242882),a=e.i(234745),r=e.i(635494);e.i(10429);var n=e.i(837508),i=e.i(667286);async function o({projectRef:e,connectionString:s},r,n){if(!e)throw Error("projectRef is required");let i=new Headers(n);s&&i.set("x-connection-encrypted",s);let{data:o,error:l}=await (0,a.get)("/platform/pg-meta/{ref}/extensions",{params:{header:{"x-connection-encrypted":s,"x-pg-application-name":t.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e}},headers:i,signal:r});return l&&(0,a.handleError)(l),o}e.s(["useDatabaseExtensionsQuery",0,({projectRef:e,connectionString:t},{enabled:a=!0,...l}={})=>{let{data:c}=(0,r.useSelectedProjectQuery)(),d=c?.status===n.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,s.useQuery)({queryKey:i.databaseExtensionsKeys.list(e),queryFn:({signal:s})=>o({projectRef:e,connectionString:t},s),enabled:a&&void 0!==e&&d,...l})}])},12214,e=>{"use strict";var t=e.i(615515);let s=e=>Object.fromEntries(e.map(e=>e.split("=")));function a(e,t){if("wasm_fdw_handler"===e.handlerName){let a=s(t?.server_options??[]);return e.server.options.find(e=>"fdw_package_name"===e.name)?.defaultValue===a.fdw_package_name}return e.handlerName===t?.handler}function r(e){return t.WRAPPERS.find(t=>a(t,e))}e.s(["convertKVStringArrayToJson",0,s,"formatWrapperTables",0,(e,s)=>(e?.tables??[]).map(a=>{let r=0,n=Object.fromEntries(a.options.map(e=>e.split("=")));switch(e.handler){case t.WRAPPER_HANDLERS.STRIPE:r=s?.tables.findIndex(e=>e.options.find(e=>"object"===e.name)?.defaultValue===n.object)??0;break;case t.WRAPPER_HANDLERS.FIREBASE:r="auth/users"===n.object?s?.tables.findIndex(e=>e.options.find(e=>"auth/users"===e.defaultValue))??0:s?.tables.findIndex(e=>"Firestore Collection"===e.label)??0;case t.WRAPPER_HANDLERS.S3:case t.WRAPPER_HANDLERS.AIRTABLE:case t.WRAPPER_HANDLERS.LOGFLARE:case t.WRAPPER_HANDLERS.BIG_QUERY:case t.WRAPPER_HANDLERS.CLICK_HOUSE:}return{...n,index:r,id:a.id,columns:a.columns,is_new_schema:!1,schema:a.schema,schema_name:a.schema,table_name:a.name}}),"getWrapperMetaForWrapper",()=>r,"makeValidateRequired",0,e=>{let t=new Set(e.filter(e=>e.required).map(e=>e.name)),s=new Set(Array.from(t).filter(e=>e.includes("."))),a=Array.from(s);return e=>Object.fromEntries(Object.entries(e).flatMap(([e,t])=>Array.isArray(t)?[[e,t],...t.map((t,s)=>[`${e}.${s}`,t])]:[[e,t]]).filter(([e,r])=>{let[n,i]=e.split(".");if(void 0!==i&&t.has(n)&&Object.keys(r).some(e=>s.has(`${n}.${e}`))){let e=a.find(e=>e.startsWith(`${n}.`));return!!e&&!r[e.split(".")[1]]}return t.has(n)&&(Array.isArray(r)?r.length<1:!r)}).map(([e])=>"table_name"===e?[e,"Please provide a name for your table"]:"columns"===e?[e,"Please select at least one column"]:[e,"This field is required"]))},"wrapperMetaComparator",()=>a])},584258,e=>{"use strict";e.s(["fdwKeys",0,{list:e=>["projects",e,"fdws"]}])},610144,e=>{"use strict";var t=e.i(850036),s=e.i(479084),a=e.i(38429),r=e.i(356003),n=e.i(355901),i=e.i(78162),o=e.i(714403),l=e.i(667286);async function c({projectRef:e,connectionString:a,schema:r,name:n,version:i,cascade:l=!1,createSchema:c=!1}){let d=new Headers;a&&d.set("x-connection-encrypted",a);let{sql:u}=t.default.extensions.create({schema:r,name:n,version:i,cascade:l}),{result:m}=await (0,o.executeSql)({projectRef:e,connectionString:a,sql:c?`create schema if not exists ${(0,s.ident)(r)}; ${u}`:u,queryKey:["extension","create"]});return m}e.s(["useDatabaseExtensionEnableMutation",0,({onSuccess:e,onError:t,...s}={})=>{let o=(0,r.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>c(e),async onSuccess(t,s,a){let{projectRef:r}=s;await Promise.all([o.invalidateQueries({queryKey:l.databaseExtensionsKeys.list(r)}),o.invalidateQueries({queryKey:i.configKeys.upgradeEligibility(r)})]),await e?.(t,s,a)},async onError(e,s,a){void 0===t?n.toast.error(`Failed to enable database extension: ${e.message}`):t(e,s,a)},...s})}])},820308,775159,e=>{"use strict";var t,s,a=e.i(55956),r=((t={}).API="api",t.STORAGE="storage",t.AUTH="auth",t.QUERY_PERFORMANCE="query_performance",t.DATABASE="database",t);e.s(["Presets",()=>r],775159);var n=((s={}).LAST_10_MINUTES="Last 10 minutes",s.LAST_30_MINUTES="Last 30 minutes",s.LAST_60_MINUTES="Last 60 minutes",s.LAST_3_HOURS="Last 3 hours",s.LAST_24_HOURS="Last 24 hours",s.LAST_7_DAYS="Last 7 days",s.LAST_14_DAYS="Last 14 days",s.LAST_28_DAYS="Last 28 days",s);let i=[{text:"Last 10 minutes",calcFrom:()=>(0,a.default)().subtract(10,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 30 minutes",calcFrom:()=>(0,a.default)().subtract(30,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 60 minutes",calcFrom:()=>(0,a.default)().subtract(1,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),default:!0,availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 3 hours",calcFrom:()=>(0,a.default)().subtract(3,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 24 hours",calcFrom:()=>(0,a.default)().subtract(1,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 7 days",calcFrom:()=>(0,a.default)().subtract(7,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["pro","team","enterprise"]},{text:"Last 14 days",calcFrom:()=>(0,a.default)().subtract(14,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]},{text:"Last 28 days",calcFrom:()=>(0,a.default)().subtract(28,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]}],o={iso_timestamp_start:i[0].calcFrom(),iso_timestamp_end:i[0].calcTo()},l=(e,t=!0)=>{if(0===e.length)return"";let s=e.map(e=>{let t=e.key.split("."),s=[t[t.length-2],t[t.length-1]].join("."),a=e.key.includes(".")?s:e.key,r=e.value.toString().includes('"')||e.value.toString().includes("'"),n=!isNaN(Number(e.value)),i=!n&&r?e.value:`'${e.value}'`,o=!n&&String(i).toLowerCase(),l=n?e.value:o;switch(e.compare){case"matches":return`REGEXP_CONTAINS(${a}, ${l})`;case"is":default:return`${a} = ${l}`;case"!=":return`${a} != ${l}`;case">=":return`${a} >= ${l}`;case"<=":return`${a} <= ${l}`;case">":return`${a} > ${l}`;case"<":return`${a} < ${l}`}}).filter(Boolean).join(" AND ");return""===s?"":t?"WHERE "+s:"AND "+s},c={[r.API]:{title:"API",queries:{totalRequests:{queryType:"logs",sql:e=>`
        -- reports-api-total-requests
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC`},topRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},errorCounts:{queryType:"logs",sql:e=>`
        -- reports-api-error-counts
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        WHERE
          response.status_code >= 400
        ${l(e,!1)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},topErrorRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-error-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        where
          response.status_code >= 400
        ${l(e,!1)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},responseSpeed:{queryType:"logs",sql:e=>`
        -- reports-api-response-speed
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          avg(response.origin_time) as avg
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
      `},topSlowRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-slow-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count,
          avg(response.origin_time) as avg
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          avg desc
        limit 10
        `},networkTraffic:{queryType:"logs",sql:e=>`
        -- reports-api-network-traffic
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as ingress_mb,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(resp_headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as egress_mb,
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(response.headers) as resp_headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},requestsByCountry:{queryType:"logs",sql:e=>`
        -- reports-api-requests-by-country
        select
          cf.country as country,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(request.cf) as cf
        where
          cf.country is not null
        ${l(e,!1)}
        group by
          cf.country
        `}}},[r.AUTH]:{title:"",queries:{}},[r.STORAGE]:{title:"Storage",queries:{cacheHitRate:{queryType:"logs",sql:e=>`
        -- reports-storage-cache-hit-rate
SELECT
  timestamp_trunc(timestamp, hour) as timestamp,
  countif( h.cf_cache_status in ('HIT', 'STALE', 'REVALIDATED', 'UPDATING') ) as hit_count,
  countif( h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC') ) as miss_count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object') and r.method = 'GET'
  ${l(e,!1)}
group by timestamp
order by timestamp desc
`},topCacheMisses:{queryType:"logs",sql:e=>`
        -- reports-storage-top-cache-misses
SELECT
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
  ${l(e,!1)}
group by path, search
order by count desc
limit 12
    `}}},[r.QUERY_PERFORMANCE]:{title:"Query performance",queries:{mostFrequentlyInvoked:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-frequently-invoked
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
    statements.rows as rows_read,
    case
      when (statements.shared_blks_hit + statements.shared_blks_read) > 0
      then round(
        (statements.shared_blks_hit * 100.0) /
        (statements.shared_blks_hit + statements.shared_blks_read),
        2
      )
      else 0
    end as cache_hit_rate${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?t.replace(/^WHERE/,"AND"):""}
  ${s||"order by statements.calls desc"}
  limit 20`},mostTimeConsuming:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-time-consuming
set search_path to public, extensions;

-- compute total time once up front so we don't need a window function over all rows
with grand_total as (
  select coalesce(nullif(sum(total_exec_time + total_plan_time), 0), 1) as v
  from pg_stat_statements where calls > 0
)
select
    auth.rolname,
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    coalesce(
      ((statements.total_exec_time + statements.total_plan_time) /
        (select v from grand_total)) *
        100,
      0
    ) as prop_total_time${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?t.replace(/^WHERE/,"AND"):""}
  ${s||"order by total_time desc"}
  limit 20`},slowestExecutionTime:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-slowest-execution-time
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?t.replace(/^WHERE/,"AND"):""}
  ${s||"order by max_time desc"}
  limit 20`},queryHitRate:{queryType:"db",sql:e=>`-- reports-query-performance-cache-and-index-hit-rate
select
    'index hit rate' as name,
    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio
  from pg_statio_user_indexes
  union all
  select
    'table hit rate' as name,
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio
  from pg_statio_user_tables;`},unified:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-unified
        set search_path to public, extensions;

        -- compute total time once up front so we don't need a window function over all rows
        with grand_total as (
          select coalesce(nullif(sum(total_exec_time + total_plan_time), 0), 1) as v
          from pg_stat_statements where calls > 0
        ),
        base as (
          select
            auth.rolname,
            statements.query,
            statements.calls,
            statements.total_exec_time + statements.total_plan_time as total_time,
            statements.min_exec_time + statements.min_plan_time as min_time,
            statements.max_exec_time + statements.max_plan_time as max_time,
            statements.mean_exec_time + statements.mean_plan_time as mean_time,
            coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
            statements.rows as rows_read,
            statements.shared_blks_hit as debug_hit,
            statements.shared_blks_read as debug_read,
            case
              when (statements.shared_blks_hit + statements.shared_blks_read) > 0
              then (statements.shared_blks_hit::numeric * 100.0) /
                   (statements.shared_blks_hit + statements.shared_blks_read)
              else 0
            end as cache_hit_rate,
            coalesce(
              ((statements.total_exec_time + statements.total_plan_time) /
                (select v from grand_total)) *
                100,
              0
            ) as prop_total_time
          from pg_stat_statements as statements
            inner join pg_authid as auth on statements.userid = auth.oid
          -- skip queries that were never actually executed
          WHERE statements.calls > 0 ${t?t.replace(/^WHERE/,"AND"):""}
          ${s||"order by total_time desc"}
          limit 50
        ),
        query_results as (
          select
            base.*${a?`,
            case
              when (lower(base.query) like 'select%' or lower(base.query) like 'with pgrst%')
              then (
                select json_build_object(
                  'has_suggestion', array_length(index_statements, 1) > 0,
                  'startup_cost_before', startup_cost_before,
                  'startup_cost_after', startup_cost_after,
                  'total_cost_before', total_cost_before,
                  'total_cost_after', total_cost_after,
                  'index_statements', index_statements
                )
                from index_advisor(base.query)
              )
              else null
            end as index_advisor_result`:""}
          from base
        )
        select *
        from query_results
        ${r&&a?"where (index_advisor_result->>'has_suggestion')::boolean = true":""}
        ${s||"order by total_time desc"}
        limit 20`},slowQueriesCount:{queryType:"db",sql:()=>`
        -- reports-query-performance-slow-queries-count
        set search_path to public, extensions;

        -- Count of slow queries (> 1 second average)
        SELECT count(*) as slow_queries_count
        -- alias needed to reference columns in WHERE
        FROM pg_stat_statements as statements
        -- skip never-executed queries; mean_exec_time > 1000ms = avg over 1 second
        WHERE statements.calls > 0 AND statements.mean_exec_time > 1000;`},queryMetrics:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-metrics
        set search_path to public, extensions;

        SELECT
          COALESCE(ROUND(AVG(statements.rows::numeric / NULLIF(statements.calls, 0)), 1), 0) as avg_rows_per_call,
          COUNT(*) FILTER (WHERE statements.total_exec_time + statements.total_plan_time > 1000) as slow_queries,
          COALESCE(
            ROUND(
              SUM(statements.shared_blks_hit) * 100.0 /
              NULLIF(SUM(statements.shared_blks_hit + statements.shared_blks_read), 0),
              2
            ), 0
          ) || '%' as cache_hit_rate
        FROM pg_stat_statements as statements
        -- skip queries that were never actually executed
        WHERE statements.calls > 0 ${t?t.replace(/^WHERE/,"AND"):""}
        ${s||""}`}}},[r.DATABASE]:{title:"database",queries:{largeObjects:{queryType:"db",sql:e=>`-- reports-database-large-objects
SELECT
        SCHEMA_NAME,
        relname,
        table_size
      FROM
        (SELECT
          pg_catalog.pg_namespace.nspname AS SCHEMA_NAME,
          relname,
          pg_total_relation_size(pg_catalog.pg_class.oid) AS table_size
        FROM pg_catalog.pg_class
        JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
        ) t
      WHERE SCHEMA_NAME NOT LIKE 'pg_%'
      ORDER BY table_size DESC
      LIMIT 5;`}}}};e.s(["DEFAULT_QUERY_PARAMS",0,o,"DEPRECATED_REPORTS",0,["total_realtime_ingress","total_rest_options_requests","total_auth_ingress","total_auth_get_requests","total_auth_post_requests","total_auth_patch_requests","total_auth_options_requests","total_storage_options_requests","total_storage_patch_requests","total_options_requests","total_rest_ingress","total_rest_get_requests","total_rest_post_requests","total_rest_patch_requests","total_rest_delete_requests","total_storage_get_requests","total_storage_post_requests","total_storage_delete_requests","total_auth_delete_requests","total_get_requests","total_patch_requests","total_post_requests","total_ingress","total_delete_requests"],"EDGE_FUNCTION_REGIONS",0,[{key:"ap-northeast-1",label:"Tokyo"},{key:"ap-northeast-2",label:"Seoul"},{key:"ap-south-1",label:"Mumbai"},{key:"ap-southeast-1",label:"Singapore"},{key:"ap-southeast-2",label:"Sydney"},{key:"ca-central-1",label:"Canada Central"},{key:"us-east-1",label:"N. Virginia"},{key:"us-west-1",label:"N. California"},{key:"us-west-2",label:"Oregon"},{key:"eu-central-1",label:"Frankfurt"},{key:"eu-west-1",label:"Ireland"},{key:"eu-west-2",label:"London"},{key:"eu-west-3",label:"Paris"},{key:"sa-east-1",label:"São Paulo"}],"LAYOUT_COLUMN_COUNT",0,2,"PRESET_CONFIG",0,c,"REPORTS_DATEPICKER_HELPERS",0,i,"REPORT_DATERANGE_HELPER_LABELS",()=>n,"generateRegexpWhere",0,l],820308)},749199,e=>{"use strict";var t=e.i(242882),s=e.i(820308),a=e.i(150671),r=e.i(714403),n=e.i(635494),i=e.i(189329);e.s(["default",0,({sql:e,params:o=s.DEFAULT_QUERY_PARAMS,where:l,orderBy:c})=>{let{data:d}=(0,n.useSelectedProjectQuery)(),u=(0,i.useDatabaseSelectorStateSnapshot)(),{data:m}=(0,a.useReadReplicasQuery)({projectRef:d?.ref}),p=(m||[]).find(e=>e.identifier===u.selectedDatabaseId)?.connectionString,h=u.selectedDatabaseId,f="function"==typeof e?e([]):e,{data:_,error:y,isPending:x,isRefetching:g,refetch:b}=(0,t.useQuery)({queryKey:["projects",d?.ref,"db",{...o,sql:f,identifier:h},l,c],queryFn:({signal:e})=>(0,r.executeSql)({projectRef:d?.ref,connectionString:p||d?.connectionString,sql:f},e).then(e=>e.result),enabled:!!f,refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{error:y||("object"==typeof _?_?.error:""),data:_,isLoading:x,isRefetching:g,params:o,runQuery:b,resolvedSql:f}}])},384429,e=>{"use strict";var t=e.i(698175);e.s(["Select",()=>t.default])},819993,e=>{"use strict";let t=(0,e.i(388019).default)("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);e.s(["Link",()=>t],819993)},546024,e=>{"use strict";let t=(0,e.i(388019).default)("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);e.s(["Key",()=>t],546024)},199327,e=>{"use strict";let t=(0,e.i(388019).default)("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);e.s(["Home",()=>t],199327)},937357,e=>{"use strict";e.s(["databaseIndexesKeys",0,{list:(e,t)=>["projects",e,"database-indexes",t].filter(Boolean)}])},686255,e=>{"use strict";e.s(["enumeratedTypesKeys",0,{list:e=>["projects",e,"enumerated-types"]}])},867467,e=>{"use strict";var t=e.i(389959);function s(e){let s=(0,t.useRef)(),a=s.current!==e;return(0,t.useEffect)(()=>{s.current=e}),a}function a(e){let s=(0,t.useRef)(),a=s.current!==e;return s.current=e,a}e.s(["useChanged",()=>s,"useChangedSync",()=>a])},691337,e=>{"use strict";var t=e.i(850036),s=e.i(38429),a=e.i(356003),r=e.i(355901),n=e.i(714403),i=e.i(509847);async function o({projectRef:e,connectionString:s,payload:a}){let r=new Headers;s&&r.set("x-connection-encrypted",s);let{sql:i}=t.default.policies.create(a),{result:o}=await (0,n.executeSql)({projectRef:e,connectionString:s,sql:i,queryKey:["policy","create"]});return o}e.s(["createDatabasePolicy",()=>o,"useDatabasePolicyCreateMutation",0,({onSuccess:e,onError:t,...n}={})=>{let l=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>o(e),async onSuccess(t,s,a){let{projectRef:r}=s;await l.invalidateQueries({queryKey:i.databasePoliciesKeys.list(r)}),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to create database policy: ${e.message}`):t(e,s,a)},...n})}])},554222,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(355901),r=e.i(171997),n=e.i(539013),i=e.i(647307),o=e.i(635494);e.s(["SchemaEditor",0,({visible:e,onSuccess:l,closePanel:c})=>{let{data:d}=(0,o.useSelectedProjectQuery)(),[u,m]=(0,s.useState)({name:void 0}),[p,h]=(0,s.useState)(""),{mutateAsync:f,isPending:_}=(0,i.useSchemaCreateMutation)();(0,s.useEffect)(()=>{e&&(h(""),m({name:void 0}))},[e]);let y=async()=>{let e={};if(0===p.length&&(e.name="Please provide a name for your schema"),Object.keys(e).length>0)return m(e);if(void 0===d)return console.error("Project is required");try{await f({projectRef:d.ref,connectionString:d.connectionString,name:p}),l(p),a.toast.success(`Successfully created schema "${p}"`)}catch(e){a.toast.error(`Failed to create schema: ${e}`)}};return(0,t.jsx)(n.SidePanel,{size:"medium",visible:e,header:"Create a new schema",className:"transition-all duration-100 ease-in",onCancel:c,onConfirm:y,loading:_,cancelText:"Cancel",confirmText:"Save",children:(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.SidePanel.Content,{children:(0,t.jsx)("div",{className:"space-y-10 py-6",children:(0,t.jsx)(r.Input,{label:"Schema name",layout:"vertical",type:"text",error:u?.name,value:p,onChange:e=>h(e.target.value)})})})})},"SchemaEditor")}])},572261,(e,t,s)=>{var a=e.r(632981);t.exports=function(e,t){return a(t,function(t){return e[t]})}},812734,(e,t,s)=>{var a=e.r(572261),r=e.r(588159);t.exports=function(e){return null==e?[]:a(e,r(e))}},702454,(e,t,s)=>{var a=e.r(737688),r=e.r(140023),n=e.r(792252),i=e.r(472560),o=e.r(812734),l=Math.max;t.exports=function(e,t,s,c){e=r(e)?e:o(e),s=s&&!c?i(s):0;var d=e.length;return s<0&&(s=l(d+s,0)),n(e)?s<=d&&e.indexOf(t,s)>-1:!!d&&a(e,t,s)>-1}},721329,(e,t,s)=>{t.exports=function(e){return null===e}},350046,e=>{"use strict";var t=e.i(478902),s=e.i(224521),a=e.i(88816),r=e.i(389959),n=e.i(843778);let i=s.Root,o=r.forwardRef(({className:e,...a},r)=>(0,t.jsx)(s.Item,{ref:r,className:(0,n.cn)("border-b",e),...a}));o.displayName="AccordionItem";let l=r.forwardRef(({className:e,children:r,hideIcon:i,...o},l)=>(0,t.jsx)(s.Header,{className:"flex",children:(0,t.jsxs)(s.Trigger,{ref:l,className:(0,n.cn)("flex flex-1 gap-2 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-left",e),...o,children:[r,!i&&(0,t.jsx)(a.ChevronDown,{className:"h-4 w-4 transition-transform duration-200 shrink-0"})]})}));l.displayName=s.Trigger.displayName;let c=r.forwardRef(({className:e,children:a,...r},i)=>(0,t.jsx)(s.Content,{ref:i,className:(0,n.cn)("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",e),...r,children:(0,t.jsx)("div",{className:"pb-4 pt-0",children:a})}));c.displayName=s.Content.displayName,e.s(["Accordion",()=>i,"AccordionContent",()=>c,"AccordionItem",()=>o,"AccordionTrigger",()=>l])},31227,154225,e=>{"use strict";var t=e.i(350046);e.s(["AccordionContent_Shadcn_",()=>t.AccordionContent],31227),e.s(["AccordionItem_Shadcn_",()=>t.AccordionItem],154225)},350341,e=>{"use strict";var t=e.i(350046);e.s(["Accordion_Shadcn_",()=>t.Accordion])},197187,e=>{"use strict";let t=(0,e.i(388019).default)("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);e.s(["default",()=>t])},181827,e=>{"use strict";var t=e.i(478902),s=e.i(156054);e.s(["MonacoEditor",0,({width:e,height:a,value:r,language:n,readOnly:i=!1,onChange:o,onMount:l})=>(0,t.jsx)(s.default,{width:e,height:a||"200px",theme:"supabase",wrapperProps:{className:"grid-monaco-editor-container"},className:"grid-monaco-editor",defaultLanguage:n||"plaintext",defaultValue:r,onChange:o,onMount:function(e){e.changeViewZones(e=>{e.addZone({afterLineNumber:0,heightInPx:4,domNode:document.createElement("div")})});let t=e.getModel().getPositionAt(r?.length);e.setPosition(t),setTimeout(()=>{e?.focus()},0),l&&l(e)},options:{readOnly:i,tabSize:2,fontSize:13,minimap:{enabled:!1},glyphMargin:!1,folding:!1,lineNumbers:"off",lineNumbersMinChars:0,scrollBeyondLastLine:!1,wordWrap:"on",unusualLineTerminators:"off"}})])},999918,e=>{"use strict";let t=(0,e.i(388019).default)("ShieldOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",key:"1jlk70"}],["path",{d:"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",key:"18rp1v"}]]);e.s(["ShieldOff",()=>t],999918)},818135,e=>{"use strict";e.s(["privilegeKeys",0,{tablePrivilegesList:e=>["projects",e,"database","table-privileges"],columnPrivilegesList:e=>["projects",e,"database","column-privileges"],exposedTablesInfinite:(e,t)=>["projects",e,"privileges","exposed-tables-infinite",...t?[{search:t}]:[]],exposedTableCounts:(e,t)=>["projects",e,"privileges","exposed-table-counts",...t],exposedFunctionsInfinite:(e,t)=>["projects",e,"privileges","exposed-functions-infinite",...t?[{search:t}]:[]],exposedFunctionCounts:(e,t)=>["projects",e,"privileges","exposed-function-counts",...t]}])},972089,e=>{"use strict";var t=e.i(850036),s=e.i(242882),a=e.i(714403),r=e.i(818135);let n=t.default.tablePrivileges.list();async function i({projectRef:e,connectionString:t},s){let{result:r}=await (0,a.executeSql)({projectRef:e,connectionString:t,sql:n.sql,queryKey:["table-privileges"]},s);return r}function o(e,t){return e.invalidateQueries({queryKey:r.privilegeKeys.tablePrivilegesList(t)})}e.s(["invalidateTablePrivilegesQuery",()=>o,"useTablePrivilegesQuery",0,({projectRef:e,connectionString:t},{enabled:a=!0,...n}={})=>(0,s.useQuery)({queryKey:r.privilegeKeys.tablePrivilegesList(e),queryFn:({signal:s})=>i({projectRef:e,connectionString:t},s),enabled:a&&void 0!==e,...n})])},102703,e=>{"use strict";var t=e.i(478902),s=e.i(17203),a=e.i(180148),r=e.i(699879),n=e.i(896088),i=e.i(389959),o=e.i(837710);let l=(0,i.forwardRef)(({icon:e,title:l,description:c,url:d,urlLabel:u="Read more",defaultVisibility:m=!1,hideCollapse:p=!1,button:h,className:f="",block:_=!1},y)=>{let[x,g]=(0,i.useState)(m);return(0,t.jsx)("div",{ref:y,role:"alert",className:`${_?"block w-full":""}
      block w-full rounded-md border bg-surface-300/25 py-3 ${f}`,children:(0,t.jsxs)("div",{className:"flex flex-col px-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex w-full space-x-3 items-center",children:[e&&(0,t.jsx)("span",{className:"text-foreground-lighter",children:e}),(0,t.jsx)("div",{className:"flex-grow",children:(0,t.jsx)("h5",{className:"text-foreground",children:l})})]}),c&&!p?(0,t.jsx)("div",{className:"cursor-pointer text-foreground-lighter",onClick:()=>g(!x),children:x?(0,t.jsx)(r.Minimize2,{size:14,strokeWidth:1.5}):(0,t.jsx)(a.Maximize2,{size:14,strokeWidth:1.5})}):null]}),(c||d||h)&&(0,t.jsxs)("div",{className:`flex flex-col space-y-3 overflow-hidden transition-all ${x?"mt-3":""}`,style:{maxHeight:500*!!x},children:[(0,t.jsx)("div",{className:"text-foreground-light text-sm",children:c}),d&&(0,t.jsx)("div",{children:(0,t.jsx)(o.Button,{asChild:!0,type:"default",icon:(0,t.jsx)(s.ExternalLink,{}),children:(0,t.jsx)(n.default,{href:d,target:"_blank",rel:"noreferrer",children:u})})}),h&&(0,t.jsx)("div",{children:h})]})]})})});l.displayName="InformationBox",e.s(["default",0,l])},580984,e=>{"use strict";var t=e.i(761755),s=e.i(10429);e.s(["useDataApiGrantTogglesEnabled",0,()=>{let e=(0,t.usePHFlag)("tableEditorApiAccessToggle");return!!s.IS_TEST_ENV||!!e}])},170286,(e,t,s)=>{e.e,t.exports=function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,a=/\d\d/,r=/\d\d?/,n=/\d*[^-_:/,()\s\d]+/,i={},o=function(e){return(e*=1)+(e>68?1900:2e3)},l=function(e){return function(t){this[e]=+t}},c=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e||"Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),s=60*t[1]+(+t[2]||0);return 0===s?0:"+"===t[0]?-s:s}(e)}],d=function(e){var t=i[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var s,a=i.meridiem;if(a){for(var r=1;r<=24;r+=1)if(e.indexOf(a(r,0,t))>-1){s=r>12;break}}else s=e===(t?"pm":"PM");return s},m={A:[n,function(e){this.afternoon=u(e,!1)}],a:[n,function(e){this.afternoon=u(e,!0)}],Q:[s,function(e){this.month=3*(e-1)+1}],S:[s,function(e){this.milliseconds=100*e}],SS:[a,function(e){this.milliseconds=10*e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,l("seconds")],ss:[r,l("seconds")],m:[r,l("minutes")],mm:[r,l("minutes")],H:[r,l("hours")],h:[r,l("hours")],HH:[r,l("hours")],hh:[r,l("hours")],D:[r,l("day")],DD:[a,l("day")],Do:[n,function(e){var t=i.ordinal,s=e.match(/\d+/);if(this.day=s[0],t)for(var a=1;a<=31;a+=1)t(a).replace(/\[|\]/g,"")===e&&(this.day=a)}],w:[r,l("week")],ww:[a,l("week")],M:[r,l("month")],MM:[a,l("month")],MMM:[n,function(e){var t=d("months"),s=(d("monthsShort")||t.map(function(e){return e.slice(0,3)})).indexOf(e)+1;if(s<1)throw Error();this.month=s%12||s}],MMMM:[n,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw Error();this.month=t%12||t}],Y:[/[+-]?\d+/,l("year")],YY:[a,function(e){this.year=o(e)}],YYYY:[/\d{4}/,l("year")],Z:c,ZZ:c};return function(s,a,r){r.p.customParseFormat=!0,s&&s.parseTwoDigitYear&&(o=s.parseTwoDigitYear);var n=a.prototype,l=n.parse;n.parse=function(s){var a=s.date,n=s.utc,o=s.args;this.$u=n;var c=o[1];if("string"==typeof c){var d=!0===o[2],u=!0===o[3],p=o[2];u&&(p=o[2]),i=this.$locale(),!d&&p&&(i=r.Ls[p]),this.$d=function(s,a,r,n){try{if(["x","X"].indexOf(a)>-1)return new Date(("X"===a?1e3:1)*s);var o=(function(s){var a,r;a=s,r=i&&i.formats;for(var n=(s=a.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,s,a){var n=a&&a.toUpperCase();return s||r[a]||e[a]||r[n].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,s){return t||s.slice(1)})})).match(t),o=n.length,l=0;l<o;l+=1){var c=n[l],d=m[c],u=d&&d[0],p=d&&d[1];n[l]=p?{regex:u,parser:p}:c.replace(/^\[|\]$/g,"")}return function(e){for(var t={},s=0,a=0;s<o;s+=1){var r=n[s];if("string"==typeof r)a+=r.length;else{var i=r.regex,l=r.parser,c=e.slice(a),d=i.exec(c)[0];l.call(t,d),e=e.replace(d,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var s=e.hours;t?s<12&&(e.hours+=12):12===s&&(e.hours=0),delete e.afternoon}}(t),t}})(a)(s),l=o.year,c=o.month,d=o.day,u=o.hours,p=o.minutes,h=o.seconds,f=o.milliseconds,_=o.zone,y=o.week,x=new Date,g=d||(l||c?1:x.getDate()),b=l||x.getFullYear(),v=0;l&&!c||(v=c>0?c-1:x.getMonth());var j,S=u||0,w=p||0,E=h||0,N=f||0;return _?new Date(Date.UTC(b,v,g,S,w,E,N+60*_.offset*1e3)):r?new Date(Date.UTC(b,v,g,S,w,E,N)):(j=new Date(b,v,g,S,w,E,N),y&&(j=n(j).week(y).toDate()),j)}catch(e){return new Date("")}}(a,c,n,r),this.init(),p&&!0!==p&&(this.$L=this.locale(p).$L),(d||u)&&a!=this.format(c)&&(this.$d=new Date("")),i={}}else if(c instanceof Array)for(var h=c.length,f=1;f<=h;f+=1){o[1]=c[f-1];var _=r.apply(this,o);if(_.isValid()){this.$d=_.$d,this.$L=_.$L,this.init();break}f===h&&(this.$d=new Date(""))}else l.call(this,s)}}}()},457065,e=>{"use strict";var t=e.i(478902),s=e.i(585102),a=e.i(389959),r=e.i(753515),n=e.i(938933),i=e.i(140449);e.s(["default",0,function({disabled:e,id:o="",name:l="",layout:c="flex",error:d,descriptionText:u,label:m,afterLabel:p,beforeLabel:h,labelOptional:f,onChange:_,onBlur:y,defaultChecked:x,checked:g,className:b,align:v="left",size:j="medium",validation:S,labelLayout:w,...E}){let N=(0,n.default)("toggle"),{formContextOnChange:T,values:A,errors:q,handleBlur:C,touched:R,fieldLevelValidation:k}=(0,i.useFormContext)();A&&!g&&(g=A[o||l]);let[P,I]=(0,a.useState)((x||g)??!1),O=g??P;(0,a.useEffect)(()=>{I(O)},[]),d||(q&&!d&&(d=q[o||l]),d=R&&R[o||l]?d:void 0);let L=[N.base,N.handle_container[j]];O&&L.push(N.active);let M=[N.handle.base,N.handle[j]];return O&&M.push(N.handle_active[j]),(0,t.jsx)(r.FormLayout,{className:b,label:m,afterLabel:p,beforeLabel:h,labelOptional:f,layout:c,id:o,error:d,align:v,descriptionText:u,size:j,labelLayout:w,nonBoxInput:!0,children:(0,t.jsx)("button",{type:"button",id:o,name:l,className:(0,s.default)(...L,e&&"opacity-50 cursor-default"),onClick:function(){_&&_(!O),I(!P);let e={};e.target={type:"checkbox",name:l,id:o,value:!O,checked:!O},T&&T(e),S&&k(o,S(!P))},disabled:e,onBlur:function(e){setTimeout(()=>{C&&C(e)},100),y&&y(e)},...E,children:(0,t.jsx)("span",{"aria-hidden":"true",className:M.join(" ")})})})}])},905596,e=>{"use strict";var t=e.i(457065);e.s(["Toggle",()=>t.default])},101369,e=>{"use strict";var t=e.i(478902),s=e.i(843778);let a=({max:e=100,value:a=0,barClass:r="bg-foreground",bgClass:n="",type:i="vertical",borderClass:o="",labelBottom:l="",labelBottomClass:c="tabular-nums",labelTop:d="",labelTopClass:u=""})=>{if("horizontal"===i){let i=Number(a/e*100),m=`${i}%`,p=l||d;return(0,t.jsxs)("div",{className:"flex flex-col w-full",children:[p&&(0,t.jsxs)("div",{className:"flex align-baseline justify-between pb-1 space-x-8",children:[(0,t.jsx)("p",{className:(0,s.cn)("text-foreground text-sm truncate capitalize-sentence",d.length>0&&"max-w-[75%]",c),children:l}),(0,t.jsx)("p",{className:(0,s.cn)("text-foreground-light text-sm",u),children:d})]}),(0,t.jsx)("div",{className:`relative rounded h-1 overflow-hidden w-full border p-0 ${n||"bg-surface-400"} ${o||"border-none"}`,children:(0,t.jsx)("div",{className:`absolute rounded inset-x-0 bottom-0 h-1 ${r} transition-all`,style:{width:m}})})]})}{let s=Number(a/e*35);return s<2&&(s=2),(0,t.jsx)("div",{className:`relative rounded w-5 overflow-hidden border p-1 ${n||"bg-gray-400"} ${o||"border-none"}`,style:{height:35},children:(0,t.jsx)("div",{className:`absolute inset-x-0 bottom-0 w-5 ${r}`,style:{height:s}})})}};e.s(["SparkBar",0,a,"default",0,a])},321605,25912,e=>{"use strict";var t=e.i(248593),s=e.i(242882),a=e.i(234745);let r={list:e=>["projects",e,"database-publications"]};async function n({projectRef:e,connectionString:s},r){if(!e)throw Error("projectRef is required");let n=new Headers;s&&n.set("x-connection-encrypted",s);let{data:i,error:o}=await (0,a.get)("/platform/pg-meta/{ref}/publications",{params:{header:{"x-connection-encrypted":s,"x-pg-application-name":t.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e}},headers:n,signal:r});return o&&(0,a.handleError)(o),i}e.s(["databasePublicationsKeys",0,r],25912),e.s(["useDatabasePublicationsQuery",0,({projectRef:e,connectionString:t},{enabled:a=!0,...i}={})=>(0,s.useQuery)({queryKey:r.list(e),queryFn:({signal:s})=>n({projectRef:e,connectionString:t},s),enabled:a&&void 0!==e,...i})],321605)},587768,e=>{"use strict";var t=e.i(850036),s=e.i(38429),a=e.i(356003),r=e.i(355901),n=e.i(714403),i=e.i(25912);async function o({projectRef:e,connectionString:s,id:a,tables:r,publish_insert:i,publish_update:o,publish_delete:l,publish_truncate:c}){let{sql:d}=t.default.publications.update(a,{tables:r,publish_insert:i,publish_update:o,publish_delete:l,publish_truncate:c}),{result:u}=await (0,n.executeSql)({projectRef:e,connectionString:s,sql:d,queryKey:["publication","update",a]});return u}e.s(["useDatabasePublicationUpdateMutation",0,({onSuccess:e,onError:t,...n}={})=>{let l=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>o(e),async onSuccess(t,s,a){let{projectRef:r}=s;await l.invalidateQueries({queryKey:i.databasePublicationsKeys.list(r)}),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to update database publication: ${e.message}`):t(e,s,a)},...n})}])},138658,e=>{"use strict";e.s(["tableKeys",0,{list:(e,t,s)=>["projects",e,"tables",t,s].filter(Boolean),retrieve:(e,t,s)=>["projects",e,"table",s,t].filter(Boolean),rolesAccess:(e,t)=>["projects",e,"roles-access",{schema:t}]}])},738196,e=>{"use strict";var t=e.i(242882),s=e.i(356003),a=e.i(339098),r=e.i(389959),n=e.i(248593),i=e.i(234745),o=e.i(138658);async function l({projectRef:e,connectionString:t,schema:s,includeColumns:r=!1,sortByProperty:o="name"},l){if(!e)throw Error("projectRef is required");let c=new Headers;t&&c.set("x-connection-encrypted",t);let d={include_columns:`${r}`};s&&(d.included_schemas=s);let{data:u,error:m}=await (0,i.get)("/platform/pg-meta/{ref}/tables",{params:{header:{"x-connection-encrypted":t,"x-pg-application-name":n.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e},query:d},headers:c,signal:l});return(!Array.isArray(u)&&m&&(0,i.handleError)(m),Array.isArray(u)&&o)?(0,a.default)(u,e=>e[o]):u}function c({projectRef:e,connectionString:t}){let a=(0,s.useQueryClient)();return(0,r.useCallback)((s,r)=>a.prefetchQuery({queryKey:o.tableKeys.list(e,s,r),queryFn:({signal:a})=>l({projectRef:e,connectionString:t,schema:s,includeColumns:r},a)}),[t,e,a])}e.s(["getTables",()=>l,"usePrefetchTables",()=>c,"useTablesQuery",0,({projectRef:e,connectionString:s,schema:a,includeColumns:r},{enabled:n=!0,...i}={})=>(0,t.useQuery)({queryKey:o.tableKeys.list(e,a,r),queryFn:({signal:t})=>l({projectRef:e,connectionString:s,schema:a,includeColumns:r},t),enabled:n&&void 0!==e,...i})])},938343,e=>{"use strict";e.s(["tableEditorKeys",0,{tableEditor:(e,t)=>["projects",e,"table-editor",t].filter(Boolean)}])},847278,e=>{"use strict";var t=e.i(850036),s=e.i(38429),a=e.i(356003),r=e.i(355901),n=e.i(915993),i=e.i(714403),o=e.i(938343),l=e.i(138658);async function c({projectRef:e,connectionString:s,id:a,name:r,schema:n,payload:o}){let{sql:l}=t.default.tables.update({id:a,name:r,schema:n},o),{result:c}=await (0,i.executeSql)({projectRef:e,connectionString:s,sql:l,queryKey:["table","update",a]});return c}e.s(["updateTable",()=>c,"useTableUpdateMutation",0,({onSuccess:e,onError:t,...i}={})=>{let d=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>c(e),async onSuccess(t,s,a){let{projectRef:r,schema:i,id:c}=s;await Promise.all([d.invalidateQueries({queryKey:o.tableEditorKeys.tableEditor(r,c)}),d.invalidateQueries({queryKey:l.tableKeys.list(r,i)}),d.invalidateQueries({queryKey:n.lintKeys.lint(r)})]),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to update database table: ${e.message}`):t(e,s,a)},...i})}])},509847,e=>{"use strict";e.s(["databasePoliciesKeys",0,{list:(e,t)=>["projects",e,"database-policies",t].filter(Boolean)}])},495486,e=>{"use strict";let t=(0,e.i(388019).default)("Table",[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]]);e.s(["Table",()=>t],495486)},180141,e=>{"use strict";function t(e){return e}e.s(["queryOptions",()=>t])},415190,e=>{"use strict";var t=e.i(180141),s=e.i(242882),a=e.i(714403),r=e.i(938343),n=e.i(305015);async function i({projectRef:e,connectionString:t,id:s},r){if(!s)throw Error("id is required");let i=s?(0,n.default)(`
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${s}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', case
                    when t.typtype = 'e' then
                        case
                            when nt.nspname <> 'public' then concat(nt.nspname, '.', coalesce(bt.typname, t.typname))
                            else coalesce(bt.typname, t.typname)
                        end
                    else
                        coalesce(bt.typname, t.typname)
                end,
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `):"",{result:o}=await (0,a.executeSql)({projectRef:e,connectionString:t,sql:i,queryKey:["table-editor",s]},r);return o[0]?.entity??null}function o(e,{projectRef:t,connectionString:s,id:a}){return e.fetchQuery(l({projectRef:t,connectionString:s,id:a}))}let l=({projectRef:e,connectionString:s,id:a})=>(0,t.queryOptions)({queryKey:r.tableEditorKeys.tableEditor(e,a),queryFn:({signal:t})=>i({projectRef:e,connectionString:s,id:a},t)});e.s(["getTableEditor",()=>i,"prefetchTableEditor",()=>o,"tableEditorQueryOptions",0,l,"useTableEditorQuery",0,({projectRef:e,connectionString:t,id:a},{enabled:r=!0,...n}={})=>(0,s.useQuery)({...l({projectRef:e,connectionString:t,id:a}),enabled:r&&void 0!==e&&void 0!==a&&!isNaN(a),refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:3e5,...n})],415190)},46974,585673,e=>{"use strict";let t=["smallint","integer","bigint","decimal","numeric","real","double precision","serial","bigserial","int2","int4","int8","float4","float8","smallserial","serial2","serial4","serial8"];function s(e){return t.indexOf(e.toLowerCase())>-1}let a=["json","jsonb","array"];function r(e){return a.indexOf(e.toLowerCase())>-1}let n=["array"];function i(e){return n.indexOf(e.toLowerCase())>-1}let o=["uuid","text","character varying"];function l(e){return o.indexOf(e.toLowerCase())>-1}let c=["citext"];function d(e){return c.indexOf(e.toLowerCase())>-1}let u=["timestamp","timestamptz"];function m(e){return u.indexOf(e.toLowerCase())>-1}let p=["date"];function h(e){return p.indexOf(e.toLowerCase())>-1}let f=["time","timetz"];function _(e){return f.indexOf(e.toLowerCase())>-1}let y=["boolean","bool"];function x(e){return y.indexOf(e.toLowerCase())>-1}let g=["user-defined"];function b(e){return g.indexOf(e.toLowerCase())>-1}let v=["bytea"];function j(e){return v.indexOf(e.toLowerCase())>-1}function S(e){let{targetTableSchema:t,targetTableName:s,targetColumnName:a}=e?.foreignKey??{};return!!t&&!!s&&!!a}e.s(["isArrayColumn",()=>i,"isBinaryColumn",()=>j,"isBoolColumn",()=>x,"isCiTextColumn",()=>d,"isDateColumn",()=>h,"isDateTimeColumn",()=>m,"isEnumColumn",()=>b,"isForeignKeyColumn",()=>S,"isJsonColumn",()=>r,"isNumericalColumn",()=>s,"isTextColumn",()=>l,"isTimeColumn",()=>_],585673);var w=e.i(962217);function E(e,t){let a=e.columns.find(e=>e.name==t.column);if(a&&s(a.format)){let e=Number(t.value);if(!Number.isNaN(e)&&!(e>Number.MAX_SAFE_INTEGER))return Number(t.value)}return t.value}function N({table:e}){if(!(0,w.isTableLike)(e))return{error:{message:"Only table rows can be updated or deleted"}};let t=e.primary_keys;return t&&0!=t.length?{primaryKeys:t.map(e=>e.name)}:{error:{message:"Please add a primary key column to your table to update or delete rows"}}}e.s(["formatFilterValue",()=>E,"getPrimaryKeys",()=>N],46974)},310959,e=>{"use strict";var t=e.i(479084),s=e.i(721490);let a=10240,r=50,n=["text","varchar","char","character varying","character"],i=["json","jsonb"],o=new Set(i),l=new Set([...n,...i,"bytea","xml","hstore","clob","vector","geometry","geography","tsvector","tsquery","daterange","tsrange","tstzrange","numrange","int4range","int8range","cube","ltree","lquery","jsonpath","citext"]);e.s(["MAX_ARRAY_SIZE",0,r,"MAX_CHARACTERS",0,a,"THRESHOLD_COUNT",0,1e5,"getTableRowsSql",0,({table:e,filters:i=[],sorts:c=[],page:d,limit:u,maxCharacters:m=a,maxArraySize:p=r,sortExcludedColumns:h=[]})=>{if(!e||!e.columns)return"";let f=new s.Query().from(e.name,e.schema).select();i.forEach(t=>{let s=e.columns?.find(e=>e.name===t.column),a=!s||n.includes(s.format);f=f.filter(t.column,t.operator,a||""!==t.value?t.value:null)});let _=e.live_rows_estimate||0;if(0===c.length&&_<=1e5&&e.columns.length>0){let t=((e,{excludedColumns:t=[]}={})=>{let s=e.primary_keys?.map(e=>e.name);if(s&&s.length>0&&!s.every(e=>t.includes(e)))return s;if(e.columns&&e.columns.length>0){let s=e.columns.filter(e=>!e.data_type.includes("json")&&!t.includes(e.name));if(s.length>0)return[s[0].name]}return[]})(e,{excludedColumns:h});t.length>0&&t.forEach(t=>{f=f.order(e.name,t)})}else c.forEach(e=>{f=f.order(e.table,e.column,e.ascending,e.nullsFirst)});let{from:y,to:x}=function(e,t=100){let s=e?e*t:0;return{from:s,to:e?s+t-1:t-1}}((d??1)-1,u),g=`with _base_query as (${f.range(y,x).toSql({isCTE:!1,isFinal:!1})})`,b=e.columns.sort((e,t)=>e.ordinal_position-t.ordinal_position).map(e=>({name:e.name,format:e.format.toLowerCase()})),v=e.columns.filter(e=>{let t;return t=e.format,l.has(t.toLowerCase())}).map(e=>e.name),j=b.map(({name:e})=>{let s=(0,t.ident)(e);return v.includes(e)?`case
        when octet_length(${s}::text) > ${m} 
        then left(${s}::text, ${m}) || '...'
        else ${s}::text
      end as ${s}`:s});e.columns.filter(e=>"array"===e.data_type.toLowerCase()).map(e=>({name:e.name,format:e.format.toLowerCase().slice(1)})).forEach(({name:e,format:s})=>{let a=j.findIndex(s=>s===(0,t.ident)(e)),r=o.has(s)?`${s}[]`:"text[]";a>=0&&(j[a]=`
        case 
          when octet_length(${(0,t.ident)(e)}::text) > ${m} 
          then
            case
              when array_ndims(${(0,t.ident)(e)}) = 1
              then
                (select array_cat(${(0,t.ident)(e)}[1:${p}]::${r}, ${"text[]"===r?"array['...']":"array['{\"truncated\": true}'::json]"}::${r}))::${r}
              else
                ${(0,t.ident)(e)}[1:${p}]::${r}
            end
          else ${(0,t.ident)(e)}::${r}
        end
      `)});let S=j.join(","),w=new s.Query().from("_base_query").select(S);return`${g}
  ${w.toSql({isCTE:!0,isFinal:!0})}`}])},941381,70756,e=>{"use strict";var t=e.i(478902),s=e.i(356003),a=e.i(19583),r=e.i(415190);e.i(967533);var n=e.i(721490),i=e.i(310959),o=e.i(242882);e.i(128328);var l=e.i(86086),c=e.i(311827),d=e.i(962217),u=e.i(908937),m=e.i(201461);e.i(56031);var p=e.i(237948),h=e.i(234745),f=e.i(150671),_=e.i(714403),y=e.i(790819),x=e.i(46974),g=e.i(48189);async function b(e,t=3,s=1e3){for(let a=0;a<=t;a++)try{return await e()}catch(e){if(429===(e instanceof p.ResponseError?e.code:e.status)&&a<t){let t=function(e){if(e instanceof p.ResponseError)return e.retryAfter;let t=e.headers?.get("retry-after");if(t)return parseInt(t)}(e),r=t?1e3*t:s*Math.pow(2,a);await (0,g.timeout)(r);continue}throw e}throw Error("Max retries reached without success")}let v=({table:e,filters:t=[],sorts:s=[]})=>{let a,r,i,o,l,d=new n.Query,u=e.columns.filter(e=>(e?.enum??[]).length>0&&"array"===e.dataType.toLowerCase()).map(e=>`"${e.name}"::text[]`),m=d.from(e.name,e.schema??void 0).select(u.length>0?`*,${u.join(",")}`:"*");t.filter(e=>e.value&&""!==e.value).forEach(t=>{let s=(0,x.formatFilterValue)(e,t);m=m.filter(t.column,t.operator,s)});let p=!1,{cursorPaginationEligible:h,cursorPaginationNonEligible:f}=(a=[],r=[],(i=e.primaryKey)&&a.push(i),o=e.uniqueIndexes,(l=o?.filter(t=>t.every(t=>{let s=e.columns.find(e=>e.name===t);return!!s&&!s.isNullable})))&&a.push(...l),r.push(...e.columns.filter(e=>!e.dataType.includes("json")).map(e=>e.name)),{cursorPaginationEligible:a,cursorPaginationNonEligible:r}),_=e.type===c.ENTITY_TYPE.TABLE||e.type===c.ENTITY_TYPE.PARTITIONED_TABLE||e.type===c.ENTITY_TYPE.MATERIALIZED_VIEW;if(0===s.length)h.length>0?(p=h[0],h[0].forEach(t=>{m=m.order(e.name,t)})):(f.length>0&&(m=m.order(e.name,f[0])),_&&(m=m.order(e.name,"ctid")));else{s.forEach(e=>{m=m.order(e.table,e.column,e.ascending,e.nullsFirst)});let t=h[0];if(t){let a=new Set(s.filter(t=>t.table===e.name).map(e=>e.column));t.filter(e=>!a.has(e)).forEach(t=>{m=m.order(e.name,t)})}else _&&(m=m.order(e.name,"ctid"))}return{sql:m,cursorColumns:p}},j=async({projectRef:e,connectionString:t,table:s,filters:a=[],sorts:r=[],roleImpersonationState:n,progressCallback:i})=>{if(l.IS_PLATFORM&&!t)return console.error("Connection string is required"),[];let o=[],{sql:c,cursorColumns:d}=v({table:s,sorts:r,filters:a});if(d){let s=null;for(;;){let a=c.clone();s&&(a=a.filter(d,">",d.map(e=>s[e])));let r=(0,u.wrapWithRoleImpersonation)(a.range(0,499).toSql(),n);try{let{result:a}=await b(async()=>(0,_.executeSql)({projectRef:e,connectionString:t,sql:r}));for(let e of(o.push(...a),i?.(o.length),s={},d))s[e]=a[a.length-1]?.[e];if(a.length<500)break;await (0,g.timeout)(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}else{let s=-1;for(;;){let a=500*(s+=1),r=(s+1)*500-1,l=(0,u.wrapWithRoleImpersonation)(c.range(a,r).toSql(),n);try{let{result:s}=await b(async()=>(0,_.executeSql)({projectRef:e,connectionString:t,sql:l}));if(o.push(...s),i?.(o.length),s.length<500)break;await (0,g.timeout)(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}return o.filter(e=>1!==e[u.ROLE_IMPERSONATION_NO_RESULTS])};async function S({queryClient:e,projectRef:t,connectionString:s,tableId:n,roleImpersonationState:o,filters:l,sorts:c,limit:p,page:f,preflightCheck:y=!1},x){let g=await (0,r.prefetchTableEditor)(e,{projectRef:t,connectionString:s,id:n});if(!g)throw Error("Table not found");let b=(0,a.parseSupaTable)(g),v=l?.filter(e=>"="===e.operator||"is"===e.operator).flatMap(e=>e.column),j=(0,d.isMsSqlForeignTable)(g)?Array.from(new Set(v)):void 0,S=(0,u.wrapWithRoleImpersonation)((0,i.getTableRowsSql)({table:g,filters:l,sorts:c,limit:p,page:f,sortExcludedColumns:j}),o);try{let{result:e}=await (0,_.executeSql)({projectRef:t,connectionString:s,sql:S,queryKey:["table-rows",b?.id],isRoleImpersonationEnabled:(0,m.isRoleImpersonationEnabled)(o?.role),preflightCheck:y},x);return{rows:e.map((e,t)=>({idx:t,...e}))}}catch(e){throw(0,h.handleError)(e)}}function w(e,{projectRef:t,connectionString:s,tableId:a,...r}){return e.fetchQuery({queryKey:y.tableRowKeys.tableRows(t,{table:{id:a},connectionString:s,...r}),queryFn:({signal:n})=>S({queryClient:e,projectRef:t,connectionString:s,tableId:a,...r},n)})}e.s(["executeWithRetry",()=>b,"fetchAllTableRows",0,j,"getAllTableRowsSql",0,v,"prefetchTableRows",()=>w,"useTableRowsQuery",0,({projectRef:e,connectionString:t,tableId:a,...r},{enabled:n=!0,...i}={})=>{let c=(0,s.useQueryClient)(),{connectionString:d}=(0,f.useConnectionStringForReadOps)(),u=t||d,{preflightCheck:m,...p}=r;return(0,o.useQuery)({queryKey:y.tableRowKeys.tableRows(e,{table:{id:a},connectionString:u,...p}),queryFn:({signal:t})=>S({queryClient:c,projectRef:e,connectionString:u,tableId:a,...r},t),enabled:n&&void 0!==e&&void 0!==a&&(!l.IS_PLATFORM||void 0!==u),...i})}],70756);var E=e.i(635494),N=e.i(435798),T=e.i(389959),A=e.i(636047),q=e.i(85626);function C({queryClient:e,projectRef:t,connectionString:s,id:n,sorts:i,filters:o,roleImpersonationState:l}){return(0,r.prefetchTableEditor)(e,{projectRef:t,connectionString:s,id:n}).then(r=>{if(r){let c=(0,a.parseSupaTable)(r),{sorts:d=[],filters:u=[]}=(0,a.loadTableEditorStateFromLocalStorage)(t,r.id)??{};w(e,{projectRef:t,connectionString:s,tableId:n,sorts:i??(0,a.formatSortURLParams)(c.name,d),filters:o??(0,a.formatFilterURLParams)(u),page:1,limit:A.TABLE_EDITOR_DEFAULT_ROWS_PER_PAGE,roleImpersonationState:l})}})}function R(){let e=(0,N.useRouter)(),t=(0,s.useQueryClient)(),{data:a}=(0,E.useSelectedProjectQuery)(),{connectionString:r}=(0,f.useConnectionStringForReadOps)(),n=(0,m.useRoleImpersonationStateSnapshot)();return(0,T.useCallback)(({id:s,filters:i,sorts:o})=>{let l=s?Number(s):void 0;!a||!l||isNaN(l)||(e.prefetch(`/project/${a.ref}/editor/${l}`),C({queryClient:t,projectRef:a.ref,connectionString:r,id:l,sorts:o,filters:i,roleImpersonationState:n}).catch(()=>{}))},[r,a,t,n,e])}function k({projectRef:e,id:s,sorts:a,filters:r,href:n,children:i,...o}){let l=R();return(0,t.jsx)(q.default,{href:n||`/project/${e}/editor/${s}`,prefetcher:()=>l({id:s,sorts:a,filters:r}),...o,children:i})}e.s(["EditorTablePageLink",()=>k,"prefetchEditorTablePage",()=>C,"usePrefetchEditorTablePage",()=>R],941381)},245049,e=>{"use strict";var t=e.i(478902),s=e.i(954541),a=e.i(975924),r=e.i(938933);function n({align:e="center",ariaLabel:a,arrow:n=!1,children:i,className:o,defaultOpen:l=!1,modal:c,onOpenChange:d,open:u,overlay:m,side:p="bottom",sideOffset:h=6,style:f,header:_,footer:y,size:x="content",disabled:g,"data-testid":b}){let v=(0,r.default)("popover"),j=[v.content,v.size[x]];return o&&j.push(o),(0,t.jsxs)(s.Root,{defaultOpen:l,modal:c,onOpenChange:d,open:u,children:[(0,t.jsx)(s.Trigger,{disabled:g,className:v.trigger,"aria-label":a,"data-testid":b,children:i}),(0,t.jsx)(s.Portal,{children:(0,t.jsxs)(s.Content,{sideOffset:h,side:p,align:e,className:j.join(" "),style:f,children:[n&&(0,t.jsx)(s.Arrow,{offset:10}),_&&(0,t.jsx)("div",{className:v.header,children:_}),m,y&&(0,t.jsx)("div",{className:v.footer,children:y})]})})]})}n.Separator=function(){let e=(0,r.default)("popover");return(0,t.jsx)("div",{className:e.separator})},n.Close=function(){let e=(0,r.default)("popover");return(0,t.jsx)(s.Close,{className:e.close,children:(0,t.jsx)(a.X,{size:14,strokeWidth:2})})},e.s(["default",0,n])},463783,e=>{"use strict";var t=e.i(245049);e.s(["Popover",()=>t.default])},336908,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(232520);e.s(["DiscardChangesConfirmationDialog",0,({visible:e,onClose:r,onCancel:n,title:i="Unsaved changes",description:o="You have unsaved changes. Are you sure you want to discard them?",confirmLabel:l="Discard changes",cancelLabel:c="Keep editing",size:d="tiny"})=>{let u=(0,s.useRef)(!1);(0,s.useEffect)(()=>{e&&(u.current=!1)},[e]);let m=(0,s.useCallback)(()=>{u.current=!0,r()},[r]),p=(0,s.useCallback)(e=>{if(!e){if(u.current){u.current=!1;return}n()}},[n]);return(0,t.jsx)(a.AlertDialog,{open:e,onOpenChange:p,children:(0,t.jsxs)(a.AlertDialogContent,{size:d,children:[(0,t.jsxs)(a.AlertDialogHeader,{children:[(0,t.jsx)(a.AlertDialogTitle,{children:i}),null!=o&&(0,t.jsx)(a.AlertDialogDescription,{children:o})]}),(0,t.jsxs)(a.AlertDialogFooter,{children:[(0,t.jsx)(a.AlertDialogCancel,{children:c}),(0,t.jsx)(a.AlertDialogAction,{variant:"danger",onClick:m,children:l})]})]})})}])},412385,e=>{"use strict";var t=e.i(389959),s=e.i(323796);e.s(["useConfirmOnClose",0,({checkIsDirty:e,onClose:a})=>{let[r,n]=(0,t.useState)(!1),i=(0,s.default)(e),o=(0,s.default)(a),l=(0,t.useCallback)(()=>{i.current()?n(!0):o.current()},[]),c=(0,t.useCallback)(e=>{e||l()},[l]),d=(0,t.useCallback)(()=>{n(!1),o.current()},[]),u=(0,t.useCallback)(()=>{n(!1)},[]),m=(0,t.useMemo)(()=>({visible:r,onClose:d,onCancel:u}),[r,d,u]);return(0,t.useMemo)(()=>({confirmOnClose:l,handleOpenChange:c,modalProps:m}),[l,c,m])}])},666050,(e,t,s)=>{var a=e.r(37958),r=e.r(650078),n=e.r(663792),i=e.r(413850),o=e.r(140023),l=e.r(127505),c=e.r(599901),d=e.r(374301),u=Object.prototype.hasOwnProperty;t.exports=function(e){if(null==e)return!0;if(o(e)&&(i(e)||"string"==typeof e||"function"==typeof e.splice||l(e)||d(e)||n(e)))return!e.length;var t=r(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(c(e))return!a(e).length;for(var s in e)if(u.call(e,s))return!1;return!0}},723633,(e,t,s)=>{var a=e.r(959472),r=e.r(262523),n=e.r(838959),i=e.r(413850);t.exports=function(){var e=arguments.length;if(!e)return[];for(var t=Array(e-1),s=arguments[0],o=e;o--;)t[o-1]=arguments[o];return a(i(s)?n(s):[s],r(t,1))}},707409,e=>{"use strict";var t=e.i(723633),s=e.i(339098);let a=["int2","int4","int8","float4","float8","numeric","double precision"],r=["json","jsonb"],n=["text","varchar"],i=["timestamp","timestamptz"],o=["date"],l=["time","timetz"],c=(0,t.default)(i,o,l),d=["uuid","bool","vector","bytea"],u=(0,s.default)((0,t.default)(a,r,n,c,d));e.s(["DATETIME_TYPES",0,c,"DATE_TYPES",0,o,"JSON_TYPES",0,r,"NUMERICAL_TYPES",0,a,"OTHER_DATA_TYPES",0,d,"POSTGRES_DATA_TYPES",0,u,"POSTGRES_DATA_TYPE_OPTIONS",0,[{name:"int2",description:"Signed two-byte integer",type:"number"},{name:"int4",description:"Signed four-byte integer",type:"number"},{name:"int8",description:"Signed eight-byte integer",type:"number"},{name:"float4",description:"Single precision floating-point number (4 bytes)",type:"number"},{name:"float8",description:"Double precision floating-point number (8 bytes)",type:"number"},{name:"numeric",description:"Exact numeric of selectable precision",type:"number"},{name:"json",description:"Textual JSON data",type:"json"},{name:"jsonb",description:"Binary JSON data, decomposed",type:"json"},{name:"text",description:"Variable-length character string",type:"text"},{name:"varchar",description:"Variable-length character string",type:"text"},{name:"uuid",description:"Universally unique identifier",type:"text"},{name:"date",description:"Calendar date (year, month, day)",type:"time"},{name:"time",description:"Time of day (no time zone)",type:"time"},{name:"timetz",description:"Time of day, including time zone",type:"time"},{name:"timestamp",description:"Date and time (no time zone)",type:"time"},{name:"timestamptz",description:"Date and time, including time zone",type:"time"},{name:"bool",description:"Logical boolean (true/false)",type:"bool"},{name:"bytea",description:"Variable-length binary string",type:"others"}],"RECOMMENDED_ALTERNATIVE_DATA_TYPE",0,{varchar:{alternative:"text",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_varchar.28n.29_by_default"},json:{alternative:"jsonb",reference:"https://www.postgresql.org/docs/current/datatype-json.html"},timetz:{alternative:"timestamptz",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_timetz"},timestamp:{alternative:"timestamptz",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_timestamp_.28without_time_zone.29"}},"TEXT_TYPES",0,n,"TIMESTAMP_TYPES",0,i,"TIME_TYPES",0,l])},64102,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(843778);let r=()=>(0,t.jsxs)("div",{className:"flex w-full flex-col gap-2",children:[(0,t.jsx)("div",{className:"shimmering-loader h-2 w-1/3 rounded"}),(0,t.jsx)("div",{className:"flex flex-col justify-between space-y-2",children:(0,t.jsx)("div",{className:"shimmering-loader h-[34px] w-2/3 rounded"})})]});e.s(["FormSection",0,({children:e,id:s,header:a,disabled:r,className:n})=>{let i=["grid grid-cols-12 gap-6 px-card py-4 md:py-8",`${r?" opacity-30":" opacity-100"}`,`${n}`];return(0,t.jsxs)("div",{id:s,className:i.join(" "),children:[a,e]})},"FormSectionContent",0,({children:e,loading:a=!0,loaders:n,fullWidth:i,className:o})=>(0,t.jsx)("div",{className:`
        relative col-span-12 flex flex-col gap-6 @lg:col-span-7
        ${i&&"!col-span-12"}
        ${o}
      `,children:a?n?Array(n).fill(0).map((e,s)=>(0,t.jsx)(r,{},s)):s.Children.map(e,(e,s)=>(0,t.jsx)(r,{},s)):e}),"FormSectionLabel",0,({children:e,className:s="",description:r})=>void 0!==r?(0,t.jsxs)("div",{className:(0,a.cn)("flex flex-col space-y-2 col-span-12 lg:col-span-5",s),children:[(0,t.jsx)("label",{className:"text-foreground text-sm",children:e}),r]}):(0,t.jsx)("label",{className:`text-foreground col-span-12 text-sm lg:col-span-5 ${s}`,children:e})])},971687,e=>{"use strict";let t=(0,e.i(388019).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",()=>t],971687)},347373,(e,t,s)=>{var a=e.r(262523);t.exports=function(e){return(null==e?0:e.length)?a(e,1):[]}},984427,e=>{"use strict";var t=e.i(478902),s=e.i(172650),a=e.i(347373),r=e.i(370410),n=e.i(389959),i=e.i(753515),o=e.i(440401),l=e.i(701823),c=e.i(938933),d=e.i(843778),u=e.i(140449);let m=(0,n.createContext)({onChange:e=>{},selected:void 0});function p({children:e,className:r,buttonClassName:p,descriptionText:h,error:f,icon:_,id:y="",name:x="",label:g,labelOptional:b,layout:v,value:j,onChange:S,onFocus:w,onBlur:E,style:N,size:T="medium",defaultValue:A,validation:q,disabled:C,optionsWidth:R}){let[k,P]=(0,n.useState)(void 0),[I,O]=(0,n.useState)({}),L=(0,c.default)("listbox"),M=(0,n.useRef)(null),{formContextOnChange:$,values:D,errors:F,handleBlur:Q,touched:z,fieldLevelValidation:U}=(0,u.useFormContext)();D&&!j&&(j=D[y||x],A=D[y||x]),f||(F&&!f&&(f=F[y||x]),f=z&&z[y||x]?f:void 0),(0,n.useEffect)(()=>{void 0!==j&&P(j)},[j]),(0,n.useEffect)(()=>{function e(){document.documentElement.style.setProperty("--width-listbox",`${R||M.current?.offsetWidth}px`)}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),(0,n.useEffect)(()=>{let t=(0,a.default)(e);function s(e){return t.find(t=>t.props.value===e)}if(j){P(j);let e=s(j);O(e?.props?e.props:void 0);return}if(k){let e=s(k);O(e?.props?e.props:void 0);return}if(!A)return void O(t[0]?.props);{P(A);let e=s(k);O(e?.props?e.props:void 0);return}},[k]);let Y=[L.container,L.base,p],K=[L.addOnBefore];return f&&Y.push(L.variants.error),f||Y.push(L.variants.standard),_&&K.push(L.with_icon[T]),T&&Y.push(L.size[T]),C&&Y.push(L.disabled),(0,t.jsx)(i.FormLayout,{label:g,labelOptional:b,layout:v,id:y,error:f,descriptionText:h,className:r,style:N,size:T,children:(0,t.jsxs)(s.Root,{children:[(0,t.jsx)(s.Trigger,{asChild:!0,disabled:C,children:(0,t.jsxs)("button",{"data-size":T,ref:M,className:(0,d.cn)(Y),onBlur:function(e){Q&&Q(e),E&&E(e)},onFocus:w,name:x,id:y,children:[(0,t.jsxs)("span",{className:(0,d.cn)(K),children:[_&&(0,t.jsx)(l.default,{size:T,icon:_}),I?.addOnBefore&&(0,t.jsx)(I.addOnBefore,{}),(0,t.jsx)("span",{className:L.label,children:I?.label})]}),(0,t.jsx)("span",{className:L.chevron_container,children:(0,t.jsx)("svg",{className:L.chevron,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})})}),f&&(0,t.jsx)("div",{className:L.actions_container,children:f&&(0,t.jsx)(o.default,{size:T})})]})}),(0,t.jsx)(s.Content,{sideOffset:6,loop:!0,side:"bottom",align:"center",className:L.options_container,children:(0,t.jsx)("div",{children:(0,t.jsx)(m.Provider,{value:{onChange:function(e){S&&S(e),P(e);let t={};t.target={type:"select",name:x,id:y,value:e,checked:void 0},$&&$(t),q&&U(y,q(e))},selected:k},children:e})})})]})})}p.Option=function({id:e,value:a,label:n,disabled:i=!1,children:o,className:l="",addOnBefore:u}){let p=(0,c.default)("listbox");return(0,t.jsx)(m.Consumer,{children:({onChange:n,selected:c})=>{let m=c===a;return(0,t.jsxs)(s.Item,{className:(0,d.cn)(p.option,m?p.option_active:" ",i?p.option_disabled:" ",l),onSelect:()=>i?{}:n(a),children:[(0,t.jsxs)("div",{className:p.option_inner,children:[u&&u({active:m,selected:c}),(0,t.jsx)("span",{children:"function"==typeof o?o({active:m,selected:c}):o})]}),m?(0,t.jsx)("span",{className:(0,d.cn)(p.option_check,m?p.option_check_active:""),children:(0,t.jsx)(r.Check,{className:p.option_check_icon,"aria-hidden":"true"})}):null]},e)}})},e.s(["default",0,p],984427)},331077,e=>{"use strict";var t=e.i(984427);e.s(["Listbox",()=>t.default])},680576,e=>{"use strict";var t=e.i(389959),s=e.i(367905);function a(e,a,r,n){let i=Array.isArray(r)?n:r,o=i?.enabled??!0,l=(0,s.useLatest)(o),c=(0,s.useLatest)(e),d=(0,s.useLatest)(a);(0,t.useEffect)(()=>{function e(e){l.current&&(e.metaKey||e.ctrlKey)&&e.key===d.current&&!e.altKey&&!e.shiftKey&&c.current(e)}return window.addEventListener("keydown",e,!0),()=>{window.removeEventListener("keydown",e,!0)}},[c,l,d])}e.s(["useHotKey",()=>a])},116746,e=>{"use strict";let t=(0,e.i(388019).default)("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);e.s(["Hash",()=>t],116746)},774184,e=>{"use strict";function t(e){return`
    begin;
 
    ${e}
    
    commit;
  `}function s(e){return`
    begin;
 
    ${e}
    
    rollback;
  `}e.s(["wrapWithRollback",()=>s,"wrapWithTransaction",()=>t])},647307,e=>{"use strict";var t=e.i(850036),s=e.i(38429),a=e.i(356003),r=e.i(355901),n=e.i(714403),i=e.i(801834);async function o({name:e,projectRef:s,connectionString:a}){let r=t.default.schemas.create({name:e,owner:"postgres"}).sql,{result:i}=await (0,n.executeSql)({projectRef:s,connectionString:a,sql:r,queryKey:["schema","create"]});return i}e.s(["useSchemaCreateMutation",0,({onSuccess:e,onError:t,...n}={})=>{let l=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>o(e),async onSuccess(t,s,a){let{projectRef:r}=s;await (0,i.invalidateSchemasQuery)(l,r),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to create schema: ${e.message}`):t(e,s,a)},...n})}])},433857,e=>{"use strict";let t=(0,e.i(388019).default)("ListPlus",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M18 9v6",key:"1twb98"}],["path",{d:"M21 12h-6",key:"bt1uis"}]]);e.s(["ListPlus",()=>t],433857)},973512,832237,e=>{"use strict";var t=e.i(478902),s=e.i(680576),a=e.i(48189),r=e.i(964727),n=e.i(389959),i=e.i(837710);e.s(["ActionBar",0,({loading:e=!1,disableApply:o=!1,hideApply:l=!1,children:c,applyButtonLabel:d="Apply",backButtonLabel:u="Back",applyFunction:m,closePanel:p=r.default,formId:h,visible:f=!0})=>{let[_,y]=(0,n.useState)(!1),x=(0,n.useMemo)(()=>(0,a.getModKeyLabel)(),[]),g=(0,n.useCallback)(async()=>{y(!0),await new Promise(e=>m?.(e)),y(!1)},[m]),b=(0,n.useCallback)(t=>{if(_||e||o||l)return;let s=document.activeElement;if(s?.tagName!=="TEXTAREA"||t.metaKey||t.ctrlKey)if(t.preventDefault(),t.stopPropagation(),h){let e=document.getElementById(h);e&&e.requestSubmit()}else m&&g()},[_,e,o,l,h,m,g]);return(0,s.useHotKey)(b,"Enter",{enabled:f}),(0,t.jsxs)("div",{className:"flex w-full items-center gap-3 border-t border-default px-3 py-4",children:[c,(0,t.jsxs)("div",{className:"flex items-center gap-3 ml-auto",children:[(0,t.jsx)(i.Button,{type:"default",htmlType:"button",onClick:p,disabled:_||e,children:u}),void 0!==m?(0,t.jsxs)(i.Button,{onClick:g,disabled:o||_||e,loading:_||e,children:[(0,t.jsx)("span",{children:d}),(0,t.jsxs)("span",{className:"ml-2 text-xs text-foreground-lighter",children:[x,"↵"]})]}):l?(0,t.jsx)("div",{}):(0,t.jsxs)(i.Button,{disabled:e||o,loading:e,"data-testid":"action-bar-save-row",htmlType:"submit",form:h,children:[(0,t.jsx)("span",{children:d}),(0,t.jsxs)("span",{className:"ml-2 text-xs text-foreground-lighter",children:[x,"↵"]})]})]})]})}],973512);var o=r,l=e.i(971687),c=e.i(370410),d=e.i(365257),u=e.i(17203),m=e.i(116746),p=e.i(433857),h=e.i(388019);let f=(0,h.default)("ToggleRight",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}]]),_=(0,h.default)("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);var y=e.i(896088),x=e.i(178527),g=e.i(206413),b=e.i(592360),v=e.i(843778),j=e.i(866205),S=e.i(703526),w=e.i(917007),E=e.i(920432),N=e.i(549815),T=e.i(911509),A=e.i(996960),q=e.i(877555),C=e.i(171997),R=e.i(9679),k=e.i(689805),P=e.i(793912),I=e.i(135144),O=e.i(396831),L=e.i(613580),M=e.i(707409);e.s(["default",0,({value:e,className:s,enumTypes:a=[],disabled:r=!1,showLabel:h=!0,layout:$="horizontal",description:D,showRecommendation:F=!1,onOptionSelect:Q=o.default,error:z})=>{let[U,Y]=(0,n.useState)(!1),K=(0,n.useId)(),H=M.POSTGRES_DATA_TYPES.concat(a.map(e=>e.format.replaceAll('"',""))),W=!e||H.includes(e),B=M.RECOMMENDED_ALTERNATIVE_DATA_TYPE[e],G="This column's data type cannot be changed via the Table Editor as it is not supported yet. You can do so through the SQL Editor instead.",V=e=>{switch(e){case"number":return(0,t.jsx)(m.Hash,{size:14,className:"text-foreground",strokeWidth:1.5});case"time":return(0,t.jsx)(l.Calendar,{size:14,className:"text-foreground",strokeWidth:1.5});case"text":return(0,t.jsx)(_,{size:14,className:"text-foreground",strokeWidth:1.5});case"json":case"jsonb":return(0,t.jsx)("div",{className:"text-foreground",style:{padding:"0px 1px"},children:"{ }"});case"bool":return(0,t.jsx)(f,{size:14,className:"text-foreground",strokeWidth:1.5});default:return(0,t.jsx)(p.ListPlus,{size:16,className:"text-foreground",strokeWidth:1.5})}};return W?r&&!h?(0,t.jsxs)(L.Tooltip,{children:[(0,t.jsx)(L.TooltipTrigger,{children:(0,t.jsx)(C.Input,{readOnly:!0,disabled:!0,label:h?"Type":"",layout:h?"horizontal":void 0,className:"md:gap-x-0",size:"small",value:e})}),!h&&D&&(0,t.jsx)(L.TooltipContent,{side:"bottom",children:(0,t.jsx)("div",{className:"w-80",children:D})})]}):(0,t.jsxs)("div",{className:(0,v.cn)("flex flex-col gap-y-2",s),children:[h&&(0,t.jsx)(R.Label_Shadcn_,{className:"text-foreground-light",children:"Type"}),(0,t.jsxs)(k.Popover_Shadcn_,{modal:!0,open:U,onOpenChange:Y,children:[(0,t.jsx)(I.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsx)(i.Button,{type:z?"danger":"default",role:"combobox",size:"small","aria-expanded":U,"aria-controls":K,className:(0,v.cn)("w-full justify-between",!e&&"text-foreground-lighter"),iconRight:(0,t.jsx)(d.ChevronsUpDown,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"}),children:e?(0,t.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,t.jsx)("span",{children:V((e=>{let t=M.POSTGRES_DATA_TYPE_OPTIONS.find(t=>t.name===e);if(t)return t;let s=a.find(t=>t.format===e);return s?{...s,type:"enum"}:void 0})(e)?.type??"")}),e.replaceAll('"',"")]}):"Choose a column type..."})}),(0,t.jsx)(P.PopoverContent_Shadcn_,{id:K,className:"w-[460px] p-0",side:"bottom",align:"center",children:(0,t.jsxs)(j.Command_Shadcn_,{children:[(0,t.jsx)(E.CommandInput_Shadcn_,{placeholder:"Search types...",className:"!bg-transparent focus:!shadow-none focus:!ring-0 text-xs"}),(0,t.jsx)(S.CommandEmpty_Shadcn_,{children:"Type not found."}),(0,t.jsx)(T.CommandList_Shadcn_,{children:(0,t.jsxs)(O.ScrollArea,{className:"h-[240px]",children:[(0,t.jsx)(w.CommandGroup_Shadcn_,{heading:"Postgres data types",children:M.POSTGRES_DATA_TYPE_OPTIONS.map(s=>(0,t.jsxs)(N.CommandItem_Shadcn_,{value:s.name,className:(0,v.cn)("relative",s.name===e?"bg-surface-200":""),onSelect:e=>{Q(e),Y(!1)},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 pr-6",children:[(0,t.jsx)("span",{children:V(s.type)}),(0,t.jsx)("span",{className:"text-foreground",children:s.name}),(0,t.jsx)("span",{className:"text-foreground-lighter",children:s.description})]}),(0,t.jsx)("span",{className:"absolute right-3 top-2",children:s.name===e?(0,t.jsx)(c.Check,{className:"text-brand",size:14}):""})]},s.name))}),a.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(A.CommandSeparator_Shadcn_,{}),(0,t.jsx)(w.CommandGroup_Shadcn_,{heading:"Other types",children:a.map(s=>(0,t.jsx)(N.CommandItem_Shadcn_,{value:s.format,className:(0,v.cn)("relative",s.format===e?"bg-surface-200":""),onSelect:e=>{Q("public"===s.schema?e.replaceAll('"',""):e),Y(!1)},children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{children:(0,t.jsx)(p.ListPlus,{size:16,className:"text-foreground",strokeWidth:1.5})}),(0,t.jsx)("span",{className:"text-foreground",children:s.format.replaceAll('"',"")}),void 0!==s.comment&&(0,t.jsx)("span",{title:s.comment??"",className:"text-foreground-lighter",children:s.comment}),s.format===e&&(0,t.jsx)("span",{className:"absolute right-3 top-2",children:(0,t.jsx)(c.Check,{className:"text-brand",size:14})})]})},s.id))})]})]})})]})})]}),F&&void 0!==B&&(0,t.jsxs)(x.Alert_Shadcn_,{variant:"warning",className:"mt-2",children:[(0,t.jsx)(q.CriticalIcon,{}),(0,t.jsxs)(b.AlertTitle_Shadcn_,{children:[" ","It is recommended to use"," ",(0,t.jsx)("code",{className:"text-code-inline",children:B.alternative})," instead"]}),(0,t.jsxs)(g.AlertDescription_Shadcn_,{children:[(0,t.jsxs)("p",{children:["Postgres recommends against using the data type"," ",(0,t.jsx)("code",{className:"text-code-inline",children:e})," unless you have a very specific use case."]}),(0,t.jsxs)("div",{className:"flex items-center space-x-2 mt-3",children:[(0,t.jsx)(i.Button,{asChild:!0,type:"default",icon:(0,t.jsx)(u.ExternalLink,{}),children:(0,t.jsx)(y.default,{href:B.reference,target:"_blank",rel:"noreferrer",children:"Read more"})}),(0,t.jsxs)(i.Button,{type:"primary",onClick:()=>Q(B.alternative),children:["Use ",B.alternative]})]})]})]})]}):(0,t.jsxs)(L.Tooltip,{children:[(0,t.jsx)(L.TooltipTrigger,{children:(0,t.jsx)(C.Input,{readOnly:!0,disabled:!0,label:h?"Type":"",layout:h?$:void 0,className:"md:gap-x-0 [&>div>div]:text-left",size:"small",icon:V(M.POSTGRES_DATA_TYPE_OPTIONS.find(t=>t.name===e)?.type??""),value:e,descriptionText:h?G:void 0})}),!h&&(0,t.jsx)(L.TooltipContent,{side:"bottom",className:"w-80",children:G})]})}],832237)},1962,e=>{"use strict";var t=e.i(478902),s=e.i(459323),a=e.i(389959),r=e.i(837491),n=e.i(57352);let i="Progress",[o,l]=(0,r.createContextScope)(i),[c,d]=o(i),u=(0,a.forwardRef)((e,t)=>{let{__scopeProgress:r,value:i,max:o,getValueLabel:l=p,...d}=e,u=_(o)?o:100,m=y(i,u)?i:null,x=f(m)?l(m,u):void 0;return(0,a.createElement)(c,{scope:r,value:m,max:u},(0,a.createElement)(n.Primitive.div,(0,s.default)({"aria-valuemax":u,"aria-valuemin":0,"aria-valuenow":f(m)?m:void 0,"aria-valuetext":x,role:"progressbar","data-state":h(m,u),"data-value":null!=m?m:void 0,"data-max":u},d,{ref:t})))});u.propTypes={max(e,t,s){var a,r;let n=e[t],i=String(n);return n&&!_(n)?Error((a=i,r=s,`Invalid prop \`max\` of value \`${a}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`)):null},value(e,t,s){var a,r;let n=e[t],i=String(n),o=_(e.max)?e.max:100;return null==n||y(n,o)?null:Error((a=i,r=s,`Invalid prop \`value\` of value \`${a}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`))}};let m=(0,a.forwardRef)((e,t)=>{var r;let{__scopeProgress:i,...o}=e,l=d("ProgressIndicator",i);return(0,a.createElement)(n.Primitive.div,(0,s.default)({"data-state":h(l.value,l.max),"data-value":null!=(r=l.value)?r:void 0,"data-max":l.max},o,{ref:t}))});function p(e,t){return`${Math.round(e/t*100)}%`}function h(e,t){return null==e?"indeterminate":e===t?"complete":"loading"}function f(e){return"number"==typeof e}function _(e){return f(e)&&!isNaN(e)&&e>0}function y(e,t){return f(e)&&!isNaN(e)&&e<=t&&e>=0}var x=e.i(843778);let g=a.forwardRef(({className:e,value:s,...a},r)=>(0,t.jsx)(u,{ref:r,className:(0,x.cn)("relative h-1 w-full overflow-hidden rounded-full bg-surface-300",e),...a,children:(0,t.jsx)(m,{className:"h-full w-full flex-1 bg-foreground transition-all",style:{transform:`translateX(-${100-(s||0)}%)`}})}));g.displayName=u.displayName,e.s(["Progress",()=>g],1962)},474325,e=>{"use strict";var t=e.i(478902),s=e.i(774803),a=e.i(1962);e.s(["SonnerProgress",0,({progress:e,progressPrefix:r,action:n,message:i,description:o="Please do not close the browser"})=>(0,t.jsxs)("div",{className:"flex gap-3 w-full",children:[(0,t.jsx)(s.Loader2,{className:"animate-spin text-foreground-muted mt-0.5",size:16}),(0,t.jsxs)("div",{className:"flex flex-col gap-2 w-full",children:[(0,t.jsxs)("div",{className:"flex w-full justify-between",children:[(0,t.jsx)("p",{className:"text-foreground text-sm",children:i}),(0,t.jsxs)("p",{className:"text-foreground-light text-sm font-mono",children:[r||"",`${Number(e).toFixed(0)}%`]})]}),(0,t.jsx)(a.Progress,{value:e,className:"w-full"}),(0,t.jsxs)("div",{className:"flex flex-row gap-2 items-center justify-between",children:[(0,t.jsx)("small",{className:"text-foreground-lighter text-xs",children:o}),n]})]})]})])},93472,165610,e=>{"use strict";var t=e.i(478902);let s=(0,e.i(388019).default)("OctagonAlert",[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]]);e.s(["AlertOctagon",()=>s],165610);var a=e.i(217444),r=e.i(872646),n=e.i(833655),i=e.i(975924),o=e.i(389959),l=e.i(938933);let c={danger:(0,t.jsx)(s,{strokeWidth:1.5,size:18}),success:(0,t.jsx)(r.CheckCircle,{strokeWidth:1.5,size:18}),warning:(0,t.jsx)(a.AlertTriangle,{strokeWidth:1.5,size:18}),info:(0,t.jsx)(n.Info,{strokeWidth:1.5,size:18}),neutral:(0,t.jsx)(t.Fragment,{})};function d({variant:e="neutral",className:s,title:a,withIcon:r,closable:n,children:d,icon:u,actions:m}){let p=(0,l.default)("alert"),[h,f]=(0,o.useState)(!0),_=[p.base];_.push(p.variant[e].base),s&&_.push(s);let y=[p.description,p.variant[e].description],x=[p.close];return(0,t.jsx)(t.Fragment,{children:h&&(0,t.jsxs)("div",{className:_.join(" "),children:[r?(0,t.jsx)("div",{className:p.variant[e].icon,children:r&&c[e]}):null,u&&u,(0,t.jsxs)("div",{className:"flex flex-1 items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:[p.variant[e].header,p.header].join(" "),children:a}),(0,t.jsx)("div",{className:y.join(" "),children:d})]}),m]}),n&&(0,t.jsx)("button",{"aria-label":"Close alert",onClick:()=>f(!1),className:x.join(" "),children:(0,t.jsx)(i.X,{strokeWidth:2,size:16})})]})})}e.s(["Alert",()=>d],93472)},492636,e=>{"use strict";var t=e.i(478902),s=e.i(753515),a=e.i(938933),r=e.i(140449);let n=(0,e.i(389959).createContext)({parentCallback:e=>{},parentSize:""});function i({className:e,id:s="",name:i="",label:o,afterLabel:l,beforeLabel:c,description:d,checked:u,value:m,onChange:p,onBlur:h,size:f="medium",disabled:_=!1,...y}){let{formContextOnChange:x,values:g,handleBlur:b}=(0,r.useFormContext)(),v=(0,a.default)("checkbox");return(0,t.jsx)(n.Consumer,{children:({parentCallback:a,parentSize:r})=>{let n=s||i||(o?o.toLowerCase().replace(/^[^A-Z0-9]+/gi,"").replace(/ /g,"-"):void 0);f=r||f;let j=i||n,S=u??void 0,w=[v.container];return e&&w.push(e),g&&void 0===u&&(S=g[s||i]),(0,t.jsxs)("div",{className:w.join(" "),children:[(0,t.jsx)("input",{id:n,name:j,type:"checkbox",className:[v.base,v.size[f]].join(" "),onChange:function(e){a&&a(e),p&&p(e),x&&x(e)},onBlur:function(e){b&&setTimeout(()=>{b(e)},100),h&&h(e)},checked:S,value:m||n,disabled:_,...y}),(0,t.jsxs)("label",{className:[v.label.base,v.label[f]].join(" "),htmlFor:n,children:[(0,t.jsxs)("span",{children:[c&&(0,t.jsx)("span",{className:[v.label_before.base,v.label_before[f]].join(" "),children:c}),o,l&&(0,t.jsx)("span",{className:[v.label_after.base,v.label_after[f]].join(" "),children:l})]}),d&&(0,t.jsx)("p",{className:[v.description.base,v.description[f]].join(" "),children:d})]})]})}})}i.Group=function({id:e,layout:r="vertical",error:o,descriptionText:l,label:c,afterLabel:d,beforeLabel:u,labelOptional:m,children:p,className:h,options:f,onChange:_,size:y="medium"}){let x=(0,a.default)("checkbox");return(0,t.jsx)(s.FormLayout,{label:c,afterLabel:d,beforeLabel:u,labelOptional:m,layout:r,id:e,error:o,descriptionText:l,className:h,size:y,children:(0,t.jsx)(n.Provider,{value:{parentCallback:e=>{_&&_(e)},parentSize:y},children:(0,t.jsx)("div",{className:x.group,children:f?f.map(e=>(0,t.jsx)(i,{id:e.id,value:e.value,label:e.label,beforeLabel:e.beforeLabel,afterLabel:e.afterLabel,checked:e.checked,name:e.name,description:e.description,defaultChecked:e.defaultChecked},e.id)):p})})})},e.s(["default",0,i],492636)},255109,(e,t,s)=>{var a=e.r(612989),r=e.r(951664),n=e.r(472560),i=Math.ceil,o=Math.max;t.exports=function(e,t,s){t=(s?r(e,t,s):void 0===t)?1:o(n(t),0);var l=null==e?0:e.length;if(!l||t<1)return[];for(var c=0,d=0,u=Array(i(l/t));c<l;)u[d++]=a(e,c,c+=t);return u}},815545,e=>{"use strict";var t=e.i(492636);e.s(["Checkbox",()=>t.default])},645563,(e,t,s)=>{var a=Object.prototype.hasOwnProperty;t.exports=function(e,t){return null!=e&&a.call(e,t)}},762510,(e,t,s)=>{var a=e.r(645563),r=e.r(863772);t.exports=function(e,t){return null!=e&&r(e,t,a)}},983783,e=>{"use strict";var t=e.i(449024),s=e.i(389959);e.i(128328);var a=e.i(947748),r=e.i(158639);e.s(["useQuerySchemaState",0,()=>{var e;let{ref:n}=(0,r.useParams)(),i=n&&n.length>0&&window.localStorage.getItem(a.LOCAL_STORAGE_KEYS.LAST_SELECTED_SCHEMA(n))||"public",[o,l]=(e=(0,s.useMemo)(()=>i,[n]),(0,t.useQueryState)("schema",t.parseAsString.withDefault(e).withOptions({clearOnDefault:!1})));return(0,s.useEffect)(()=>{n&&n.length>0&&window.localStorage.setItem(a.LOCAL_STORAGE_KEYS.LAST_SELECTED_SCHEMA(n),o)},[o,n]),{selectedSchema:o,setSelectedSchema:l}}])},200409,e=>{"use strict";var t=e.i(152285);e.s(["Tabs",()=>t.default])},53071,e=>{"use strict";let t=(0,e.i(388019).default)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",()=>t],53071)},29750,(e,t,s)=>{"use strict";var a="function"==typeof Symbol&&Symbol.for,r=a?Symbol.for("react.element"):60103,n=a?Symbol.for("react.portal"):60106,i=a?Symbol.for("react.fragment"):60107,o=a?Symbol.for("react.strict_mode"):60108,l=a?Symbol.for("react.profiler"):60114,c=a?Symbol.for("react.provider"):60109,d=a?Symbol.for("react.context"):60110,u=a?Symbol.for("react.async_mode"):60111,m=a?Symbol.for("react.concurrent_mode"):60111,p=a?Symbol.for("react.forward_ref"):60112,h=a?Symbol.for("react.suspense"):60113,f=a?Symbol.for("react.suspense_list"):60120,_=a?Symbol.for("react.memo"):60115,y=a?Symbol.for("react.lazy"):60116,x=a?Symbol.for("react.block"):60121,g=a?Symbol.for("react.fundamental"):60117,b=a?Symbol.for("react.responder"):60118,v=a?Symbol.for("react.scope"):60119;function j(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case u:case m:case i:case l:case o:case h:return e;default:switch(e=e&&e.$$typeof){case d:case p:case y:case _:case c:return e;default:return t}}case n:return t}}}function S(e){return j(e)===m}s.AsyncMode=u,s.ConcurrentMode=m,s.ContextConsumer=d,s.ContextProvider=c,s.Element=r,s.ForwardRef=p,s.Fragment=i,s.Lazy=y,s.Memo=_,s.Portal=n,s.Profiler=l,s.StrictMode=o,s.Suspense=h,s.isAsyncMode=function(e){return S(e)||j(e)===u},s.isConcurrentMode=S,s.isContextConsumer=function(e){return j(e)===d},s.isContextProvider=function(e){return j(e)===c},s.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},s.isForwardRef=function(e){return j(e)===p},s.isFragment=function(e){return j(e)===i},s.isLazy=function(e){return j(e)===y},s.isMemo=function(e){return j(e)===_},s.isPortal=function(e){return j(e)===n},s.isProfiler=function(e){return j(e)===l},s.isStrictMode=function(e){return j(e)===o},s.isSuspense=function(e){return j(e)===h},s.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===m||e===l||e===o||e===h||e===f||"object"==typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===_||e.$$typeof===c||e.$$typeof===d||e.$$typeof===p||e.$$typeof===g||e.$$typeof===b||e.$$typeof===v||e.$$typeof===x)},s.typeOf=j},213784,(e,t,s)=>{"use strict";t.exports=e.r(29750)},781979,(e,t,s)=>{"use strict";var a=e.r(213784),r={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},n={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},o={};function l(e){return a.isMemo(e)?i:o[e.$$typeof]||r}o[a.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},o[a.Memo]=i;var c=Object.defineProperty,d=Object.getOwnPropertyNames,u=Object.getOwnPropertySymbols,m=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;t.exports=function e(t,s,a){if("string"!=typeof s){if(h){var r=p(s);r&&r!==h&&e(t,r,a)}var i=d(s);u&&(i=i.concat(u(s)));for(var o=l(t),f=l(s),_=0;_<i.length;++_){var y=i[_];if(!n[y]&&!(a&&a[y])&&!(f&&f[y])&&!(o&&o[y])){var x=m(s,y);try{c(t,y,x)}catch(e){}}}}return t}},152285,e=>{"use strict";var t=e.i(478902),s=e.i(700856),a=e.i(389959),r=e.i(938933);let n=({defaultActiveId:e,activeId:n,type:i="pills",size:o="tiny",block:l,onChange:c,onClick:d,scrollable:u,wrappable:m,addOnBefore:p,addOnAfter:h,listClassNames:f,baseClassNames:_,refs:y,children:x})=>{let g=a.Children.toArray(x),[b,v]=(0,a.useState)(n??e??g?.[0]?.props?.id);(0,a.useMemo)(()=>{n&&n!==b&&v(n)},[n]);let j=(0,r.default)("tabs");function S(e){d?.(e),e!==b&&(c?.(e),v(e))}let w=[j[i].list];return u&&w.push(j.scrollable),m&&w.push(j.wrappable),f&&w.push(f),(0,t.jsxs)(s.Root,{value:b,className:[j.base,_].join(" "),ref:y?.base,children:[(0,t.jsxs)(s.List,{className:w.join(" "),ref:y?.list,children:[p,g.map(e=>{let a=b===e.props.id,r=[j[i].base,j.size[o]];return a?r.push(j[i].active):r.push(j[i].inactive),l&&r.push(j.block),(0,t.jsxs)(s.Trigger,{onKeyDown:t=>{"Enter"===t.key&&(t.preventDefault(),S(e.props.id))},onClick:()=>S(e.props.id),value:e.props.id,className:r.join(" "),children:[e.props.icon,(0,t.jsx)("span",{children:e.props.label}),e.props.iconRight]},`${e.props.id}-tab-button`)}),h]}),g]})};n.Panel=({children:e,id:a,className:n})=>{let i=(0,r.default)("tabs");return(0,t.jsx)(s.Content,{value:a,className:[i.content,n].join(" "),children:e})},e.s(["default",0,n])},238944,e=>{"use strict";var t=e.i(323796),s=e.i(435798),a=e.i(389959);function r({replace:e=!0,arrayKeys:n=[]}={}){let i=JSON.stringify(n),o=(0,a.useMemo)(()=>new Set(n),[i]),l=(0,s.useRouter)(),c=(0,a.useMemo)(()=>Object.fromEntries(Object.entries(l.query).map(([e,t])=>o.has(e)?Array.isArray(t)?[e,t]:[e,[t]]:[e,t])),[o,l.query]),d=(0,t.default)(c);return[c,(0,a.useCallback)(t=>{let s=d.current,a="function"==typeof t?t(s):t,r=Object.fromEntries(Object.entries({...s,...a}).filter(([,e])=>!!e));(e?l.replace:l.push)({pathname:l.pathname,query:r},void 0,{shallow:!0,scroll:!1})},[l,e])]}e.s(["useUrlState",()=>r])},219195,e=>{"use strict";let t=(0,e.i(388019).default)("Table2",[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",key:"gugj83"}]]);e.s(["Table2",()=>t],219195)},701087,e=>{"use strict";let t=(0,e.i(388019).default)("LockOpen",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]]);e.s(["Unlock",()=>t],701087)},425861,e=>{"use strict";var t=e.i(478902),s=e.i(843778);e.s(["default",0,({options:e,width:a=50,activeOption:r,onClickOption:n,borderOverride:i="border-stronger"})=>(0,t.jsxs)("div",{className:`relative border ${i} rounded-md h-7`,style:{padding:1,width:(a+1)*2},children:[(0,t.jsx)("span",{style:{width:a,translate:r===e[1]?"0px":`${a-2}px`},"aria-hidden":"true",className:(0,s.cn)("z-0 inline-block rounded h-full bg-overlay-hover shadow transform","transition-all ease-in-out border border-strong")}),e.map((e,i)=>{let o;return(0,t.jsx)("span",{style:{width:a+1},className:`
              ${r===e?"text-foreground":"text-foreground-light"}
              ${0===i?"right-0":"left-0"}
              ${(o=r===e,`absolute top-0 z-1 text-xs inline-flex h-full items-center justify-center font-medium
    ${o?"hover:text-foreground-light hover:text-foreground":"hover:text-foreground"} hover:text-foreground focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue
    transition ease-in-out duration-150`)}
              cursor-pointer
            `,onClick:()=>n(e),children:(0,t.jsx)("span",{className:(0,s.cn)("capitalize hover:text-foreground",r===e?"text-foreground":"text-foreground-light"),children:e})},`toggle_${i}`)})]})])},878594,e=>{"use strict";var t=e.i(991435);new WeakMap,new WeakMap;let s={get url(){return`file://${e.P("node_modules/.pnpm/valtio@1.12.0_@types+react@18.3.3_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs")}`}},a=Symbol();function r(e,r){let n;"string"==typeof r&&(console.warn("string name option is deprecated, use { name }. https://github.com/pmndrs/valtio/pull/400"),r={name:r});let{enabled:i,name:o="",...l}=r||{};try{n=(null!=i?i:(s.env?s.env.MODE:void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!n){(s.env?s.env.MODE:void 0)!=="production"&&i&&console.warn("[Warning] Please install/enable Redux devtools extension");return}let c=!1,d=n.connect({name:o,...l}),u=(0,t.subscribe)(e,s=>{let r=s.filter(([e,t])=>t[0]!==a).map(([e,t])=>`${e}:${t.map(String).join(".")}`).join(", ");if(r)if(c)c=!1;else{let s=Object.assign({},(0,t.snapshot)(e));delete s[a],d.send({type:r,updatedAt:new Date().toLocaleString()},s)}}),m=d.subscribe(s=>{var r,n,i,o,l,u;if("ACTION"===s.type&&s.payload)try{Object.assign(e,JSON.parse(s.payload))}catch(e){console.error("please dispatch a serializable value that JSON.parse() and proxy() support\n",e)}if("DISPATCH"===s.type&&s.state)((null==(r=s.payload)?void 0:r.type)==="JUMP_TO_ACTION"||(null==(n=s.payload)?void 0:n.type)==="JUMP_TO_STATE")&&(c=!0,Object.assign(e,JSON.parse(s.state))),e[a]=s;else if("DISPATCH"===s.type&&(null==(i=s.payload)?void 0:i.type)==="COMMIT")d.init((0,t.snapshot)(e));else if("DISPATCH"===s.type&&(null==(o=s.payload)?void 0:o.type)==="IMPORT_STATE"){let a=null==(l=s.payload.nextLiftedState)?void 0:l.actionsById,r=(null==(u=s.payload.nextLiftedState)?void 0:u.computedStates)||[];c=!0,r.forEach(({state:s},r)=>{let n=a[r]||"No action found";Object.assign(e,s),0===r?d.init((0,t.snapshot)(e)):d.send(n,(0,t.snapshot)(e))})}});return d.init((0,t.snapshot)(e)),()=>{u(),null==m||m()}}function n(e){let s=(0,t.proxy)({data:Array.from(new Set(e)),has(e){return -1!==this.data.indexOf(e)},add(e){let s=!1;return"object"==typeof e&&null!==e&&(s=-1!==this.data.indexOf((0,t.proxy)(e))),-1!==this.data.indexOf(e)||s||this.data.push(e),this},delete(e){let t=this.data.indexOf(e);return -1!==t&&(this.data.splice(t,1),!0)},clear(){this.data.splice(0)},get size(){return this.data.length},forEach(e){this.data.forEach(t=>{e(t,t,this)})},get[Symbol.toStringTag](){return"Set"},toJSON(){return new Set(this.data)},[Symbol.iterator](){return this.data[Symbol.iterator]()},values(){return this.data.values()},keys(){return this.data.values()},entries(){return new Set(this.data).entries()}});return Object.defineProperties(s,{data:{enumerable:!1},size:{enumerable:!1},toJSON:{enumerable:!1}}),Object.seal(s),s}function i(e){let s=(0,t.proxy)({data:Array.from(e||[]),has(e){return this.data.some(t=>t[0]===e)},set(e,t){let s=this.data.find(t=>t[0]===e);return s?s[1]=t:this.data.push([e,t]),this},get(e){var t;return null==(t=this.data.find(t=>t[0]===e))?void 0:t[1]},delete(e){let t=this.data.findIndex(t=>t[0]===e);return -1!==t&&(this.data.splice(t,1),!0)},clear(){this.data.splice(0)},get size(){return this.data.length},toJSON(){return new Map(this.data)},forEach(e){this.data.forEach(t=>{e(t[1],t[0],this)})},keys(){return this.data.map(e=>e[0]).values()},values(){return this.data.map(e=>e[1]).values()},entries(){return new Map(this.data).entries()},get[Symbol.toStringTag](){return"Map"},[Symbol.iterator](){return this.entries()}});return Object.defineProperties(s,{data:{enumerable:!1},size:{enumerable:!1},toJSON:{enumerable:!1}}),Object.seal(s),s}e.s(["devtools",()=>r,"proxyMap",()=>i,"proxySet",()=>n],878594)},419524,e=>{"use strict";let t=(0,e.i(388019).default)("AlignLeft",[["line",{x1:"21",x2:"3",y1:"6",y2:"6",key:"1fp77t"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}],["line",{x1:"17",x2:"3",y1:"18",y2:"18",key:"1awlsn"}]]);e.s(["AlignLeft",()=>t],419524)}]);

//# debugId=b7395924-43f3-28d0-c8c9-8550264f28d5
//# sourceMappingURL=0d82cc683b7adcc1.js.map