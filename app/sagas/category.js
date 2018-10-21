
import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../constants/Urls';
import { fetchTypeList, receiveTypeList } from '../actions/category';

export function* requestTypeList() {
  try {
    let typeList = [{id:1,name:'热点'},{id:2,name:'书签'}];
    yield put(receiveTypeList(typeList));
    yield call(store.save, 'typeList', typeList);
  } catch (error) {
    yield put(receiveTypeList([]));
    yield ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeList() {
  while (true) {
    yield take(types.REQUEST_TYPE_LIST);
    yield fork(requestTypeList);
  }
}
