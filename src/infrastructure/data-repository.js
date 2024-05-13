import { Readable } from 'stream'
import { data } from '../../data.js'

export class DataRepository {
    stream() {
        return Readable.from([...data], { objectMode: true });
    }
}