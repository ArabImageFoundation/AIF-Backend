CREATE TABLE "group"(
	id integer NOT NULL DEFAULT nextval('group_id_seq'::regclass)
,	name text
,	CONSTRAINT group_pkey PRIMARY KEY (id)
)