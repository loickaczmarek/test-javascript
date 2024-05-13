export default class FilterTransformer {

    constructor(filter, priority) {
        this.filter = filter
        this.priority = priority
    }
    convert(data) {
        let result = { removeMe: true }
        const filteredPeoples = []
        data.people.forEach((people) => {
            const foundedAnimals = this.searchAnimals(people)
            if (foundedAnimals.length > 0) {
                filteredPeoples.push({...people, animals: foundedAnimals})
            }
        })
        if (filteredPeoples.length > 0) {
            result = data
            result.people = filteredPeoples
        }
        return result
    }

    searchAnimals(people) {
        return people.animals.filter((animal) => animal.name.includes(this.filter))
    }
}