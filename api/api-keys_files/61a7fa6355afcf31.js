;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e42f5cff-2d93-f7be-1a20-696da9fb1933")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,850036,100121,822797,306255,556955,899850,640696,e=>{"use strict";var t=e.i(97429),n=e.i(248593),a=e.i(479084);let i=(e,t)=>`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${e})) FILTER (WHERE ${t})
    FROM
      ${e}
  ),
  '{}'
) AS ${e}`;function r(e,t,n){return(n&&(t=n.concat(t??[])),e?.length)?`IN (${e.map(a.literal).join(",")})`:t?.length?`NOT IN (${t.map(a.literal).join(",")})`:""}let l=`
-- Lists each column's privileges in the form of:
--
-- [
--   {
--     "column_id": "12345.1",
--     "relation_schema": "public",
--     "relation_name": "mytable",
--     "column_name": "mycolumn",
--     "privileges": [
--       {
--         "grantor": "postgres",
--         "grantee": "myrole",
--         "privilege_type": "SELECT",
--         "is_grantable": false
--       },
--       ...
--     ]
--   },
--   ...
-- ]
--
-- Modified from information_schema.column_privileges. We try to be as close as
-- possible to the view definition, obtained from:
--
-- select pg_get_viewdef('information_schema.column_privileges');
--
-- The main differences are:
-- - we include column privileges for materialized views
--   (reason for exclusion in information_schema.column_privileges:
--    https://www.postgresql.org/message-id/9136.1502740844%40sss.pgh.pa.us)
-- - we query a.attrelid and a.attnum to generate column_id
-- - table_catalog is omitted
-- - table_schema -> relation_schema, table_name -> relation_name
--
-- Column privileges are intertwined with table privileges in that table
-- privileges override column privileges. E.g. if we do:
--
-- grant all on mytable to myrole;
--
-- Then myrole is granted privileges for ALL columns. Likewise, if we do:
--
-- grant all (id) on mytable to myrole;
-- revoke all on mytable from myrole;
--
-- Then the grant on the id column is revoked.
--
-- This is unlike how grants for schemas and tables interact, where you need
-- privileges for BOTH the schema the table is in AND the table itself in order
-- to access the table.

select (x.attrelid || '.' || x.attnum) as column_id,
       nc.nspname as relation_schema,
       x.relname as relation_name,
       x.attname as column_name,
       coalesce(
         jsonb_agg(
           jsonb_build_object(
             'grantor', u_grantor.rolname,
             'grantee', grantee.rolname,
             'privilege_type', x.prtype,
             'is_grantable', x.grantable
           )
         ),
         '[]'
       ) as privileges
from
  (select pr_c.grantor,
          pr_c.grantee,
          a.attrelid,
          a.attnum,
          a.attname,
          pr_c.relname,
          pr_c.relnamespace,
          pr_c.prtype,
          pr_c.grantable,
          pr_c.relowner
   from
     (select pg_class.oid,
             pg_class.relname,
             pg_class.relnamespace,
             pg_class.relowner,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantor as grantor,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantee as grantee,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).is_grantable as is_grantable
      from pg_class
      where (pg_class.relkind = any (array['r',
                                           'v',
                                           'm',
                                           'f',
                                           'p'])) ) pr_c(oid, relname, relnamespace, relowner, grantor, grantee, prtype, grantable),
                                                    pg_attribute a
   where ((a.attrelid = pr_c.oid)
          and (a.attnum > 0)
          and (not a.attisdropped))
   union select pr_a.grantor,
                pr_a.grantee,
                pr_a.attrelid,
                pr_a.attnum,
                pr_a.attname,
                c.relname,
                c.relnamespace,
                pr_a.prtype,
                pr_a.grantable,
                c.relowner
   from
     (select a.attrelid,
             a.attnum,
             a.attname,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantor as grantor,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantee as grantee,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).is_grantable as is_grantable
      from (pg_attribute a
            join pg_class cc on ((a.attrelid = cc.oid)))
      where ((a.attnum > 0)
             and (not a.attisdropped))) pr_a(attrelid, attnum, attname, grantor, grantee, prtype, grantable),
                                        pg_class c
   where ((pr_a.attrelid = c.oid)
          and (c.relkind = any (ARRAY['r',
                                      'v',
                                      'm',
                                      'f',
                                      'p'])))) x,
     pg_namespace nc,
     pg_authid u_grantor,
  (select pg_authid.oid,
          pg_authid.rolname
   from pg_authid
   union all select (0)::oid as oid,
                    'PUBLIC') grantee(oid, rolname)
where ((x.relnamespace = nc.oid)
       and (x.grantee = grantee.oid)
       and (x.grantor = u_grantor.oid)
       and (x.prtype = any (ARRAY['INSERT',
                                  'SELECT',
                                  'UPDATE',
                                  'REFERENCES']))
       and (pg_has_role(u_grantor.oid, 'USAGE')
            or pg_has_role(grantee.oid, 'USAGE')
            or (grantee.rolname = 'PUBLIC')))
group by column_id,
         nc.nspname,
         x.relname,
         x.attname
`,o=t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),is_grantable:t.z.boolean()}),s=t.z.object({column_id:t.z.string(),relation_schema:t.z.string(),relation_name:t.z.string(),column_name:t.z.string(),privileges:t.z.array(o)}),d=t.z.array(s);t.z.object({columnId:t.z.string(),grantee:t.z.string(),privilegeType:t.z.union([t.z.literal("ALL"),t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),isGrantable:t.z.boolean().optional()});let c=`
-- Adapted from information_schema.columns

SELECT
  c.oid :: int8 AS table_id,
  nc.nspname AS schema,
  c.relname AS table,
  (c.oid || '.' || a.attnum) AS id,
  a.attnum AS ordinal_position,
  a.attname AS name,
  CASE
    WHEN a.atthasdef THEN pg_get_expr(ad.adbin, ad.adrelid)
    ELSE NULL
  END AS default_value,
  CASE
    WHEN t.typtype = 'd' THEN CASE
      WHEN bt.typelem <> 0 :: oid
      AND bt.typlen = -1 THEN 'ARRAY'
      WHEN nbt.nspname = 'pg_catalog' THEN format_type(t.typbasetype, NULL)
      ELSE 'USER-DEFINED'
    END
    ELSE CASE
      WHEN t.typelem <> 0 :: oid
      AND t.typlen = -1 THEN 'ARRAY'
      WHEN nt.nspname = 'pg_catalog' THEN format_type(a.atttypid, NULL)
      ELSE 'USER-DEFINED'
    END
  END AS data_type,
  COALESCE(bt.typname, t.typname) AS format,
  a.attidentity IN ('a', 'd') AS is_identity,
  CASE
    a.attidentity
    WHEN 'a' THEN 'ALWAYS'
    WHEN 'd' THEN 'BY DEFAULT'
    ELSE NULL
  END AS identity_generation,
  a.attgenerated IN ('s') AS is_generated,
  NOT (
    a.attnotnull
    OR t.typtype = 'd' AND t.typnotnull
  ) AS is_nullable,
  (
    c.relkind IN ('r', 'p')
    OR c.relkind IN ('v', 'f') AND pg_column_is_updatable(c.oid, a.attnum, FALSE)
  ) AS is_updatable,
  uniques.table_id IS NOT NULL AS is_unique,
  check_constraints.definition AS "check",
  array_to_json(
    array(
      SELECT
        enumlabel
      FROM
        pg_catalog.pg_enum enums
      WHERE
        enums.enumtypid = coalesce(bt.oid, t.oid)
        OR enums.enumtypid = coalesce(bt.typelem, t.typelem)
      ORDER BY
        enums.enumsortorder
    )
  ) AS enums,
  col_description(c.oid, a.attnum) AS comment
FROM
  pg_attribute a
  LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid
  AND a.attnum = ad.adnum
  JOIN (
    pg_class c
    JOIN pg_namespace nc ON c.relnamespace = nc.oid
  ) ON a.attrelid = c.oid
  JOIN (
    pg_type t
    JOIN pg_namespace nt ON t.typnamespace = nt.oid
  ) ON a.atttypid = t.oid
  LEFT JOIN (
    pg_type bt
    JOIN pg_namespace nbt ON bt.typnamespace = nbt.oid
  ) ON t.typtype = 'd'
  AND t.typbasetype = bt.oid
  LEFT JOIN (
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position
    FROM pg_catalog.pg_constraint
    WHERE contype = 'u' AND cardinality(conkey) = 1
  ) AS uniques ON uniques.table_id = c.oid AND uniques.ordinal_position = a.attnum
  LEFT JOIN (
    -- We only select the first column check
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position,
      substring(
        pg_get_constraintdef(pg_constraint.oid, true),
        8,
        length(pg_get_constraintdef(pg_constraint.oid, true)) - 8
      ) AS "definition"
    FROM pg_constraint
    WHERE contype = 'c' AND cardinality(conkey) = 1
    ORDER BY table_id, ordinal_position, oid asc
  ) AS check_constraints ON check_constraints.table_id = c.oid AND check_constraints.ordinal_position = a.attnum
WHERE
  NOT pg_is_other_temp_schema(nc.oid)
  AND a.attnum > 0
  AND NOT a.attisdropped
  AND (c.relkind IN ('r', 'v', 'm', 'f', 'p'))
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_column_privilege(
      c.oid,
      a.attnum,
      'SELECT, INSERT, UPDATE, REFERENCES'
    )
  )
