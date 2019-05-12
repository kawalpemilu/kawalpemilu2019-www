export class ScreenSize {
    properties: Map<string, boolean>

    isMobile: boolean = false
    isTablet: boolean = false
    get isDesktop() { return !this.isMobile && !this.isTablet }

    update(properties: Map<string, boolean>) {
        var classList = document.querySelectorAll('body')[0].classList
        for (var key in this.properties) {
            classList.remove(key)
        }

        this.properties = properties
        console.log('ss', properties)

        for (var key in this.properties) {
            if (this.is(key))
                classList.add(key)
        }
    }

    is(type: string): boolean {
        return !!(this.properties as any)[type] // FIXME as any
    }
}
