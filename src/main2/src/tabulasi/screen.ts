export class ScreenSize {
    isMobile: boolean = false
    isTablet: boolean = false
    get isDesktop() { return !this.isMobile && !this.isTablet }

    update(isMobile: boolean, isTablet: boolean) {
        this.isMobile = isMobile
        this.isTablet = isTablet

        var classList = document.querySelectorAll('body')[0].classList
        classList.remove('tablet')
        classList.remove('mobile')
        classList.remove('desktop')
        classList.add(isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop'))
    }
}