`,m=t.z.object({id:t.z.string(),table_id:t.z.number(),schema:t.z.string(),table:t.z.string(),name:t.z.string(),ordinal_position:t.z.number(),data_type:t.z.string(),format:t.z.string(),is_identity:t.z.boolean(),identity_generation:t.z.string().nullable(),is_generated:t.z.boolean(),is_nullable:t.z.boolean(),is_updatable:t.z.boolean(),is_unique:t.z.boolean(),check:t.z.string().nullable(),default_value:t.z.any().nullable(),enums:t.z.array(t.z.string()),comment:t.z.string().nullable()}),p=t.z.array(m),u=t.z.optional(m),_=e=>e.endsWith("[]")?`${(0,a.ident)(e.slice(0,-2))}[]`:e.includes(".")?e:(0,a.ident)(e),g=`
SELECT
  name,
  setting,
  category,
  TRIM(split_part(category, '/', 1)) AS group,
  TRIM(split_part(category, '/', 2)) AS subgroup,
  unit,
  short_desc,
  extra_desc,
  context,
  vartype,
  source,
  min_val,
  max_val,
  enumvals,
  boot_val,
  reset_val,
  sourcefile,
  sourceline,
  pending_restart
FROM
  pg_settings
ORDER BY
  category,
  name
`,$=t.z.object({name:t.z.string(),setting:t.z.string(),category:t.z.string(),group:t.z.string(),subgroup:t.z.string(),unit:t.z.string().nullable(),short_desc:t.z.string(),extra_desc:t.z.string().nullable(),context:t.z.string(),vartype:t.z.string(),source:t.z.string(),min_val:t.z.string().nullable(),max_val:t.z.string().nullable(),enumvals:t.z.array(t.z.string()).nullable(),boot_val:t.z.string().nullable(),reset_val:t.z.string().nullable(),sourcefile:t.z.string().nullable(),sourceline:t.z.number().nullable(),pending_restart:t.z.boolean()}),h=t.z.array($),E=`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment
FROM
  pg_available_extensions() e(name, default_version, comment)
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
`,b=t.z.object({name:t.z.string(),schema:t.z.string().nullable(),default_version:t.z.string(),installed_version:t.z.string().nullable(),comment:t.z.string()}),f=t.z.array(b),z=t.z.optional(b),A=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  obj_description(c.oid) as comment,
  fs.srvname as foreign_server_name,
  fdw.fdwname as foreign_data_wrapper_name,
  handler.proname as foreign_data_wrapper_handler
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  inner join pg_foreign_table ft on ft.ftrelid = c.oid
  inner join pg_foreign_server fs on fs.oid = ft.ftserver
  inner join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
  inner join pg_proc handler on handler.oid = fdw.fdwhandler
where
  c.relkind = 'f'
`,y=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),comment:t.z.string().nullable(),foreign_server_name:t.z.string(),foreign_data_wrapper_name:t.z.string(),foreign_data_wrapper_handler:t.z.string(),columns:p.optional()}),S=t.z.array(y),T=t.z.optional(y),N=({includeColumns:e})=>`
with foreign_tables as (${A})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = foreign_tables.id")}`:""}
from foreign_tables`,v=`
-- CTE with sane arg_modes, arg_names, and arg_types.
-- All three are always of the same length.
-- All three include all args, including OUT and TABLE args.
with functions as (
  select
    *,
    -- proargmodes is null when all arg modes are IN
    coalesce(
      p.proargmodes,
      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_modes,
    -- proargnames is null when all args are unnamed
    coalesce(
      p.proargnames,
      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_names,
    -- proallargtypes is null when all arg modes are IN
    coalesce(p.proallargtypes, p.proargtypes) as arg_types,
    array_cat(
      array_fill(false, array[pronargs - pronargdefaults]),
      array_fill(true, array[pronargdefaults])) as arg_has_defaults
  from
    pg_proc as p
  where
    p.prokind = 'f'
)
select
  f.oid as id,
  n.nspname as schema,
  f.proname as name,
  l.lanname as language,
  case
    when l.lanname = 'internal' then ''
    else f.prosrc
  end as definition,
  case
    when l.lanname = 'internal' then f.prosrc
    else pg_get_functiondef(f.oid)
  end as complete_statement,
  coalesce(f_args.args, '[]') as args,
  pg_get_function_arguments(f.oid) as argument_types,
  pg_get_function_identity_arguments(f.oid) as identity_argument_types,
  f.prorettype as return_type_id,
  pg_get_function_result(f.oid) as return_type,
  nullif(rt.typrelid, 0) as return_type_relation_id,
  f.proretset as is_set_returning_function,
  case
    when f.provolatile = 'i' then 'IMMUTABLE'
    when f.provolatile = 's' then 'STABLE'
    when f.provolatile = 'v' then 'VOLATILE'
  end as behavior,
  f.prosecdef as security_definer,
  f_config.config_params as config_params
from
  functions f
  left join pg_namespace n on f.pronamespace = n.oid
  left join pg_language l on f.prolang = l.oid
  left join pg_type rt on rt.oid = f.prorettype
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as config_params
    from
      (
        select
          oid,
          (string_to_array(unnest(proconfig), '='))[1] as param,
          (string_to_array(unnest(proconfig), '='))[2] as value
        from
          functions
      ) as t
    group by
      oid
  ) f_config on f_config.oid = f.oid
  left join (
    select
      oid,
      jsonb_agg(jsonb_build_object(
        'mode', t2.mode,
        'name', name,
        'type_id', type_id,
        -- Cast null into false boolean
        'has_default', COALESCE(has_default, false)
      )) as args
    from
      (
        select
          oid,
          unnest(arg_modes) as mode,
          unnest(arg_names) as name,
          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume
          -- integer, we need to cast it to be properly parsed
          unnest(arg_types)::int8 as type_id,
          unnest(arg_has_defaults) as has_default
        from
          functions
      ) as t1,
      lateral (
        select
          case
            when t1.mode = 'i' then 'in'
            when t1.mode = 'o' then 'out'
            when t1.mode = 'b' then 'inout'
            when t1.mode = 'v' then 'variadic'
            else 'table'
          end as mode
      ) as t2
    group by
      t1.oid
  ) f_args on f_args.oid = f.oid
`,w=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),language:t.z.string(),definition:t.z.string(),complete_statement:t.z.string(),args:t.z.array(t.z.object({mode:t.z.union([t.z.literal("in"),t.z.literal("out"),t.z.literal("inout"),t.z.literal("variadic"),t.z.literal("table")]),name:t.z.string(),type_id:t.z.number(),has_default:t.z.boolean()})),argument_types:t.z.string(),identity_argument_types:t.z.string(),return_type_id:t.z.number(),return_type:t.z.string(),return_type_relation_id:t.z.union([t.z.number(),t.z.null()]),is_set_returning_function:t.z.boolean(),behavior:t.z.union([t.z.literal("IMMUTABLE"),t.z.literal("STABLE"),t.z.literal("VOLATILE")]),security_definer:t.z.boolean(),config_params:t.z.union([t.z.record(t.z.string(),t.z.string()),t.z.null()])}),L=t.z.array(w),R=t.z.optional(w);function I({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l}={}){let o=`
    with f as (
      ${v}
    )
    select
      f.*
    from f
  `,s=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(o+=` where schema ${s}`),i&&(o=`${o} limit ${i}`),l&&(o=`${o} offset ${l}`),{sql:o,zod:L}}function O({id:e,name:t,schema:n="public",args:i=[]}){if(e)return{sql:`
      with f as (
        ${v}
      )
      select
        f.*
      from f where id = ${(0,a.literal)(e)};`,zod:R};if(t&&n&&i)return{sql:`with f as (
      ${v}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${(0,a.literal)(n)} and name = ${(0,a.literal)(t)} and p.proargtypes::text = ${i.length?`(
          select string_agg(type_oid::text, ' ') from (
            select (
              split_args.arr[
                array_length(
                  split_args.arr,
                  1
                )
              ]::regtype::oid
            ) as type_oid from (
              select string_to_array(
                unnest(
                  array[${i.map(a.literal)}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:(0,a.literal)("")}`,zod:R};throw Error("Must provide either id or name and schema")}let C=t.z.object({name:t.z.string(),definition:t.z.string(),args:t.z.array(t.z.string()).optional(),behavior:t.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:t.z.record(t.z.string(),t.z.string()).optional(),schema:t.z.string().optional(),language:t.z.string().optional(),return_type:t.z.string().optional(),security_definer:t.z.boolean().optional()});function x({name:e,schema:t,args:n,definition:i,return_type:r,language:l,behavior:o,security_definer:s,config_params:d},{replace:c=!1}={}){return`
    CREATE ${c?"OR REPLACE":""} FUNCTION ${(0,a.ident)(t)}.${(0,a.ident)(e)}(${n?.join(", ")||""})
    RETURNS ${r}
    AS ${(0,a.literal)(i)}
    LANGUAGE ${l}
    ${o}
    CALLED ON NULL INPUT
    ${s?"SECURITY DEFINER":"SECURITY INVOKER"}
    ${d?Object.entries(d).map(([e,t])=>`SET ${e} ${"FROM CURRENT"===t?"FROM CURRENT":"TO "+('""'===t?"''":t)}`).join("\n"):""};
  `}function D({name:e,schema:n="public",args:a=[],definition:i,return_type:r="void",language:l="sql",behavior:o="VOLATILE",security_definer:s=!1,config_params:d={}}){return{sql:x({name:e,schema:n,args:a,definition:i,return_type:r,language:l,behavior:o,security_definer:s,config_params:d}),zod:t.z.void()}}let j=t.z.object({name:t.z.string().optional(),schema:t.z.string().optional(),definition:t.z.string().optional()});function U(e,{name:n,schema:i,definition:r}){let l=e.argument_types.split(", "),o=e.identity_argument_types,s="string"==typeof r?x({...e,definition:r,args:l,config_params:e.config_params??{}},{replace:!0}):"",d=n&&n!==e.name?`ALTER FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}(${o}) RENAME TO ${(0,a.ident)(n)};`:"",c=i&&i!==e.schema?`ALTER FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(n||e.name)}(${o})  SET SCHEMA ${(0,a.ident)(i)};`:"";return{sql:`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof r?"TRUE":"FALSE"} THEN
        ${s}

        IF (
          SELECT id
          FROM (${v}) AS f
          WHERE f.schema = ${(0,a.literal)(e.schema)}
          AND f.name = ${(0,a.literal)(e.name)}
          AND f.identity_argument_types = ${(0,a.literal)(o)}
        ) != ${e.id} THEN
          RAISE EXCEPTION 'Cannot find function "${e.schema}"."${e.name}"(${o})';
        END IF;
      END IF;

      ${d}

      ${c}
    END;
    $$;
  `,zod:t.z.void()}}let M=t.z.object({cascade:t.z.boolean().default(!1).optional()});function F(e,{cascade:n=!1}={}){return{sql:`DROP FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}
  (${e.identity_argument_types})
  ${n?"CASCADE":"RESTRICT"};`,zod:t.z.void()}}e.s(["create",()=>D,"list",()=>I,"pgFunctionArrayZod",0,L,"pgFunctionCreateZod",0,C,"pgFunctionDeleteZod",0,M,"pgFunctionOptionalZod",0,R,"pgFunctionUpdateZod",0,j,"pgFunctionZod",0,w,"remove",()=>F,"retrieve",()=>O,"update",()=>U],198687);var k=e.i(198687);let H=`
  SELECT
    idx.indexrelid::int8 AS id,
    idx.indrelid::int8 AS table_id,
    n.nspname AS schema,
    idx.indnatts AS number_of_attributes,
    idx.indnkeyatts AS number_of_key_attributes,
    idx.indisunique AS is_unique,
    idx.indisprimary AS is_primary,
    idx.indisexclusion AS is_exclusion,
    idx.indimmediate AS is_immediate,
    idx.indisclustered AS is_clustered,
    idx.indisvalid AS is_valid,
    idx.indcheckxmin AS check_xmin,
    idx.indisready AS is_ready,
    idx.indislive AS is_live,
    idx.indisreplident AS is_replica_identity,
    idx.indkey::smallint[] AS key_attributes,
    idx.indcollation::integer[] AS collation,
    idx.indclass::integer[] AS class,
    idx.indoption::smallint[] AS options,
    idx.indpred AS index_predicate,
    obj_description(idx.indexrelid, 'pg_class') AS comment,
    ix.indexdef as index_definition,
    am.amname AS access_method,
    jsonb_agg(
      jsonb_build_object(
        'attribute_number', a.attnum,
        'attribute_name', a.attname,
        'data_type', format_type(a.atttypid, a.atttypmod)
      )
      ORDER BY a.attnum
    ) AS index_attributes
  FROM
    pg_index idx
    JOIN pg_class c ON c.oid = idx.indexrelid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_am am ON c.relam = am.oid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
    JOIN pg_indexes ix ON c.relname = ix.indexname
  GROUP BY
    idx.indexrelid, idx.indrelid, n.nspname, idx.indnatts, idx.indnkeyatts, idx.indisunique, 
    idx.indisprimary, idx.indisexclusion, idx.indimmediate, idx.indisclustered, idx.indisvalid, 
    idx.indcheckxmin, idx.indisready, idx.indislive, idx.indisreplident, idx.indkey, 
    idx.indcollation, idx.indclass, idx.indoption, idx.indexprs, idx.indpred, ix.indexdef, am.amname
`,q=t.z.object({id:t.z.number(),table_id:t.z.number(),schema:t.z.string(),number_of_attributes:t.z.number(),number_of_key_attributes:t.z.number(),is_unique:t.z.boolean(),is_primary:t.z.boolean(),is_exclusion:t.z.boolean(),is_immediate:t.z.boolean(),is_clustered:t.z.boolean(),is_valid:t.z.boolean(),check_xmin:t.z.boolean(),is_ready:t.z.boolean(),is_live:t.z.boolean(),is_replica_identity:t.z.boolean(),key_attributes:t.z.array(t.z.number()),collation:t.z.array(t.z.number()),class:t.z.array(t.z.number()),options:t.z.array(t.z.number()),index_predicate:t.z.string().nullable(),comment:t.z.string().nullable(),index_definition:t.z.string(),access_method:t.z.string(),index_attributes:t.z.array(t.z.object({attribute_number:t.z.number(),attribute_name:t.z.string(),data_type:t.z.string()}))}),B=t.z.array(q),P=t.z.optional(q),W=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  c.relispopulated as is_populated,
  obj_description(c.oid) as comment
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
where
  c.relkind = 'm'
`,Y=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_populated:t.z.boolean(),comment:t.z.string().nullable(),columns:p.optional()}),G=t.z.array(Y),Q=t.z.optional(Y),J=({includeColumns:e})=>`
with materialized_views as (${W})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = materialized_views.id")}`:""}
from materialized_views`,X=`
select
  pol.oid :: int8 as id,
  n.nspname as schema,
  c.relname as table,
  c.oid :: int8 as table_id,
  pol.polname as name,
  case
    when pol.polpermissive then 'PERMISSIVE'::text
    else 'RESTRICTIVE'::text
  end as action,
  case
    when pol.polroles = '{0}'::oid[] then array_to_json(string_to_array('public'::text, ''::text)::name[])
    else array_to_json(array(
      select pg_roles.rolname
      from pg_roles
      where pg_roles.oid = any(pol.polroles)
      order by pg_roles.rolname
    ))
  end as roles,
  case pol.polcmd
    when 'r'::"char" then 'SELECT'::text
    when 'a'::"char" then 'INSERT'::text
    when 'w'::"char" then 'UPDATE'::text
    when 'd'::"char" then 'DELETE'::text
    when '*'::"char" then 'ALL'::text
    else null::text
  end as command,
  pg_get_expr(pol.polqual, pol.polrelid) as definition,
  pg_get_expr(pol.polwithcheck, pol.polrelid) as check
from
  pg_policy pol
  join pg_class c on c.oid = pol.polrelid
  left join pg_namespace n on n.oid = c.relnamespace
`,V=t.z.object({id:t.z.number(),schema:t.z.string(),table:t.z.string(),table_id:t.z.number(),name:t.z.string(),action:t.z.union([t.z.literal("PERMISSIVE"),t.z.literal("RESTRICTIVE")]),roles:t.z.array(t.z.string()),command:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("ALL")]),definition:t.z.union([t.z.string(),t.z.null()]),check:t.z.union([t.z.string(),t.z.null()])}),K=t.z.array(V),Z=t.z.optional(V),ee=`
SELECT
  p.oid :: int8 AS id,
  p.pubname AS name,
  p.pubowner::regrole::text AS owner,
  p.pubinsert AS publish_insert,
  p.pubupdate AS publish_update,
  p.pubdelete AS publish_delete,
  p.pubtruncate AS publish_truncate,
  CASE
    WHEN p.puballtables THEN NULL
    ELSE pr.tables
  END AS tables
FROM
  pg_catalog.pg_publication AS p
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        array_agg(
          json_build_object(
            'id',
            c.oid :: int8,
            'name',
            c.relname,
            'schema',
            nc.nspname
          )
        ),
        '{}'
      ) AS tables
    FROM
      pg_catalog.pg_publication_rel AS pr
      JOIN pg_class AS c ON pr.prrelid = c.oid
      join pg_namespace as nc on c.relnamespace = nc.oid
    WHERE
      pr.prpubid = p.oid
  ) AS pr ON 1 = 1
