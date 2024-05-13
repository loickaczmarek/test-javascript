import { Readable } from 'stream'

export class DataPresenter {

    async present(stream) {
        if (stream instanceof Readable) {
            const result = []
            stream.on('readable', () => {
                let chunk;
                while (null !== (chunk = stream.read())) {
                    result.push(chunk);
                }
            });
            await new Promise(resolve => stream.on("close", resolve))
            console.log(JSON.stringify(result))
        } else {
            console.log(stream)
        }
    }

}