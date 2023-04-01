from flask import Flask, render_template, request, jsonify
from physarum import run_simulation

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/physarum', methods=['POST'])

def handle_selected_cells():
    data = request.get_json()

    grid_size = data['gridSize']
    physarum_source = data['firstCell']
    food_source = data['secondCell']

    return_statement = run_simulation(grid_size, physarum_source, food_source)

    return jsonify({ 'message': return_statement })
