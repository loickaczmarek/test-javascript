export default class AnimalController {

    constructor(transformerService, dataRepository) {
        this.transformerService = transformerService
        this.dataRepository = dataRepository
    }
    manage(options) {
        const transformations = this.transformerService.convert(options)
        transformations.sort((transformationA, transformationB) => transformationA.priority - transformationB.priority)
        return this.dataRepository.stream().map((data) => {
            let result = data
            transformations.forEach((transformation) => {
                if (this.isCorrectData(result)) {
                    result = transformation.convert(result)
                }
                return result
            })
            return result
        }).filter((data) => this.isCorrectData(data))
    }

    isCorrectData(data) {
        return !data?.removeMe
    }
}