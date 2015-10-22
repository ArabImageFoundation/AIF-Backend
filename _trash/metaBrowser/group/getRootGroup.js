import getGroupById from './getGroupById';

const id = '8c4fc3d8-dec0-4a0b-9236-6f118828a598';

export default function getRootGroup({r,conn},props,cb){
	return getGroupById(id,{r,conn},cb);
}