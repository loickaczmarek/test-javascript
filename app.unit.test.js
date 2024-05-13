import Application from './app.js'


describe('Application unit testing', () => {
    const animalController = {
        manage: jest.fn()
    }
    const application = new Application(animalController)

    beforeEach(() => {
        animalController.manage.mockReturnValue('ok')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should throw an error message when empty arguments', () => {
        const message = application.launch()
        expect(message).toBe('Usages:\n' +
            'node app.js --count\n' +
            'node app.js --filtrer=some-filter')
    })

    it('should return a result with one available argument', () => {
        process.argv = ['--count']
        const message = application.launch()
        expect(message).toBe('ok')
    })

    it('should call controller with arguments and return controller result', () => {
        animalController.manage.mockReturnValue('result')
        process.argv = ['--count', '--filter=toto']
        const message = application.launch()
        expect(message).toBe('result')
        expect(animalController.manage).toBeCalledWith(['--count', '--filter=toto'])
    })
})