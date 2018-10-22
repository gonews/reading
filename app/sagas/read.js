
import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { ARTICLE_LIST,ARTICLE_DETAIL } from '../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../actions/read';


export function* requestArticleDetail(id) {
    try {
        const articleDetail = yield call(
            RequestUtil.request,
            `${ARTICLE_DETAIL}?newsDetail={news(_id:${id}){_id, title, content, headImg, author}`,
            'get'
        );

    } catch (error) {
        ToastUtil.showShort('网络发生错误，请重试');
    }
}

export function* requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page
) {
  try {
    yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
    const articleList = yield call(
      RequestUtil.request,
      `${ARTICLE_LIST}`,
      'get'
    );
    yield put(receiveArticleList(
      articleList.data,
      typeId
    ));

  } catch (error) {
    yield put(receiveArticleList([], typeId));
    ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const {
      isRefreshing, loading, typeId, isLoadMore, page
    } = yield take(types.REQUEST_ARTICLE_LIST);
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    );
  }
}
