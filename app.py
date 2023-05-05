from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
db = SQLAlchemy(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    genre = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<Book %r>' % self.title


@app.route('/add-book', methods=['GET', 'POST'])
def add_book():
    if request.method == 'POST':
        # Get the book data from the form data
        book_data = request.form.to_dict()

        # Create new Book object with retrieved data
        new_book = Book(title=book_data['title'], author=book_data['author'], genre=book_data['genre'])
        db.session.add(new_book)
        db.session.commit()

        return jsonify({'message': 'Book added successfully!'})

    # Render the add book form template
    return render_template('add_book.html')


@app.route('/search-books')
def search_books():
    query = request.args.get('q')
    page = request.args.get('page', default=1, type=int)

    url = "https://openlibrary.org/search.json"
    params = {
        "q": query,
        "page": page,
        "limit": 5  # Set the limit to 5 results per page
    }
    response = requests.get(url, params=params)
    data = response.json()
    books = data.get('docs', [])

    return render_template('search_results.html', books=books)


if __name__ == '__main__':
    app.run(debug=True)
