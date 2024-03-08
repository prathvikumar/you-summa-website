from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    # Dummy transcript and summary for testing
    transcript = " OMDFHSNThis is the transcript of the video."
    summary = "TThe gentle rustle of leaves accompanied my solitary walk through the woods, wThe gentle rustle of leaves accompanied my solitary walk through the woods, where birdsong filled the air, weaving a melody that resonated deep within my soul. Shafts of golden sunlight danced among the trees, casting enchanting patterns on the forest floor, while a babbling brook meandered through the landscape, its crystal-clear waters glistening in the sunlight. The earthy scent of moss and damp soil mingled with the sweet fragrance of wildflowers, and butterflies flitted gracefully from flower to flower, their delicate wings a kaleidoscope of colors. In this tranquil sanctuary, I found solace and renewal, a refuge from the chaos of everyday life. As the sun dipped below the horizon, painting the sky with hues of orange and pink, I knew that I would carry the memory of this moment with me always, feeling a sense of gratitude for the beauty and majesty of the natural world.here birdsong filled the air, weaving a melody that resonated deep within my soul. Shafts of golden sunlight danced among the trees, casting enchanting patterns on the forest floor, while a babbling brook meandered through the landscape, its crystal-clear waters glistening in the sunlight. The earthy scent of moss and damp soil mingled with the sweet fragrance of wildflowers, and butterflies flitted gracefully from flower to flower, their delicate wings a kaleidoscope of colors. In this tranquil sanctuary, I found solace and renewal, a refuge from the chaos of everyday life. As the sun dipped below the horizon, painting the sky with hues of orange and pink, I knew that I would carry the memory of this moment with me always, feeling a sense of gratitude for the beauty and majesty of the natural world."
    
    # Create a JSON response containing the transcript, summary, and video ID
    response = {
        'transcript': transcript,
        'summary': summary,
        'video_id': request.form.get('video_link').split('v=')[-1][:11]
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
