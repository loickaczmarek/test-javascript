export default class CountTransformer {

    constructor(priority) {
        this.priority = priority
    }
    convert(data) {
        const result = { ...data }
        const transformedPeoples = []
        result.people.forEach((people) => {
            transformedPeoples.push({...people, name: `${people.name} (${people.animals.length})`})
        })
        result.people = transformedPeoples
        return result
    }
}