`,et=t.z.object({id:t.z.number().optional(),name:t.z.string(),schema:t.z.string()}),en=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),publish_insert:t.z.boolean(),publish_update:t.z.boolean(),publish_delete:t.z.boolean(),publish_truncate:t.z.boolean(),tables:t.z.array(et).nullable()}),ea=t.z.array(en),ei=t.z.optional(en),er=`
-- Can't use pg_authid here since some managed Postgres providers don't expose it
-- https://github.com/supabase/postgres-meta/issues/212

select
  r.oid as id,
  rolname as name,
  rolsuper as "isSuperuser",
  rolcreatedb as "canCreateDb",
  rolcreaterole as "canCreateRole",
  rolinherit as "inheritRole",
  rolcanlogin as "canLogin",
  rolreplication as "isReplicationRole",
  rolbypassrls as "canBypassRls",
  (
    select
      count(*)
    from
      pg_stat_activity
    where
      r.rolname = pg_stat_activity.usename
  ) as "activeConnections",
  case when rolconnlimit = -1 then current_setting('max_connections') :: int8
       else rolconnlimit
  end as "connectionLimit",
  rolvaliduntil as "validUntil",
  coalesce(r_config.role_configs, '{}') as config
from
  pg_roles r
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as role_configs
    from
      (
        select
          oid,
          (string_to_array(unnest(rolconfig), '='))[1] as param,
          (string_to_array(unnest(rolconfig), '='))[2] as value
        from
          pg_roles
      ) as _
    group by
      oid
  ) r_config on r_config.oid = r.oid
