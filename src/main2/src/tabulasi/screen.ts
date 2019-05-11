export const ScreenTypes = [
    'desktop', 'mobile', 'tablet'
]

export class ScreenSize {
    isMobile: boolean = false
    isTablet: boolean = false
    get isDesktop() { return !this.isMobile && !this.isTablet }

    update(isMobile: boolean, isTablet: boolean) {
        this.isMobile = isMobile
        this.isTablet = isTablet

        var classList = document.querySelectorAll('body')[0].classList
        ScreenTypes.forEach((type) => classList.remove(type))

        classList.add(this.getType())
    }

    getType(): string {
        if (this.isMobile)
            return 'mobile'
        if (this.isTablet)
            return 'tablet'
        return 'desktop'
    }
}
