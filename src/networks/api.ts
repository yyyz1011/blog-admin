import { Request } from "./request";
import {
  GetArticleListReq,
  CreateArticleReq,
  CreateArticleTypeReq,
  UpdateArticleReq,
  DelArticleReq,
  CreatePictureReq,
  UpdatePictureReq,
  DelPictureReq,
  DelMessageReq,
} from "@/networks/apiType";

export default class Api {
  public static Common = {
    upload: (params: any) => Request.post("/c/upload", params),
  };

  public static User = {
    getToken: () => Request.get("/u/user/info"),
  };

  public static Article = {
    getArticleTypeList: () => Request.get("/at/article/type/list"),
    getArticleList: (params: GetArticleListReq) =>
      Request.get("/a/article/list", params),
    createArticle: (params: CreateArticleReq) =>
      Request.post("/a/create", params),
    updateArticle: (params: UpdateArticleReq) =>
      Request.post("/a/update", params),
    delArticle: (params: DelArticleReq) => Request.post("/a/del", params),
    createArticleType: (params: CreateArticleTypeReq) =>
      Request.post("/at/create", params),
  };

  public static Picture = {
    createPicture: (params: CreatePictureReq) =>
      Request.post("/p/create", params),
    updatePicture: (params: UpdatePictureReq) =>
      Request.post("/p/update", params),
    delPicture: (params: DelPictureReq) => Request.post("/p/del", params),
    getPictureList: () => Request.get("/p/picture/list"),
  };

  public static Message = {
    getMessageList: () => Request.get("/m/list"),
    delMessage: (params: DelMessageReq) => Request.post("/m/del", params),
  };

  public static Log = {
    getLogList: () => Request.get("/l/list"),
  };
}