`,el=t.z.object({id:t.z.number(),name:t.z.string(),isSuperuser:t.z.boolean(),canCreateDb:t.z.boolean(),canCreateRole:t.z.boolean(),inheritRole:t.z.boolean(),canLogin:t.z.boolean(),isReplicationRole:t.z.boolean(),canBypassRls:t.z.boolean(),activeConnections:t.z.number(),connectionLimit:t.z.number(),validUntil:t.z.union([t.z.string(),t.z.null()]),config:t.z.record(t.z.string(),t.z.string())}),eo=t.z.array(el),es=t.z.optional(el);function ed(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or name")}let ec=`
-- Adapted from information_schema.schemata

select
  n.oid as id,
  n.nspname as name,
  u.rolname as owner,
   obj_description(n.oid, 'pg_namespace') AS comment
from
  pg_namespace n,
  pg_roles u
where
  n.nspowner = u.oid
  and (
    pg_has_role(n.nspowner, 'USAGE')
    or has_schema_privilege(n.oid, 'CREATE, USAGE')
  )
  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')
  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')
`,em=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),comment:t.z.string().nullable()}),ep=t.z.array(em),eu=t.z.optional(em),e_=`
-- Despite the name \`table_privileges\`, this includes other kinds of relations:
-- views, matviews, etc. "Relation privileges" just doesn't roll off the tongue.
--
-- For each relation, get its relacl in a jsonb format,
-- e.g.
--
-- '{postgres=arwdDxt/postgres}'
--
-- becomes
--
-- [
--   {
--     "grantee": "postgres",
--     "grantor": "postgres",
--     "is_grantable": false,
--     "privilege_type": "INSERT"
--   },
--   ...
-- ]
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,eg=t.z.object({relation_id:t.z.number(),schema:t.z.string(),name:t.z.string(),kind:t.z.union([t.z.literal("table"),t.z.literal("view"),t.z.literal("materialized_view"),t.z.literal("foreign_table"),t.z.literal("partitioned_table")]),privileges:t.z.array(t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("TRUNCATE"),t.z.literal("REFERENCES"),t.z.literal("TRIGGER"),t.z.literal("MAINTAIN")]),is_grantable:t.z.boolean()}))}),e$=t.z.array(eg),eh=t.z.optional(eg),eE=`
SELECT
  c.oid :: int8 AS id,
  nc.nspname AS schema,
  c.relname AS name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  CASE
    WHEN c.relreplident = 'd' THEN 'DEFAULT'
    WHEN c.relreplident = 'i' THEN 'INDEX'
    WHEN c.relreplident = 'f' THEN 'FULL'
    ELSE 'NOTHING'
  END AS replica_identity,
  pg_total_relation_size(format('%I.%I', nc.nspname, c.relname)) :: int8 AS bytes,
  pg_size_pretty(
    pg_total_relation_size(format('%I.%I', nc.nspname, c.relname))
  ) AS size,
  pg_stat_get_live_tuples(c.oid) AS live_rows_estimate,
  pg_stat_get_dead_tuples(c.oid) AS dead_rows_estimate,
  obj_description(c.oid) AS comment,
  coalesce(pk.primary_keys, '[]') as primary_keys,
  coalesce(
    jsonb_agg(relationships) filter (where relationships is not null),
    '[]'
  ) as relationships
FROM
  pg_namespace nc
  JOIN pg_class c ON nc.oid = c.relnamespace
  left join (
    select
      c.oid::int8 as table_id,
      jsonb_agg(
        jsonb_build_object(
          'table_id', c.oid::int8,
          'schema', n.nspname,
          'table_name', c.relname,
          'name', a.attname
        )
        order by array_position(i.indkey, a.attnum)
      ) as primary_keys
    from
      pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
    where
      i.indisprimary
    group by c.oid
  ) as pk
  on pk.table_id = c.oid
  left join (
    select
      c.oid :: int8 as id,
      c.conname as constraint_name,
      nsa.nspname as source_schema,
      csa.relname as source_table_name,
      sa.attname as source_column_name,
      nta.nspname as target_table_schema,
      cta.relname as target_table_name,
      ta.attname as target_column_name
    from
      pg_constraint c
    join (
      pg_attribute sa
      join pg_class csa on sa.attrelid = csa.oid
      join pg_namespace nsa on csa.relnamespace = nsa.oid
    ) on sa.attrelid = c.conrelid and sa.attnum = any (c.conkey)
    join (
      pg_attribute ta
      join pg_class cta on ta.attrelid = cta.oid
      join pg_namespace nta on cta.relnamespace = nta.oid
    ) on ta.attrelid = c.confrelid and ta.attnum = any (c.confkey)
    where
      c.contype = 'f'
  ) as relationships
  on (relationships.source_schema = nc.nspname and relationships.source_table_name = c.relname)
  or (relationships.target_table_schema = nc.nspname and relationships.target_table_name = c.relname)
WHERE
  c.relkind IN ('r', 'p')
  AND NOT pg_is_other_temp_schema(nc.oid)
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
    )
    OR has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  c.relname,
  c.relrowsecurity,
  c.relforcerowsecurity,
  c.relreplident,
  nc.nspname,
  pk.primary_keys
