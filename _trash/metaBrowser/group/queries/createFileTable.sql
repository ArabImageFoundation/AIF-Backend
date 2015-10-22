CREATE TABLE file(
	id integer NOT NULL DEFAULT nextval('file_id_seq'::regclass)
,	path text
,	CONSTRAINT column_pkey PRIMARY KEY (id)
)
