import {Request} from "./request";
import {
  GetArticleListReq,
  CreateArticleReq,
  CreateArticleTypeReq,
  UpdateArticleReq,
  DelArticleReq
} from "@/networks/apiType";

export default class Api {
  public static User = {
    getToken: () => Request.get("/u/user/info")
  };

  public static Article = {
    getArticleTypeList: () => Request.get("/at/article/type/list"),
    getArticleList: (params: GetArticleListReq) => Request.get("/a/article/list", params),
    createArticle: (params: CreateArticleReq) => Request.post("/a/create", params),
    updateArticle: (params: UpdateArticleReq) => Request.post("/a/update", params),
    delArticle: (params: DelArticleReq) => Request.post("/a/del", params),
    createArticleType: (params: CreateArticleTypeReq) => Request.post("/at/create", params),
  };
}