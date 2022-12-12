from models.joint_bert import JointBertModel
import tensorflow as tf

config = tf.ConfigProto(intra_op_parallelism_threads=8,
                        inter_op_parallelism_threads=0,
                        allow_soft_placement=True,
                        device_count = {'GPU': 1})
sess = tf.Session(config=config)

def sub_model(x, tags_vectorizer, intents_label_encoder):
    load_folder_path = 'saved_model35'
    model = JointBertModel.load(load_folder_path, sess)
    with sess.as_default():
        with sess.graph.as_default():
            _, intent, _, _, _, _ = model.predict_slots_intent(x, tags_vectorizer, intents_label_encoder)
    
    return int(intent[0].strip())