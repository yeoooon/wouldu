# -*- coding: utf-8 -*-
"""
@author: jungwonchang
"""

from readers.goo_format_reader import Reader
from vectorizers.bert_vectorizer import BERTVectorizer
from models.joint_bert import JointBertModel
from utils import flatten
from vectorizers.tags_vectorizer import TagsVectorizer
from vectorizers import albert_tokenization
import numpy as np 
import json 

import argparse
import os
import pickle
import tensorflow as tf
from sklearn import metrics

# read command-line parameters
parser = argparse.ArgumentParser('Evaluating the Joint BERT / ALBERT NLU model')
parser.add_argument('--model', '-m', help = 'Path to joint BERT / ALBERT NLU model', type = str, required = True)
parser.add_argument('--data', '-d', help = 'Path to data in Goo et al format', type = str, required = True)
#parser.add_argument('--type', '-tp', help = 'bert   or    albert', type = str, default = 'bert', required = False)


VALID_TYPES = ['bert', 'albert']

args = parser.parse_args()
load_folder_path = args.model
data_folder_path = args.data
#type_ = args.type

# this line is to disable gpu
# os.environ['CUDA_VISIBLE_DEVICES']='-1'

config = tf.ConfigProto(intra_op_parallelism_threads=8,
                        inter_op_parallelism_threads=0,
                        allow_soft_placement=True,
                        device_count = {'GPU': 1})
sess = tf.Session(config=config)

bert_model_hub_path = './albert-module'
is_bert = False
tokenizer = albert_tokenization.FullTokenizer('./albert-module/assets/v0.vocab')

bert_vectorizer = BERTVectorizer(sess, is_bert, bert_model_hub_path)

# loading models
print('Loading models ...')
if not os.path.exists(load_folder_path):
    print('Folder `%s` not exist' % load_folder_path)

with open(os.path.join(load_folder_path, 'tags_vectorizer.pkl'), 'rb') as handle:
    tags_vectorizer = pickle.load(handle)
    slots_num = len(tags_vectorizer.label_encoder.classes_)
with open(os.path.join(load_folder_path, 'intents_label_encoder.pkl'), 'rb') as handle:
    intents_label_encoder = pickle.load(handle)
    intents_num = len(intents_label_encoder.classes_)

model = JointBertModel.load(load_folder_path, sess)


# data_text_arr, data_tags_arr, data_intents = Reader.read(data_folder_path)
data_text_arr, data_tags_arr, data_intents = Reader.read_allsents(data_folder_path)
data_input_ids, data_input_mask, data_segment_ids, data_sequence_lengths = bert_vectorizer.transform(data_text_arr)

tags_vectorizer = TagsVectorizer()
tags_vectorizer.fit(data_tags_arr)
data_tags_arr = tags_vectorizer.transform(data_tags_arr, data_input_ids)

#print(data_tags_arr[1])
#print(data_input_ids[1])

def get_results(input_ids, input_mask, segment_ids,  sequence_lengths, tags_arr,
                intents, tags_vectorizer, intents_label_encoder):
    inferred_tags, first_inferred_intent, first_inferred_intent_score, _, _, slots_score = model.predict_slots_intent([input_ids, input_mask, segment_ids], tags_vectorizer, intents_label_encoder)
    gold_tags = tags_vectorizer.simple_inverse_transform(tags_arr.astype(int), input_ids)
    #print(inferred_tags[1])
    #print(gold_tags[1])
    acc = metrics.accuracy_score(intents, first_inferred_intent)
    tag_incorrect = ''
    intent_incorrect = ''
    intent_correct = ''

    return first_inferred_intent[i].strip()

print('==== Evaluation ====')
result = get_results(
                                                            data_input_ids, 
                                                            data_input_mask, 
                                                            data_segment_ids,
                                                            data_sequence_lengths,
                                                            data_tags_arr, 
                                                            data_intents, 
                                                            tags_vectorizer, 
                                                            intents_label_encoder)

print(result)
print("======= Done =======")
