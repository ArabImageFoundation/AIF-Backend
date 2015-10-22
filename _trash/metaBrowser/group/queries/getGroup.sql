WITH RECURSIVE search_group_groups(
	parent_id
,	child_id
,	depth
,	materializedpath
,	cycle
) AS (
	SELECT 
		g.parent_id
	,	g.child_id
	,	1
	,	ARRAY[g.parent_id]
	,	false
	FROM 
		group_groups g
--  To get a specific group, uncomment the two following lines:
-- 	WHERE
--		g.parent_id = 4
	UNION ALL
	SELECT 
		g.parent_id
	,	g.child_id
	,	sg.depth + 1
	,	materializedpath || g.parent_id
	,	g.parent_id = ANY(materializedpath)
	FROM 
		group_groups g
	,	search_group_groups sg
	WHERE
		g.parent_id = sg.child_id AND NOT cycle
)
SELECT 
	pg.name AS parentName
,	pg.id AS parent_id
,	cg.name AS childName
,	cg.id AS child_id
,	f.path AS filePath
,	sg.materializedpath AS materializedpath
FROM
	search_group_groups sg
JOIN
	"group" pg
ON 
	pg.id = sg.parent_id
JOIN 
	"group" cg
ON
	cg.id = sg.child_id
LEFT JOIN
	group_files gf
ON
	gf.group_id = sg.parent_id
LEFT JOIN
	file f
ON
	f.id = gf.file_id
ORDER BY materializedpath
;