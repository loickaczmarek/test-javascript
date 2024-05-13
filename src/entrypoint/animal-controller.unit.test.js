import { Readable } from 'stream'
import AnimalController  from './animal-controller.js'
import { TransformerService } from '../domain/service/transformer-service.js'

describe('AnimalController unit test', () => {

    const transformerService = new TransformerService()
    const dataRepository = {
        stream: jest.fn()
    }
    const animalController = new AnimalController(transformerService, dataRepository)

    afterEach(() => {
        jest.restoreAllMocks()
    })

    beforeEach(() => {
        const dataStream = Readable.from([], { objectMode: true });
        dataRepository.stream.mockReturnValue(dataStream)
    })

    it('should stream data', async () => {
        await animalController.manage(['--count'])
        expect(dataRepository.stream).toBeCalled()
    })
    describe('options', () => {
        let data

        beforeEach(() => {
            data = [
                {
                    name: 'testName1',
                    people:
                        [{
                            name: 'peopleName1',
                            animals:
                                [
                                    {name: 'animalName1Alpha'},
                                    {name: 'animalName1Beta'}
                                ]
                        }]
                },
                {
                    name: 'testName2',
                    people:
                        [{
                            name: 'peopleName2',
                            animals:
                                [{name: 'animalName2Gamma'}]
                        }]
                }
            ];
        })

        describe('option is count', () => {

            beforeEach(() => {
                const dataStream = Readable.from([...data], { objectMode: true });
                dataRepository.stream.mockReturnValue(dataStream)
            })

            it('should apply count transformer on each data', async () => {
                const resultStream = await animalController.manage(['--count'])
                const result = []
                resultStream.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = resultStream.read())) {
                        result.push(chunk);
                    }
                });
                await new Promise(resolve => resultStream.on("close", resolve))
                expect(result).toEqual(
                    [
                        {
                            name: 'testName1',
                            people:
                                [{
                                    name: 'peopleName1 (2)',
                                    animals:
                                        [
                                            {name: 'animalName1Alpha'},
                                            {name: 'animalName1Beta'}
                                        ]
                                }]
                        },
                        {
                            name: 'testName2',
                            people:
                                [{
                                    name: 'peopleName2 (1)',
                                    animals:
                                        [{name: 'animalName2Gamma'}]
                                }]
                        }
                    ]
                )
            })
        })

        describe('option is filter', () => {

            beforeEach(() => {
                const dataStream = Readable.from([...data], { objectMode: true });
                dataRepository.stream.mockReturnValue(dataStream)
            })

            it('should apply filter transformer', async () => {
                const resultStream = await animalController.manage(['--filter=Beta'])
                const result = []
                resultStream.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = resultStream.read())) {
                        result.push(chunk);
                    }
                });
                await new Promise(resolve => resultStream.on("close", resolve))
                expect(result).toEqual(
                    [
                        {
                            name: 'testName1',
                            people:
                                [{
                                    name: 'peopleName1',
                                    animals:
                                        [
                                            {name: 'animalName1Beta'}
                                        ]
                                }]
                        }
                    ]
                )
            })
        })

        describe('has many options', () => {

            beforeEach(() => {
                const dataStream = Readable.from([...data], { objectMode: true });
                dataRepository.stream.mockReturnValue(dataStream)
            })

            it('should apply all transformers with priority', async () => {
                const resultStream = await animalController.manage(['--count, --filter=Alpha'])
                const result = []
                resultStream.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = resultStream.read())) {
                        result.push(chunk);
                    }
                });
                await new Promise(resolve => resultStream.on("close", resolve))
                expect(result).toEqual(
                    [
                        {
                            name: 'testName1',
                            people:
                                [{
                                    name: 'peopleName1 (1)',
                                    animals:
                                        [
                                            {name: 'animalName1Alpha'}
                                        ]
                                }]
                        }
                    ]
                )
            })
        })
    })

})