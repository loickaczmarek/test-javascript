import { DataPresenter } from './data-presenter.js'
import {Readable} from "stream";

describe('DataPresenter unit test', () => {
    jest.spyOn(global.console, 'log')

    const dataPresenter = new DataPresenter()

    afterEach(() => {
        jest.restoreAllMocks()
    })

    beforeEach(() => {
        jest.spyOn(global.console, 'log')
    })

    it('should present stream data', async () => {
        const dataStream = Readable.from([{name: "hello"}], { objectMode: true });
        await dataPresenter.present(dataStream)
        expect(console.log).toBeCalledWith("[{\"name\":\"hello\"}]")
    })

    it('should present param if not stream', async () => {
        await dataPresenter.present({})
        expect(console.log).toBeCalledWith({})
    })
})