import CountTransformer from '../transformer/count-transformer.js'
import FilterTransformer from '../transformer/filter-transformer.js'

export const APPLICATION_ARGS = [
    '--count',
    '--filter'
]

export class TransformerService {
    convert(options) {
        const result = []
        options.forEach((option) => {
            if (option.includes(APPLICATION_ARGS[0])) {
                result.push(new CountTransformer(2))
            }
            if (option.includes(APPLICATION_ARGS[1])) {
                result.push(new FilterTransformer(option.split('=')[1],1))
            }
        })
        result.sort((transformationA, transformationB) => transformationA.priority - transformationB.priority)
        return result
    }
}