`,eb=t.z.object({table_id:t.z.number(),name:t.z.string(),schema:t.z.string(),table_name:t.z.string()}),ef=t.z.object({id:t.z.number(),constraint_name:t.z.string(),source_schema:t.z.string(),source_table_name:t.z.string(),source_column_name:t.z.string(),target_table_schema:t.z.string(),target_table_name:t.z.string(),target_column_name:t.z.string()}),ez=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),rls_enabled:t.z.boolean(),rls_forced:t.z.boolean(),replica_identity:t.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:t.z.number(),size:t.z.string(),live_rows_estimate:t.z.number(),dead_rows_estimate:t.z.number(),comment:t.z.string().nullable(),primary_keys:t.z.array(eb),relationships:t.z.array(ef),columns:p.optional()}),eA=t.z.array(ez);function ey({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l,includeColumns:o=!0}={}){let s=eN({includeColumns:o}),d=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),l&&(s+=` offset ${l}`),{sql:s,zod:eA}}function eS(e){let t=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eN({includeColumns:!0})} where ${t};`,zod:ez}}function eT(e,{cascade:t=!1}={}){return{sql:`DROP TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}}let eN=({includeColumns:e})=>`
  with tables as (${eE})
  ${e?`, columns as (${c})`:""}
  select
    *
    ${e?`, ${i("columns","columns.table_id = tables.id")}`:""}
  from tables`;function ev({name:e,schema:t="public",comment:n}){let i=`CREATE TABLE ${(0,a.ident)(t)}.${(0,a.ident)(e)} ();`,r=void 0!=n?`COMMENT ON TABLE ${(0,a.ident)(t)}.${(0,a.ident)(e)} IS ${(0,a.literal)(n)};`:"";return{sql:`BEGIN; ${i} ${r} COMMIT;`}}function ew(e,{name:t,schema:n,rls_enabled:i,rls_forced:r,replica_identity:l,replica_identity_index:o,primary_keys:s,comment:d}){let c=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}`,m=void 0===n?"":`${c} SET SCHEMA ${(0,a.ident)(n)};`,p="";if(void 0!==t&&t!==e.name){let i=void 0===n?e.schema:n;p=`ALTER TABLE ${(0,a.ident)(i)}.${(0,a.ident)(e.name)} RENAME TO ${(0,a.ident)(t)};`}let u="";if(void 0!==i){let e=`${c} ENABLE ROW LEVEL SECURITY;`,t=`${c} DISABLE ROW LEVEL SECURITY;`;u=i?e:t}let _="";if(void 0!==r){let e=`${c} FORCE ROW LEVEL SECURITY;`,t=`${c} NO FORCE ROW LEVEL SECURITY;`;_=r?e:t}let g="";void 0===l||(g="INDEX"===l?`${c} REPLICA IDENTITY USING INDEX ${o};`:`${c} REPLICA IDENTITY ${l};`);let $="";void 0===s||($+=`
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${(0,a.literal)(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${(0,a.literal)(`${c} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===s.length||($+=`${c} ADD PRIMARY KEY (${s.map(e=>(0,a.ident)(e.name)).join(",")});`));let h=void 0==d?"":`COMMENT ON TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)} IS ${(0,a.literal)(d)};`;return{sql:`
BEGIN;
  ${u}
  ${_}
  ${g}
  ${$}
  ${h}
  ${m}
  ${p}
COMMIT;`}}e.s(["create",()=>ev,"list",()=>ey,"remove",()=>eT,"retrieve",()=>eS,"update",()=>ew],330006);var eL=e.i(330006);let eR=`
SELECT
  pg_t.oid AS id,
  pg_t.tgrelid AS table_id,
  CASE
    WHEN pg_t.tgenabled = 'D' THEN 'DISABLED'
    WHEN pg_t.tgenabled = 'O' THEN 'ORIGIN'
    WHEN pg_t.tgenabled = 'R' THEN 'REPLICA'
    WHEN pg_t.tgenabled = 'A' THEN 'ALWAYS'
  END AS enabled_mode,
  (
    STRING_TO_ARRAY(
      ENCODE(pg_t.tgargs, 'escape'), '\\000'
    )
  )[:pg_t.tgnargs] AS function_args,
  is_t.trigger_name AS name,
  is_t.event_object_table AS table,
  is_t.event_object_schema AS schema,
  is_t.action_condition AS condition,
  is_t.action_orientation AS orientation,
  is_t.action_timing AS activation,
  ARRAY_AGG(is_t.event_manipulation)::text[] AS events,
  pg_p.proname AS function_name,
  pg_n.nspname AS function_schema
FROM
  pg_trigger AS pg_t
JOIN
  pg_class AS pg_c
ON pg_t.tgrelid = pg_c.oid
JOIN information_schema.triggers AS is_t
ON is_t.trigger_name = pg_t.tgname
AND pg_c.relname = is_t.event_object_table
AND pg_c.relnamespace = (quote_ident(is_t.event_object_schema))::regnamespace
JOIN pg_proc AS pg_p
ON pg_t.tgfoid = pg_p.oid
JOIN pg_namespace AS pg_n
ON pg_p.pronamespace = pg_n.oid
GROUP BY
  pg_t.oid,
  pg_t.tgrelid,
  pg_t.tgenabled,
  pg_t.tgargs,
  pg_t.tgnargs,
  is_t.trigger_name,
  is_t.event_object_table,
  is_t.event_object_schema,
  is_t.action_condition,
  is_t.action_orientation,
  is_t.action_timing,
  pg_p.proname,
  pg_n.nspname
`,eI=t.z.object({id:t.z.number(),table_id:t.z.number(),enabled_mode:t.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:t.z.array(t.z.string()),name:t.z.string(),table:t.z.string(),schema:t.z.string(),condition:t.z.string().nullable(),orientation:t.z.string(),activation:t.z.string(),events:t.z.array(t.z.string()),function_name:t.z.string(),function_schema:t.z.string()}),eO=t.z.array(eI),eC=t.z.optional(eI);t.z.object({name:t.z.string(),schema:t.z.string().optional().default("public"),table:t.z.string(),function_schema:t.z.string().optional().default("public"),function_name:t.z.string(),function_args:t.z.array(t.z.string()).optional(),activation:t.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:t.z.array(t.z.string()),orientation:t.z.enum(["ROW","STATEMENT"]).optional(),condition:t.z.string().optional()}),t.z.object({name:t.z.string().optional(),enabled_mode:t.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()});let ex=`
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(t_enums.enums, '[]') as enums,
  coalesce(t_attributes.attributes, '[]') as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
  left join (
    select
      enumtypid,
      jsonb_agg(enumlabel order by enumsortorder) as enums
    from
      pg_enum
    group by
      enumtypid
  ) as t_enums on t_enums.enumtypid = t.oid
  left join (
    select
      oid,
      jsonb_agg(
        jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
        order by a.attnum asc
      ) as attributes
    from
      pg_class c
      join pg_attribute a on a.attrelid = c.oid
    where
      c.relkind = 'c' and not a.attisdropped
    group by
      c.oid
  ) as t_attributes on t_attributes.oid = t.typrelid
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,eD=t.z.object({id:t.z.number(),name:t.z.string(),schema:t.z.string(),format:t.z.string(),enums:t.z.array(t.z.string()),attributes:t.z.array(t.z.object({name:t.z.string(),type_id:t.z.number()})),comment:t.z.string().nullable()}),ej=t.z.array(eD),eU=`
select
  version(),
  current_setting('server_version_num')::int8 as version_number,
  (
    select
      count(*) as active_connections
    from
      pg_stat_activity
  ) as active_connections,
  current_setting('max_connections')::int8 as max_connections
`,eM=t.z.object({version:t.z.string(),version_number:t.z.number(),active_connections:t.z.number(),max_connections:t.z.number()}),eF=`
SELECT
  c.oid :: int8 AS id,
  n.nspname AS schema,
  c.relname AS name,
  (pg_relation_is_updatable(c.oid, false) & 20) = 20 AS is_updatable,
  obj_description(c.oid) AS comment
FROM
  pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'v'
`,ek=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_updatable:t.z.boolean(),comment:t.z.string().nullable(),columns:p.optional()}),eH=t.z.array(ek),eq=t.z.optional(ek),eB=({includeColumns:e})=>`
with views as (${eF})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = views.id")}`:""}
from views`;e.i(967533);var eP=e.i(721490),eW=e.i(332357),eY=e.i(193767),eG=e.i(212695),eQ=e.i(29659);e.s(["Query",()=>eP.Query,"QueryAction",()=>eG.QueryAction,"QueryFilter",()=>eY.QueryFilter,"QueryModifier",()=>eQ.QueryModifier,"countQuery",()=>eW.countQuery,"deleteQuery",()=>eW.deleteQuery,"insertQuery",()=>eW.insertQuery,"selectQuery",()=>eW.selectQuery,"truncateQuery",()=>eW.truncateQuery,"updateQuery",()=>eW.updateQuery],377171);var eJ=e.i(377171);e.s(["getUserSQL",0,e=>`
select
  auth.users.id,
  auth.users.email,
  auth.users.banned_until,
  auth.users.created_at,
  auth.users.confirmed_at,
  auth.users.confirmation_sent_at,
  auth.users.is_anonymous,
  auth.users.is_sso_user,
  auth.users.invited_at,
  auth.users.last_sign_in_at,
  auth.users.phone,
  auth.users.raw_app_meta_data,
  auth.users.raw_user_meta_data,
  auth.users.updated_at,
  coalesce(
    (
      select
        array_agg(distinct i.provider)
      from
        auth.identities i
      where
        i.user_id = users.id
    ),
    '{}'::text[]
  ) as providers
from
  auth.users
where id = '${e}';
`.trim()],100121);let eX=["idx_users_email","idx_users_created_at_desc","idx_users_last_sign_in_at_desc","idx_users_name","users_phone_key"];function eV(e,t){let n="00000000-0000-0000-0000-000000000000".split("").map((t,n)=>"-"===t?t:e[n]??t);if(e.length>=n.length)return n.join("");if(e.length&&e.length<15&&(n[14]="4"),e.length&&e.length<20&&(n[19]=t?"b":"8"),t)for(let t=e.length;t<n.length;t+=1)"0"===n[t]&&(n[t]="f");return n.join("")}function eK(e){if(!e)return[e,void 0];let t=e.charCodeAt(e.length-1);if(122===t)return[e,e+"~"];if(t>=126)return[e,e+" "];let n=e.substring(0,e.length-1)+String.fromCharCode(t+1);return[e,n]}e.s(["USER_SEARCH_INDEXES",0,eX,"getIndexStatusesSQL",0,()=>`SELECT c.relname as index_name, i.indisvalid as is_valid, i.indisready as is_ready
    FROM pg_index i
    JOIN pg_class c ON c.oid = i.indexrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth'
    AND c.relname IN (${eX.map(a.literal).join(", ")});`],822797),e.s(["getIndexWorkerStatusSQL",0,()=>`SELECT EXISTS (
    SELECT 1 FROM pg_locks
    WHERE locktype = 'advisory'
    AND (classid::bigint << 32 | objid::bigint) = hashtext('auth_index_worker')::bigint
  ) as is_in_progress;`],306255);let eZ=50;e.s(["getPaginatedUsersSQL",0,({page:e=0,verified:t,keywords:n,providers:i,sort:r,order:l,limit:o=eZ,column:s,startAt:d,cursor:c,improvedSearchEnabled:m=!1})=>{if(m)return(({column:e,keywords:t,verified:n,providers:i,sort:r,order:l,cursor:o,limit:s=eZ})=>{let d=[];if(t&&""!==t){if("email"===e){let e=eK(t);e[1]?d.push(`email >= ${(0,a.literal)(e[0])} AND email < ${(0,a.literal)(e[1])}`):d.push(`email >= ${(0,a.literal)(e[0])}`)}else if("phone"===e){let e=eK(t);e[1]?d.push(`phone >= ${(0,a.literal)(e[0])} AND phone < ${(0,a.literal)(e[1])}`):d.push(`phone >= ${(0,a.literal)(e[0])}`)}else if("id"===e)d.push(`id = ${(0,a.literal)(t)}`);else if("name"===e){let e=eK(t);e[1]?d.push(`raw_user_meta_data->>'name' >= ${(0,a.literal)(e[0])} AND raw_user_meta_data->>'name' < ${(0,a.literal)(e[1])}`):d.push(`raw_user_meta_data->>'name' >= ${(0,a.literal)(e[0])}`)}}"verified"===n?d.push("(email_confirmed_at IS NOT NULL OR phone_confirmed_at IS NOT NULL)"):"anonymous"===n?d.push("is_anonymous IS TRUE"):"unverified"===n&&d.push("(email_confirmed_at IS NULL AND phone_confirmed_at IS NULL)"),i&&i.length>0&&(i.includes("saml 2.0")?d.push(`(SELECT jsonb_agg(CASE WHEN value ~ '^sso' THEN 'sso' ELSE value END) FROM jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${i.map(e=>(0,a.literal)("saml 2.0"===e?"sso":e)).join(", ")}]`):d.push(`(raw_app_meta_data->>'providers')::jsonb ?| array[${i.map(e=>(0,a.literal)(e)).join(", ")}]`));let c=r??"created_at",m=l??"desc";if(o){let e="desc"===m?"<":">";"id"===c?d.push(`id ${e} ${(0,a.literal)(o.id)}::uuid`):d.push(`(${(0,a.ident)(c)}, id) ${e} (${(0,a.literal)(o.sort)}, ${(0,a.literal)(o.id)}::uuid)`)}let p=d.map(e=>`(${e})`).join(" AND "),u=d.length>0?`WHERE ${p}`:"",_="id"===c?`${(0,a.ident)(c)} ${m}`:`${(0,a.ident)(c)} ${m}, id ${m}`,g=`
    SELECT
      auth.users.id,
      auth.users.email,
      auth.users.banned_until,
      auth.users.created_at,
      auth.users.confirmed_at,
      auth.users.confirmation_sent_at,
      auth.users.is_anonymous,
      auth.users.is_sso_user,
      auth.users.invited_at,
      auth.users.last_sign_in_at,
      auth.users.phone,
      auth.users.raw_app_meta_data,
      auth.users.raw_user_meta_data
    FROM
      auth.users
    ${u}
    ORDER BY
      ${_}
    LIMIT
      ${s}`;return`
WITH
  users_data AS (${g})
SELECT
  *,
  COALESCE(
    (
      SELECT
        array_agg(DISTINCT i.provider)
      FROM
        auth.identities i
      WHERE
        i.user_id = users_data.id
    ),
    '{}'::text[]
  ) AS providers
FROM
  users_data;`.trim()})({column:s??"email",keywords:n,verified:t,providers:i,sort:r,order:l,limit:o,cursor:c});let p=e*o,u=[];if(n&&""!==n){let e=`%${n}%`;u.push(`id::text like ${(0,a.literal)(e)} or email like ${(0,a.literal)(e)} or phone like ${(0,a.literal)(e)} or raw_user_meta_data->>'full_name' ilike ${(0,a.literal)(e)} or raw_user_meta_data->>'first_name' ilike ${(0,a.literal)(e)} or raw_user_meta_data->>'last_name' ilike ${(0,a.literal)(e)} or raw_user_meta_data->>'display_name' ilike ${(0,a.literal)(e)}`)}"verified"===t?u.push("email_confirmed_at IS NOT NULL or phone_confirmed_at IS NOT NULL"):"anonymous"===t?u.push("is_anonymous is true"):"unverified"===t&&u.push("email_confirmed_at IS NULL AND phone_confirmed_at IS NULL"),i&&i.length>0&&(i.includes("saml 2.0")?u.push(`(select jsonb_agg(case when value ~ '^sso' then 'sso' else value end) from jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${i.map(e=>(0,a.literal)("saml 2.0"===e?"sso":e)).join(", ")}]`.trim()):u.push(`(raw_app_meta_data->>'providers')::jsonb ?| array[${i.map(e=>(0,a.literal)(e)).join(", ")}]`));let _=u.map(e=>`(${e})`).join(" and "),g=l??"desc",$=`${u.length>0?` where ${_}`:""}
    order by
      ${(0,a.ident)(r??"created_at")} ${g} nulls last
    limit
      ${o}
    offset
      ${p}
  `,h=d?">":">=";if("email"===s){let e=eK(n??"");$=`where lower(email) ${h} ${(0,a.literal)(d||e[0])} ${e[1]?`and lower(email) < ${(0,a.literal)(e[1])}`:""} and instance_id = '00000000-0000-0000-0000-000000000000'::uuid order by instance_id, lower(email) asc limit ${o}`}else if("phone"===s){let e=eK(n??"");$=`where phone ${h} ${(0,a.literal)(d||e[0])} ${e[1]?`and phone < ${(0,a.literal)(e[1])}`:""} order by phone asc limit ${o}`}else"id"===s&&($=eV(n??"",!1)===n?`where id = ${(0,a.literal)(n)} order by id asc limit ${o}`:`where id ${h} ${(0,a.literal)(d||eV(n??"",!1))} and id < ${(0,a.literal)(eV(n??"",!0))} order by id asc limit ${o}`);let E=`
    select
      auth.users.id,
      auth.users.email,
      auth.users.banned_until,
      auth.users.created_at,
      auth.users.confirmed_at,
      auth.users.confirmation_sent_at,
      auth.users.is_anonymous,
      auth.users.is_sso_user,
      auth.users.invited_at,
      auth.users.last_sign_in_at,
      auth.users.phone,
      auth.users.raw_app_meta_data,
      auth.users.raw_user_meta_data,
      auth.users.updated_at
    from
      auth.users
    ${$}`;return`
with
  users_data as (${E})
select
  *,
  coalesce(
    (
      select
        array_agg(distinct i.provider)
      from
        auth.identities i
      where
        i.user_id = users_data.id
    ),
    '{}'::text[]
  ) as providers
from
  users_data;
  `.trim()}],556955);let e0=`
CREATE OR REPLACE FUNCTION pg_temp.count_estimate(
    query text
) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE
    plan jsonb;
BEGIN
    EXECUTE 'EXPLAIN (FORMAT JSON)' || query INTO plan;
    RETURN plan->0->'Plan'->'Plan Rows';
END;
$$;
`.trim();e.s(["COUNT_ESTIMATE_SQL",0,e0,"THRESHOLD_COUNT",0,5e4],899850),e.s(["getUsersCountSQL",0,({filter:e,keywords:t,providers:n,forceExactCount:i=!1,column:r})=>{let l=t&&""!==t,o=[],s="select count(*) from auth.users";if(r&&l){if("email"===r){let e=eK(t),n=(0,a.literal)(e[0]),i=e[1]?(0,a.literal)(e[1]):null;o.push(`lower(email) >= ${n}${i?` and lower(email) < ${i}`:""} and instance_id = '00000000-0000-0000-0000-000000000000'::uuid`)}else if("phone"===r){let e=eK(t),n=(0,a.literal)(e[0]),i=e[1]?(0,a.literal)(e[1]):null;o.push(`phone >= ${n}${i?` and phone < ${i}`:""}`)}else if("id"===r){let e=eV(t,!1);if(e===t)o.push(`id = ${(0,a.literal)(t)}`);else{let n=eV(t,!0);o.push(`id >= ${(0,a.literal)(e)} and id < ${(0,a.literal)(n)}`)}}}else{if(l){let e=(0,a.literal)(`%${t}%`);o.push(`id::text ilike ${e} or email ilike ${e} or phone ilike ${e}`)}if("verified"===e?o.push("email_confirmed_at IS NOT NULL or phone_confirmed_at IS NOT NULL"):"anonymous"===e?o.push("is_anonymous is true"):"unverified"===e&&o.push("email_confirmed_at IS NULL AND phone_confirmed_at IS NULL"),n&&n.length>0)if(n.includes("saml 2.0")){let e=n.map(e=>"saml 2.0"===e?"sso":e);o.push(`(select jsonb_agg(case when value ~ '^sso' then 'sso' else value end) from jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${(0,a.literal)(e)}]`.trim())}else o.push(`(raw_app_meta_data->>'providers')::jsonb ?| array[${(0,a.literal)(n)}]`)}let d=o.map(e=>`(${e})`).join(" and "),c=o.length>0?` where ${d}`:"";if(i)return`select (${s}${c}), false as is_estimate;`;{let e=`select * from auth.users${c}`,t=`${s}${c}`,n=(0,a.literal)(e);return`
${e0}

with approximation as (select reltuples as estimate from pg_class where oid = 'auth.users'::regclass)
select 
  case 
    when estimate = -1 then (select pg_temp.count_estimate(${n}))::int
    when estimate > 50000 then ${o.length>0?`(select pg_temp.count_estimate(${n}))::int`:"estimate::int"}
    else (${t})
  end as count,
  estimate = -1 or estimate > 50000 as is_estimate
from approximation;
`.trim()}}],640696),e.s(["default",0,{roles:{list:function({includeDefaultRoles:e=!1,limit:t,offset:n}={}){let a=`
with
  roles as (${er})
select
  *
from
  roles
where
  true
`;return e||(a+=" and not pg_catalog.starts_with(name, 'pg_')"),t&&(a+=` limit ${t}`),n&&(a+=` offset ${n}`),{sql:a,zod:eo}},retrieve:function(e){return{sql:`with roles as (${er}) select * from roles where ${ed(e)};`,zod:es}},create:function({name:e,isSuperuser:t=!1,canCreateDb:n=!1,canCreateRole:i=!1,inheritRole:r=!0,canLogin:l=!1,isReplicationRole:o=!1,canBypassRls:s=!1,connectionLimit:d=-1,password:c,validUntil:m,memberOf:p=[],members:u=[],admins:_=[],config:g={}}){return{sql:`
create role ${(0,a.ident)(e)}
  ${t?"superuser":""}
  ${n?"createdb":""}
  ${i?"createrole":""}
  ${r?"":"noinherit"}
  ${l?"login":""}
  ${o?"replication":""}
  ${s?"bypassrls":""}
  connection limit ${d}
  ${void 0===c?"":`password ${(0,a.literal)(c)}`}
  ${void 0===m?"":`valid until ${(0,a.literal)(m)}`}
  ${0===p.length?"":`in role ${p.map(a.ident).join(",")}`}
  ${0===u.length?"":`role ${u.map(a.ident).join(",")}`}
  ${0===_.length?"":`admin ${_.map(a.ident).join(",")}`}
  ;
${Object.entries(g).map(([t,n])=>`alter role ${(0,a.ident)(e)} set ${(0,a.ident)(t)} = ${(0,a.literal)(n)};`).join("\n")}
`}},update:function(e,t){let{name:n,isSuperuser:i,canCreateDb:r,canCreateRole:l,inheritRole:o,canLogin:s,isReplicationRole:d,canBypassRls:c,connectionLimit:m,password:p,validUntil:u}=t;return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ed(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===i?"":i?"superuser":"nosuperuser"}
    ${void 0===r?"":r?"createdb":"nocreatedb"}
    ${void 0===l?"":l?"createrole":"nocreaterole"}
    ${void 0===o?"":o?"inherit":"noinherit"}
    ${void 0===s?"":s?"login":"nologin"}
    ${void 0===d?"":d?"replication":"noreplication"}
    ${void 0===c?"":c?"bypassrls":"nobypassrls"}
    ${void 0===m?"":`connection limit ${m}`}
    ${void 0===p?"":`password ${(0,a.literal)(p)}`}
    ${void 0===u?"":"valid until %L"}
  ', old.name${void 0===u?"":`, ${(0,a.literal)(u)}`}));

  ${void 0===n?"":`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${(0,a.literal)(n)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${(0,a.literal)(n)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:t=!1}={}){return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ed(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${t?"if exists":""} %I;', old.name));
end
$$;
`}},zod:el},columns:{list:function({tableId:e,includeSystemSchemas:t=!1,includedSchemas:i,excludedSchemas:l,limit:o,offset:s}={}){let d=`
with
  columns as (${c})
select
  *
from
  columns
where
 true
`,m=r(i,l,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return m&&(d+=` and schema ${m}`),void 0!==e&&(d+=` and table_id = ${(0,a.literal)(e)} `),o&&(d=`${d} limit ${o}`),s&&(d=`${d} offset ${s}`),{sql:d,zod:p}},retrieve:function(e){return{sql:`WITH columns AS (${c}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`schema = ${(0,a.literal)(e.schema)} AND ${(0,a.ident)("table")} = ${(0,a.literal)(e.table)} AND name = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:u}},create:function({schema:e,table:t,name:n,type:i,default_value:r,default_value_format:l="literal",is_identity:o=!1,identity_generation:s="BY DEFAULT",is_nullable:d,is_primary_key:c=!1,is_unique:m=!1,comment:p,check:u}){let g="";if(o){if(void 0!==r)throw Error("Columns cannot both be identity and have a default value");g=`GENERATED ${s} AS IDENTITY`}else void 0===r||(g="expression"===l?`DEFAULT ${r}`:`DEFAULT ${(0,a.literal)(r)}`);let $="";void 0!==d&&($=d?"NULL":"NOT NULL");let h=void 0===u?"":`CHECK (${u})`,E=void 0===p?"":`COMMENT ON COLUMN ${(0,a.ident)(e)}.${(0,a.ident)(t)}.${(0,a.ident)(n)} IS ${(0,a.literal)(p)}`;return{sql:`
BEGIN;
  ALTER TABLE ${(0,a.ident)(e)}.${(0,a.ident)(t)} ADD COLUMN ${(0,a.ident)(n)} ${_(i)}
    ${g}
    ${$}
    ${c?"PRIMARY KEY":""}
    ${m?"UNIQUE":""}
    ${h};
  ${E};
COMMIT;`}},update:function(e,{name:t,type:n,drop_default:i=!1,default_value:r,default_value_format:l="literal",is_identity:o,identity_generation:s="BY DEFAULT",is_nullable:d,is_unique:c,comment:m,check:p}){let u,g,$=void 0===t||t===e.name?"":`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} RENAME COLUMN ${(0,a.ident)(e.name)} TO ${(0,a.ident)(t)};`,h=void 0===n?"":`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET DATA TYPE ${_(n)} USING ${(0,a.ident)(e.name)}::${_(n)};`;if(i)u=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} DROP DEFAULT;`;else if(void 0===r)u="";else{let t="expression"===l?r:(0,a.literal)(r);u=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET DEFAULT ${t};`}let E=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)}`;!1===o?E+=" DROP IDENTITY IF EXISTS;":!0===e.is_identity?void 0===s?E="":E+=` SET GENERATED ${s};`:void 0===o?E="":E+=` ADD GENERATED ${s} AS IDENTITY;`,g=void 0===d?"":d?`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} DROP NOT NULL;`:`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET NOT NULL;`;let b="";!0===e.is_unique&&!1===c?b=`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${(0,a.literal)(e.table_id)}
      AND conkey[1] = ${(0,a.literal)(e.ordinal_position)}
  LOOP
    EXECUTE ${(0,a.literal)(`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;
`:!1===e.is_unique&&!0===c&&(b=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ADD UNIQUE (${(0,a.ident)(e.name)});`);let f=void 0===m?"":`COMMENT ON COLUMN ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}.${(0,a.ident)(e.name)} IS ${(0,a.literal)(m)};`,z=void 0===p?"":`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${(0,a.literal)(e.table_id)}
    AND conkey[1] = ${(0,a.literal)(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;

  ${null!==p?`
  ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ADD CONSTRAINT ${(0,a.ident)(`${e.table}_${e.name}_check`)} CHECK (${p});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${(0,a.literal)(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${(0,a.literal)(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';
`:""}
END
$$;
`;return{sql:`
BEGIN;
  ${g}
  ${h}
  ${u}
  ${E}
  ${b}
  ${f}
  ${z}
  ${$}
COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP COLUMN ${(0,a.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}},zod:m},schemas:{list:function({includeSystemSchemas:e=!1,limit:t,offset:i}={}){let r=ec;return e||(r=`${r} and not (n.nspname in (${n.DEFAULT_SYSTEM_SCHEMAS.map(a.literal).join(",")}))`),t&&(r=`${r} limit ${t}`),i&&(r=`${r} offset ${i}`),{sql:r,zod:ep}},retrieve:function({id:e,name:t}){return e?{sql:`${ec} and n.oid = ${(0,a.literal)(e)};`,zod:eu}:{sql:`${ec} and n.nspname = ${(0,a.literal)(t)};`,zod:eu}},create:function({name:e,owner:t}){return{sql:`create schema ${(0,a.ident)(e)}
  ${void 0===t?"":`authorization ${(0,a.ident)(t)}`};
`}},update:function({id:e,name:t},{name:n,owner:i}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,a.literal)(t)}::regnamespace`:(0,a.literal)(e)};
  old record;
  new_name text := ${void 0===n?null:(0,a.literal)(n)};
  new_owner text := ${void 0===i?null:(0,a.literal)(i)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  if new_owner is not null then
    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));
  end if;

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.nspname then
    execute(format('alter schema %I rename to %I;', old.nspname, new_name));
  end if;
end
$$;
`}},remove:function({id:e,name:t},{cascade:n=!1}={}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,a.literal)(t)}::regnamespace`:(0,a.literal)(e)};
  old record;
  cascade bool := ${(0,a.literal)(n)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:em},tables:eL,functions:k,tablePrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l}={}){let o=`
with table_privileges as (${e_})
select *
from table_privileges
`,s=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(o+=` where schema ${s}`),i&&(o+=` limit ${i}`),l&&(o+=` offset ${l}`),{sql:o,zod:e$}},retrieve:function({id:e,name:t,schema:n="public"}){return e?{sql:`
with table_privileges as (${e_})
select *
from table_privileges
where table_privileges.relation_id = ${(0,a.literal)(e)};`,zod:eh}:{sql:`
with table_privileges as (${e_})
select *
from table_privileges
where table_privileges.schema = ${(0,a.literal)(n)}
  and table_privileges.name = ${(0,a.literal)(t)}
`,zod:eh}},grant:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:n,isGrantable:i})=>`execute format('grant ${e} on table %s to ${"public"===n.toLowerCase()?"public":(0,a.ident)(n)} ${i?"with grant option":""}', ${t}::regclass);`).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:n})=>`execute format('revoke ${e} on table %s from ${"public"===n.toLowerCase()?"public":(0,a.ident)(n)}', ${t}::regclass);`).join("\n")}
end $$;
`}},zod:eg},publications:{list:function({limit:e,offset:t}={}){let n=`with publications as (${ee}) select * from publications`;return e&&(n+=` limit ${e}`),t&&(n+=` offset ${t}`),{sql:n,zod:ea}},retrieve:function(e){return{sql:`with publications as (${ee}) select * from publications where ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:ei}},create:function({name:e,publish_insert:t=!1,publish_update:n=!1,publish_delete:i=!1,publish_truncate:r=!1,tables:l=null}){let o;o=null==l?"FOR ALL TABLES":0===l.length?"":`FOR TABLE ${l.map(e=>{if(!e.includes("."))return(0,a.ident)(e);let[t,...n]=e.split("."),i=n.join(".");return`${(0,a.ident)(t)}.${(0,a.ident)(i)}`}).join(",")}`;let s=[];return t&&s.push("insert"),n&&s.push("update"),i&&s.push("delete"),r&&s.push("truncate"),{sql:`
CREATE PUBLICATION ${(0,a.ident)(e)} ${o}
  WITH (publish = '${s.join(",")}');`}},update:function(e,{name:t,owner:n,publish_insert:i,publish_update:r,publish_delete:l,publish_truncate:o,tables:s}){return{sql:`
do $$
declare
  id oid := ${(0,a.literal)(e)};
  old record;
  new_name text := ${void 0===t?null:(0,a.literal)(t)};
  new_owner text := ${void 0===n?null:(0,a.literal)(n)};
  new_publish_insert bool := ${i??null};
  new_publish_update bool := ${r??null};
  new_publish_delete bool := ${l??null};
  new_publish_truncate bool := ${o??null};
  new_tables text := ${void 0===s?null:(0,a.literal)(null===s?"all tables":s.map(e=>{if(!e.includes("."))return(0,a.ident)(e);let[t,...n]=e.split("."),i=n.join(".");return`${(0,a.ident)(t)}.${(0,a.ident)(i)}`}).join(","))};
begin
  select * into old from pg_publication where oid = id;
  if old is null then
    raise exception 'Cannot find publication with id %', id;
  end if;

  if new_tables is null then
    null;
  elsif new_tables = 'all tables' then
    if old.puballtables then
      null;
    else
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I for all tables;', old.pubname));
    end if;
  else
    if old.puballtables then
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I;', old.pubname));
    elsif exists(select from pg_publication_rel where prpubid = id) then
      execute(
        format(
          'alter publication %I drop table %s',
          old.pubname,
          (select string_agg(prrelid::regclass::text, ', ') from pg_publication_rel where prpubid = id)
        )
      );
    end if;

    -- At this point the publication must have no tables.

    if new_tables != '' then
      execute(format('alter publication %I add table %s', old.pubname, new_tables));
    end if;
  end if;

  execute(
    format(
      'alter publication %I set (publish = %L);',
      old.pubname,
      concat_ws(
        ', ',
        case when coalesce(new_publish_insert, old.pubinsert) then 'insert' end,
        case when coalesce(new_publish_update, old.pubupdate) then 'update' end,
        case when coalesce(new_publish_delete, old.pubdelete) then 'delete' end,
        case when coalesce(new_publish_truncate, old.pubtruncate) then 'truncate' end
      )
    )
  );

  execute(format('alter publication %I owner to %I;', old.pubname, coalesce(new_owner, old.pubowner::regrole::name)));

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.pubname then
    execute(format('alter publication %I rename to %I;', old.pubname, coalesce(new_name, old.pubname)));
  end if;

  -- We need to retrieve the publication later, so we need a way to uniquely identify which publication this is.
  -- We can't rely on id because it gets changed if it got recreated.
  -- We use a temp table to store the unique name - DO blocks can't return a value.
  create temp table pg_meta_publication_tmp (name) on commit drop as values (coalesce(new_name, old.pubname));
end $$;
`}},remove:function(e){return{sql:`DROP PUBLICATION IF EXISTS ${(0,a.ident)(e.name)};`}},zod:en},extensions:{list:function({limit:e,offset:t}={}){let n=E;return e&&(n=`${n} LIMIT ${e}`),t&&(n=`${n} OFFSET ${t}`),{sql:n,zod:f}},retrieve:function({name:e}){return{sql:`${E} WHERE name = ${(0,a.literal)(e)};`,zod:z}},create:function({name:e,schema:t,version:n,cascade:i=!1}){return{sql:`
CREATE EXTENSION ${(0,a.ident)(e)}
  ${void 0===t?"":`SCHEMA ${(0,a.ident)(t)}`}
  ${void 0===n?"":`VERSION ${(0,a.literal)(n)}`}
  ${i?"CASCADE":""};`}},update:function(e,{update:t=!1,version:n,schema:i}){let r="";t&&(r=`ALTER EXTENSION ${(0,a.ident)(e)} UPDATE ${void 0===n?"":`TO ${(0,a.literal)(n)}`};`);let l=void 0===i?"":`ALTER EXTENSION ${(0,a.ident)(e)} SET SCHEMA ${(0,a.ident)(i)};`;return{sql:`BEGIN; ${r} ${l} COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`DROP EXTENSION ${(0,a.ident)(e)} ${t?"CASCADE":"RESTRICT"};`}},zod:b},config:{list:function({limit:e,offset:t}={}){let n=g;return e&&(n+=` LIMIT ${e}`),t&&(n+=` OFFSET ${t}`),{sql:n,zod:h}},zod:$},materializedViews:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l,includeColumns:o=!0}={}){let s=J({includeColumns:o}),d=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),l&&(s+=` offset ${l}`),{sql:s,zod:G}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${J({includeColumns:!0})} where ${t};`,zod:Q}},zod:Y},foreignTables:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l,includeColumns:o=!0}={}){let s=N({includeColumns:o}),d=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),l&&(s+=` offset ${l}`),{sql:s,zod:S}},retrieve:function(e){return{sql:`${N({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:T}},zod:y},views:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l,includeColumns:o=!0}={}){let s=eB({includeColumns:o}),d=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),l&&(s+=` offset ${l}`),{sql:s,zod:eH}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eB({includeColumns:!0})} where ${t};`,zod:eq}},zod:ek},policies:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l}={}){let o=`
    with policies as (${X})
    select *
    from policies
    `,s=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(o+=`where schema ${s}`),i&&(o+=` limit ${i}`),l&&(o+=` offset ${l}`),{sql:o,zod:K}},retrieve:function(e){return{sql:`with policies as (${X}) select * from policies where ${function(e){if("id"in e&&e.id)return`id = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`name = ${(0,a.literal)(e.name)} AND schema = ${(0,a.literal)(e.schema)} AND table = ${(0,a.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:Z}},create:function({name:e,schema:t="public",table:n,definition:i,check:r,action:l="PERMISSIVE",command:o="ALL",roles:s=["public"]}){return{sql:`
create policy ${(0,a.ident)(e)} on ${(0,a.ident)(t)}.${(0,a.ident)(n)}
  as ${l}
  for ${o}
  to ${s.map(a.ident).join(",")}
  ${i?`using (${i})`:""}
  ${r?`with check (${r})`:""};`}},update:function(e,t){let{name:n,definition:i,check:r,roles:l}=t,o=`ALTER POLICY ${(0,a.ident)(e.name)} ON ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`,s=void 0===n?"":`${o} RENAME TO ${(0,a.ident)(n)};`,d=void 0===i?"":`${o} USING (${i});`,c=void 0===r?"":`${o} WITH CHECK (${r});`,m=void 0===l?"":`${o} TO ${l.map(a.ident).join(",")};`;return{sql:`BEGIN; ${d} ${c} ${m} ${s} COMMIT;`}},remove:function(e){return{sql:`DROP POLICY ${(0,a.ident)(e.name)} ON ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)};`}},zod:V},triggers:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l}={}){let o=`with triggers as (${eR}) select * from triggers`,s=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(o+=` where schema ${s}`),i&&(o+=` limit ${i}`),l&&(o+=` offset ${l}`),{sql:o,zod:eO}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)} and ${(0,a.ident)("table")} = ${(0,a.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:`with triggers as (${eR}) select * from triggers where ${t};`,zod:eC}},create:function({name:e,schema:n="public",table:i,function_schema:r="public",function_name:l,function_args:o=[],activation:s,events:d,orientation:c,condition:m}){let p=`${(0,a.ident)(n)}.${(0,a.ident)(i)}`,u=`${(0,a.ident)(r)}.${(0,a.ident)(l)}`,_=d.join(" or "),g=c?`for each ${c}`:"",$=m?`when (${m})`:"",h=o.map(a.literal).join(",");return{sql:`create trigger ${(0,a.ident)(e)} ${s} ${_} on ${p} ${g} ${$} execute function ${u}(${h});`,zod:t.z.void()}},update:function(e,n){let i=`${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`,r="";switch(n.enabled_mode){case"ORIGIN":r=`alter table ${i} enable trigger ${(0,a.ident)(e.name)};`;break;case"DISABLED":r=`alter table ${i} disable trigger ${(0,a.ident)(e.name)};`;break;case"REPLICA":case"ALWAYS":r=`alter table ${i} enable ${n.enabled_mode} trigger ${(0,a.ident)(e.name)};`}let l=n.name&&n.name!==e.name?`alter trigger ${(0,a.ident)(e.name)} on ${i} rename to ${(0,a.ident)(n.name)};`:"";return{sql:`begin; ${r}; ${l}; commit;`,zod:t.z.void()}},remove:function(e,{cascade:n=!1}={}){let i=`${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`;return{sql:`drop trigger ${(0,a.ident)(e.name)} on ${i} ${n?"cascade":""};`,zod:t.z.void()}},zod:eI},types:{list:function({includeArrayTypes:e=!1,includeSystemSchemas:t=!1,includedSchemas:a,excludedSchemas:i,limit:l,offset:o}={}){let s=ex;e||(s+=` and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let d=r(a,i,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` and n.nspname ${d}`),l&&(s+=` limit ${l}`),o&&(s+=` offset ${o}`),{sql:s,zod:ej}},zod:eD},version:{retrieve:function(){return{sql:eU,zod:eM}},zod:eM},indexes:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:l}={}){let o=`
    with indexes as (${H})
    select *
    from indexes
  `,s=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(o+=` where schema ${s}`),i&&(o+=` limit ${i}`),l&&(o+=` offset ${l}`),{sql:o,zod:B}},retrieve:function({id:e}){return{sql:`
    with indexes as (${H})
    select *
    from indexes
    where id = ${(0,a.literal)(e)};
  `,zod:P}},zod:q},columnPrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,columnIds:o,limit:s,offset:c}={}){let m=`
  with column_privileges as (${l})
  select *
  from column_privileges
  `,p=[],u=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return u&&p.push(`relation_schema ${u}`),o?.length&&p.push(`column_id in (${o.map(a.literal).join(",")})`),p.length>0&&(m+=` where ${p.join(" and ")}`),s&&(m+=` limit ${s}`),c&&(m+=` offset ${c}`),{sql:m,zod:d}},grant:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:n,isGrantable:i})=>{let[r,l]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,a.literal)(r)}
  and a.attnum = ${(0,a.literal)(l)}
into col;
execute format(
  'grant ${e} (%I) on %s to ${"public"===n.toLowerCase()?"public":(0,a.ident)(n)} ${i?"with grant option":""}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:n})=>{let[i,r]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,a.literal)(i)}
  and a.attnum = ${(0,a.literal)(r)}
into col;
execute format(
  'revoke ${e} (%I) on %s from ${"public"===n.toLowerCase()?"public":(0,a.ident)(n)}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},zod:s},query:eJ}],850036)}]);

//# debugId=e42f5cff-2d93-f7be-1a20-696da9fb1933
//# sourceMappingURL=f21968bd8fa041bc.js.map