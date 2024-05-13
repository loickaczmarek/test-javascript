import { application } from './app.js'
import { data } from './data.js'


describe('Application integration testing', () => {

    it('should return data with a param', async () => {
        process.argv = ['--count']
        const stream = application.launch()
        const result = []
        stream.on('readable', () => {
            let chunk;
            while (null !== (chunk = stream.read())) {
                result.push(chunk);
            }
        });
        await new Promise(resolve => stream.on("close", resolve))
        expect(result[0].people[0].name).toEqual(`${data[0].people[0].name} (6)`)
    })

})