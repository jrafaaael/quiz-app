class Parser extends DOMParser {
    parse(str, type) {
        return (
            this
                .parseFromString(str, type)
                .documentElement
                .textContent
        );
    }
}

export default Parser;