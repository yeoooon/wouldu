from flask import Flask, jsonify, request
import tensorflow as tf
app = Flask(__name__)
import mecab
import sentencepiece as spm

mecab = mecab.MeCab()
sp = spm.SentencePieceProcessor()
sp.Load('spm-mediazen.model')

def work(sentence, model): # 이미지를 입력하면 숫자를 출력하는 함수
    pred = model.predict(sentence) # TODO: 모델에 이미지를 넣고 결과를 pred에 저장
    print(pred)
    pred = pred[0] # TODO: batch 단위로 나온 결과에서 이미지 하나의 결과를 추출
    emo = tf.math.argmax(pred)  # TODO: 결과중 가장 확률이 높은 index 가져오기
    return emo

@app.route("/", methods=["GET"]) # @app.route를 작성하고, GET Method만 사용합니다.
def predict():    
    sentence = request.args.get("sentence")       # img라는 이름으로 url을 받아옴
    if sentence != None:                     # imgurl을 제대로 받은 경우
        sentence  = " ".join(mecab.morphs(sentence))
        sentence = sp.EncodeAsPieces(sentence)
        emo = work(sentence, model)   # 모델을 work 함수를 통해 사용합니다.    
        result_string = "you are %d"%(emo)   #사용자에게 보여줄 문자열
    return jsonify(result_string)


# Flask 서버를 실행하는 코드입니다.
if __name__ == "__main__":
    model = tf.keras.models.load_model("ai/saved_model") # TODO: 학습된 모델 "mymodel"을 불러오세요.
    app.run(host="0.0.0.0", port=3000) # flask 서비스 시작