CREATE TABLE group_groups(
	parent_id integer NOT NULL
,	child_id integer NOT NULL
,	CONSTRAINT group_group_pkey PRIMARY KEY (parent_id, child_id)
,	CONSTRAINT group_groups_child_fk FOREIGN KEY (child_id)
		REFERENCES "group" (id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
,	CONSTRAINT group_groups_parent_fk FOREIGN KEY (parent_id)
		REFERENCES "group" (id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
)