import copy from './copy'
import createDir from './createDir'
import emptyDir from './emptyDir'
import list from './list'
import move from './move'
import readdir from './readdir'
import readFile from './readFile'
import remove from './remove'
import stat from './stat'
import writeFile from './writeFile'

const read = stat

export default {
	copy
,	createDir
,	emptyDir
,	list
,	move
,	readdir
,	readFile
,	remove
,	stat
,	read
,	writeFile
}