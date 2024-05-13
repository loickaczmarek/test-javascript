import AnimalController from './src/entrypoint/animal-controller.js'
import { TransformerService } from './src/domain/service/transformer-service.js'
import { DataRepository } from './src/infrastructure/data-repository.js'
import { DataPresenter } from './src/presenter/data-presenter.js'

const APPLICATION_ARGS = [
    '--count',
    '--filter'
]
export default class Application {
    constructor(animalController) {
        this.animalController = animalController
    }
    launch() {
        const args = process.argv
        let result = 'Usages:\n' +
            'node app.js --count\n' +
            'node app.js --filtrer=some-filter'
        const applicationArgs = args.filter((arg) =>
            APPLICATION_ARGS.find((applicationArg) => arg.includes(applicationArg)) !== undefined
        )
        if (applicationArgs.length > 0) {
            result = this.animalController.manage(applicationArgs)
        }
        return result
    }
}

const transformerService = new TransformerService()
const dataRepository = new DataRepository()

const animalController = new AnimalController(transformerService, dataRepository)
export const application = new Application(animalController);

const result = application.launch()
const presenter = new DataPresenter()
presenter.present(result)