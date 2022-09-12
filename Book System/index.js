var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Render css files
app.use(express.static('public'));

// Placeholders for added book (array)
var book = ['Pride and Prejudice by Jane Austen', 'Facts About the Moon by Dorianne Laux'];

// Placeholders for checked out books (array)
var checkedout = ['The Great Gatsby by F. Scott Fitzgerald'];

// Post route for adding new book
app.post('/addbook', function(req, res) {
    var newBook = req.body.newbook + " by " + req.body.newbookAuth;
    // Add the new book from the post route
    book.push(newBook);
    res.redirect('/');
});

// Checkout book
app.post('/checkoutbook', function(req, res) {
    var checkedoutBook = req.body.check;

    // Check for the "typeof" the different books, then add into the checked out books
    if (typeof checkedoutBook === 'string') {
        checkedout.push(checkedoutBook);
        // Check if the book already exists when checked, then add to checked out
        book.splice(book.indexOf(checkedoutBook), 1);
    } else if (typeof checkedoutBook === 'object') {
        for (var i = 0; i < checkedoutBook.length; i++) {
            checkedout.push(checkedoutBook[i]);
            book.splice(book.indexOf(checkedoutBook[i]), 1);
        }
    }
    res.redirect('/');
});

// Return book
app.post('/returnbook', function(req, res) {
    var returnBook = req.body.checked;

    // Check for the "typeof" the different checked out books, then add into the books
    if (typeof returnBook === 'string') {
        book.push(returnBook);
        // Check if the check out book already exists when checked, then add to books
        checkedout.splice(checkedout.indexOf(returnBook), 1);
    } else if (typeof returnBook === 'object') {
        for (var i = 0; i < returnBook.length; i++) {
            book.push(returnBook[i]);
            checkedout.splice(checkedout.indexOf(returnBook[i]), 1);
        }
    }
    res.redirect('/');
});

// Render the ejs and display available book section, checked out book section
app.get('/', function(req, res) {
    res.render('index', {book: book, checkedout: checkedout});
});

// Set app to listen on port 3000
app.listen(3000, function() {
    console.log("To-Do App Server is running on port 3000!")
});