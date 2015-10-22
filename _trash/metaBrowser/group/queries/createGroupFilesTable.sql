CREATE TABLE group_files(
	group_id integer NOT NULL
,	file_id integer NOT NULL
,	CONSTRAINT group_files_pkey PRIMARY KEY (group_id, file_id)
,	CONSTRAINT file_id_fk FOREIGN KEY (file_id)
		REFERENCES file (id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
,	CONSTRAINT group_id_fk FOREIGN KEY (group_id)
		REFERENCES "group" (id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
)