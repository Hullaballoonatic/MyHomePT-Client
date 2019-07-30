export abstract class Chooser<T> {
    abstract choices: T[]
    selected: T[] = []

    abstract submit()

    abstract dismiss()

    isSelected(o: T): boolean {
        return this.selected.includes(o)
    }
}
