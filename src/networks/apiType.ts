export interface GetArticleListReq {
  aid?: string;
}

export interface CreateArticleReq {
  title: string;
  desc: string;
  atid: string;
  content: string;
}

export interface UpdateArticleReq {
  aid: string;
  title: string;
  desc: string;
  atid: string;
  content: string;
  create_time: string;
}

export interface DelArticleReq {
  aid: string;
}

export interface CreateArticleTypeReq {
  label: string;
}

