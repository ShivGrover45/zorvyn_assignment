import {mysql} from 'mysql2/promise'

const db=mysql.creatConnection({
    host,
    user,
    password,
    database
})

export default db