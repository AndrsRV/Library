function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.log(`${this.title} by ${this.author} ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`);
    }
}

const book1 = new book("El principito", "Antoine de Saint-Exupéry", 96, true);
book1.info();